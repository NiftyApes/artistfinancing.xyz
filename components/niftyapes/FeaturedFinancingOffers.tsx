import { Grid, Skeleton } from '@chakra-ui/react'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import TokenCard from 'components/TokenCard'
import useOffers from 'hooks/niftyapes/useOffers'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { useAccount } from 'wagmi'

export default function FeaturedFinancingOffers() {
  const { address } = useAccount()
  const { data: offersData, error, isLoading: isLoadingOffers } = useOffers({})
  const activeOffers = offersData?.filter(
    // Show active offers that aren't created by current account
    (offer) => offer.status === 'ACTIVE' && offer.offer.creator !== address
  )
  const tokenQueries = activeOffers?.map(
    (offer) => `${offer.offer.nftContractAddress}:${offer.offer.nftId}`
  )
  const {
    data: tokens,
    mutate: tokensMutate,
    isFetchingPage: isFetchingTokens,
  } = useTokens({
    tokens: tokenQueries,
  })

  if (isLoadingOffers || isFetchingTokens) {
    return (
      <Grid templateColumns={'repeat(5, 1fr)'} gap={12}>
        {[...Array(10)].map((_, idx) => (
          <Skeleton key={idx} rounded="md" height="sm" />
        ))}
      </Grid>
    )
  }

  const offersWithTokens = activeOffers
    ?.map((offer) => {
      const token = tokens.find(
        (token) =>
          isEqualAddress(
            token?.token?.contract,
            offer.offer.nftContractAddress
          ) && token?.token?.tokenId === offer.offer.nftId
      )

      return {
        offer,
        token,
      }
    })
    .filter(({ offer, token }) =>
      // Filter out offers where creator is not the current NFT owner
      isEqualAddress(offer.offer.creator, token?.token?.owner)
    )

  return (
    <Grid templateColumns={'repeat(5, 1fr)'} gap={12}>
      {offersWithTokens?.map(({ offer, token }, idx) => (
        <TokenCard
          key={idx}
          token={token}
          financeOffer={offer}
          collectionImage={undefined}
          mutate={tokensMutate}
        ></TokenCard>
      ))}
    </Grid>
  )
}