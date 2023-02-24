import { signTypedData } from '@wagmi/core'
import { parseUnits } from 'ethers/lib/utils'
import useEnvChain from 'hooks/useEnvChain'
import expirationOptions, { Expiration } from 'lib/niftyapes/expirationOptions'
import { saveSignatureOfferInDb } from 'lib/niftyapes/saveSignatureOfferInDb'
import { DateTime } from 'luxon'
import { useAccount } from 'wagmi'
import { useSellerFinancingContractAddress } from './useContracts'

export type FinancingTerms = {
  listPrice: number
  downPaymentPercent: number
  apr: number
  minPrincipalPercent: number
  payPeriodDays: number
  expiration: Expiration
}

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
        // Percentage precision capped at 2 so multiply by 100 to remove decimal
        const downPaymentAmount = price
          .mul(parseFloat(terms.downPaymentPercent.toFixed(2)) * 100)
          .div(10000)
        const remainingPrincipal = price.sub(downPaymentAmount)
        // Percentage precision capped at 2 so multiply by 100 to remove decimal
        const minimumPrincipalPerPeriod = remainingPrincipal
          .mul(parseFloat(terms.minPrincipalPercent.toFixed(2)) * 100)
          .div(10000)

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
