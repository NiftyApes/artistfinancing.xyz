import { useTokens, useUserTokens } from '@reservoir0x/reservoir-kit-ui'
import useMounted from 'hooks/useMounted'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { Collection } from 'types/reservoir'
import { useNiftyApesContract } from './useNiftyApesContract'

// Adds token images to each NiftyApes_SellerFinancingReceipt NFT
export function useNiftyApesImages() {
  const { address: niftyapesContractAddress } = useNiftyApesContract()
  const mounted = useMounted() // Check mounted to access 'window'

  return {
    addNiftyApesTokenImages(
      tokens:
        | ReturnType<typeof useTokens>['data']
        | ReturnType<typeof useUserTokens>['data']
    ) {
      tokens.forEach((token) => {
        if (!isEqualAddress(token?.token?.contract, niftyapesContractAddress)) {
          return
        }

        const nftId = token?.token?.tokenId
        if (!nftId || !token.token || !mounted) {
          return
        }

        token.token.image =
          Number(nftId) % 2 === 0
            ? `${window.location.origin}/niftyapes/buyer-ticket.png`
            : `${window.location.origin}/niftyapes/seller-ticket.png`
      })
    },

    addNiftyApesCollectionImage(collection?: Collection) {
      if (
        mounted &&
        collection &&
        isEqualAddress(collection?.id, niftyapesContractAddress)
      ) {
        collection.image = `${window.location.origin}/niftyapes/placeholder.png`
      }
    },
  }
}
