import { FinancingTerms } from 'components/niftyapes/list-financing/FinancingTermsForm'
import { Address, useAccount, useSignTypedData } from 'wagmi'
import { signTypedData } from '@wagmi/core'
import useEnvChain from 'hooks/useEnvChain'

export default function useCreateListing() {
  const { address } = useAccount()
  const chain = useEnvChain()

  return {
    createListing: async function ({
      terms,
      onError,
    }: {
      terms: FinancingTerms
      onError?: (err: Error) => void
    }) {
      try {
        if (!address) {
          throw Error('Missing address')
        }
        if (!chain) {
          throw Error('Missing chainId')
        }

        const domain = {
          name: 'NiftyApes_SellerFinancing',
          version: '0.0.1',
          chainId: chain.id,
          // TODO: Add actual sellerFinancing contract address
          verifyingContract:
            '0x5e739684A36C47EE17A004a76d3094E3795177fd' as Address,
        }

        const types = {
          Offer: [
            // { name: 'price', type: 'uint128' },
            // { name: 'downPaymentAmount', type: 'uint128' },
            // { name: 'minimumPrincipalPerPeriod', type: 'uint128' },
            // { name: 'nftId', type: 'uint256' },
            // { name: 'nftContractAddress', type: 'address' },
            { name: 'creator', type: 'address' },
            // { name: 'periodInterestRateBps', type: 'uint32' },
            // { name: 'periodDuration', type: 'uint32' },
            // { name: 'expiration', type: 'uint32' },
          ],
        }

        const value = {
          creator: address,
        }

        const signature = await signTypedData({ domain, types, value })

        console.log(signature)
      } catch (err) {
        if (onError && err instanceof Error) {
          onError(err)
        } else {
          console.error('Failed to create listing', err)
        }
      }
    },
  }
}
