import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { uniq } from 'lodash'
import { Address, useAccount } from 'wagmi'
import { useLoans } from '@niftyapes/sdk'

export const useNftOwnership = () => {
  const { address } = useAccount()
  const { data: loans, isLoading } = useLoans({
    buyer: address,
  })
  const activeLoans = loans?.filter((loan) => loan.status === 'ACTIVE')

  const tokenQueries = uniq(
    activeLoans?.map(
      ({ offer }) => `${offer.offer.nftContractAddress}:${offer.offer.nftId}`
    )
  )
  const {
    data: entitledTokens,
    isFetchingPage,
    isFetchingInitialData,
  } = useTokens({
    tokens: tokenQueries,
  })

  return {
    isLoading,
    isLoadingTokens: isFetchingPage || isFetchingInitialData,
    entitledTokens,
    isEntitledToNft(contract?: Address, tokenId?: string) {
      if (!address || !activeLoans || !contract || !tokenId) return false

      // Find active loan matching this contract and tokenId
      return activeLoans.some(
        ({ offer }) =>
          isEqualAddress(offer.offer.nftContractAddress, contract) &&
          offer.offer.nftId === tokenId
      )
    },
    activeLoanforNft(contract?: Address, tokenId?: string) {
      if (!address || !activeLoans || !contract || !tokenId) return undefined

      // Find active loan matching this contract and tokenId
      return activeLoans.find(
        ({ offer }) =>
          isEqualAddress(offer.offer.nftContractAddress, contract) &&
          offer.offer.nftId === tokenId
      )
    },
  }
}
