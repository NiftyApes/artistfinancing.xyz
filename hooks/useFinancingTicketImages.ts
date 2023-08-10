import { useTokens, useUserTokens } from '@reservoir0x/reservoir-kit-ui'
import useMounted from 'hooks/useMounted'
import isEqualAddress from 'lib/isEqualAddress'
import { useSellerFinancingContract } from '@niftyapes/sdk'

// Adds token images to each NiftyApes_SellerFinancingReceipt NFT
export function useNiftyApesImages(
  tokens:
    | ReturnType<typeof useTokens>['data']
    | ReturnType<typeof useUserTokens>['data']
) {
  const { address } = useSellerFinancingContract()
  const mounted = useMounted() // Check mounted to access 'window'

  tokens.forEach((token) => {
    if (!isEqualAddress(token?.token?.contract, address)) {
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
}
