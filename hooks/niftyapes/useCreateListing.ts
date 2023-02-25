import { signTypedData } from '@wagmi/core'
import { parseEther } from 'ethers/lib/utils'
import useEnvChain from 'hooks/useEnvChain'
import { FinancingTerms } from 'lib/niftyapes/processOffer'
import { saveSignatureOfferInDb } from 'lib/niftyapes/saveSignatureOfferInDb'
import { useAccount } from 'wagmi'
import { useNiftyApesContract } from './useNiftyApesContract'

export default function useCreateListing() {
  const chain = useEnvChain()
  const { address: creator } = useAccount()
  const { address: verifyingContract } = useNiftyApesContract()

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
        const price = parseEther(String(terms.listPrice))
        const downPaymentAmount = parseEther(String(terms.downPaymentAmount))
        const remainingPrincipal = price.sub(downPaymentAmount)
        const minimumPrincipalPerPeriod = remainingPrincipal.div(
          terms.numPayPeriods!
        )
        const periodDuration = terms.periodDuration!
        const periodInterestRateBps = terms.periodInterestRateBps!
        const expiration = terms.expirationSeconds!
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
