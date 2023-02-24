import { signTypedData } from '@wagmi/core'
import { FinancingTerms } from 'components/niftyapes/list-financing/FinancingTermsForm'
import { parseUnits } from 'ethers/lib/utils'
import useEnvChain from 'hooks/useEnvChain'
import expirationOptions from 'lib/niftyapes/expirationOptions'
import { saveSignatureOfferInDb } from 'lib/niftyapes/saveSignatureOfferInDb'
import { DateTime } from 'luxon'
import { Address, useAccount } from 'wagmi'
import { useSellerFinancingContractAddress } from './useContracts'

export default function useCreateListing() {
  const { address: creator } = useAccount()
  const chain = useEnvChain()
  const verifyingContract = useSellerFinancingContractAddress()

  return {
    createListing: async function ({
      token,
      terms,
      onSuccess,
      onError,
    }: {
      token?: any
      terms: FinancingTerms
      onError: () => void
      onSuccess: () => void
    }) {
      try {
        if (!creator) {
          throw Error('Missing creator address')
        }

        if (!chain) {
          throw Error('Missing chainId')
        }

        const domain = {
          name: 'NiftyApes_SellerFinancing',
          version: '0.0.1',
          chainId: chain.id,
          verifyingContract,
        }

        const types = {
          Offer: [
            { name: 'price', type: 'uint128' },
            { name: 'downPaymentAmount', type: 'uint128' },
            { name: 'minimumPrincipalPerPeriod', type: 'uint128' },
            { name: 'nftId', type: 'uint256' },
            { name: 'nftContractAddress', type: 'address' },
            { name: 'creator', type: 'address' },
            { name: 'periodInterestRateBps', type: 'uint32' },
            { name: 'periodDuration', type: 'uint32' },
            { name: 'expiration', type: 'uint32' },
          ],
        }

        // Calculate amounts in wei
        const price = parseUnits(String(terms.listPrice || 0), 'ether')
        const downPaymentAmount = price.mul(terms.downPaymentPercent).div(100)
        const remainingPrincipal = price.sub(downPaymentAmount)
        const minimumPrincipalPerPeriod = remainingPrincipal
          .mul(terms.minPrincipalPercent)
          .div(100)

        // Calculate periodInterestRate basis points
        const periodDuration = terms.payPeriodDays * 86400 // in seconds
        const interestRatePerSecond = terms.apr / (365 * 86400)
        const periodInterestRateBps = Math.round(
          interestRatePerSecond * periodDuration * 100
        )

        // Calculate expiration in seconds
        const expirationOption = expirationOptions.find(
          (option) => option.value === terms.expiration
        )

        if (!expirationOption) {
          throw Error('Missing expiration')
        }

        const expiration = Math.round(
          DateTime.now()
            .plus({
              [expirationOption.relativeTimeUnit as string]:
                expirationOption.relativeTime,
            })
            .toSeconds()
        )

        const nftId = token.token.tokenId
        const nftContractAddress = token.token.contract

        const value = {
          price,
          downPaymentAmount,
          minimumPrincipalPerPeriod,
          nftId,
          nftContractAddress,
          creator,
          periodInterestRateBps,
          periodDuration,
          expiration,
        }

        const signature = await signTypedData({ domain, types, value })
        console.log('signature', signature)

        await saveSignatureOfferInDb({
          chainId: chain.id,
          price: price.toString(),
          downPaymentAmount: downPaymentAmount.toString(),
          minimumPrincipalPerPeriod: minimumPrincipalPerPeriod.toString(),
          nftId,
          nftContractAddress,
          creator,
          periodInterestRateBps,
          periodDuration,
          expiration,
          signature,
        })
        onSuccess()
      } catch (err) {
        console.error('Failed to create listing', err)
        onError()
      }
    },
  }
}
