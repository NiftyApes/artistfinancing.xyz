import { FinancingTerms } from 'components/niftyapes/list-financing/FinancingTermsForm'
import { useAccount, useSignTypedData } from 'wagmi'

export default function useCreateListing() {
  const { address } = useAccount()
  const { signTypedData } = useSignTypedData({
    onError(error) {
      console.error('GOTZ AN ERROR!!!')
    },
  })

  return {
    createListing: async function ({ terms }: { terms: FinancingTerms }) {
      // if (!signer) throw Error('Missing signer')
      if (!address) throw Error('Missing address')

      const domain = {
        name: 'NiftyApes_SellerFinancing',
        version: '0.0.1',
      }

      const types = {
        Offer: [
          { name: 'creator', type: 'address' },
          // { name: 'downPaymentBps', type: 'uint32' },
          // { name: 'minimumPrincipalPerPeriod', type: 'uint32' },
          // { name: 'periodInterestRateBps', type: 'uint32' },
          // { name: 'periodDuration', type: 'uint32' },
          // { name: 'nftContractAddress', type: 'address' },
          // { name: 'nftId', type: 'uint256' },
          // { name: 'expiration', type: 'uint32' },
        ],
      }

      const value = {
        creator: address,
      }

      signTypedData({ domain, types, value })

      // Ledger was ending signatures with '00' or '01' for some reason
      // So below we're replacing those with '1b' and '1c' respectively
      // In order to avoid ECDSA error
      // if (result.slice(-2) === '00') {
      //   result = result.slice(0, -2) + '1b'
      // }

      // if (result.slice(-2) === '01') {
      //   result = result.slice(0, -2) + '1c'
      // }
    },
  }
}
