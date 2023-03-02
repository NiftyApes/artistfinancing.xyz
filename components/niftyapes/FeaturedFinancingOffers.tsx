import { Button, Grid, Skeleton, VStack } from '@chakra-ui/react'
import { useCollections, useTokens } from '@reservoir0x/reservoir-kit-ui'
import TokenCard from 'components/TokenCard'
import useOffers from 'hooks/niftyapes/useOffers'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { uniq } from 'lodash'
import { useState } from 'react'

export default function FeaturedFinancingOffers() {
  const [numOffers, setNumOffers] = useState(10) // Show 10 initial offers
  const onShowMore = () => {
    setNumOffers(numOffers + 10)
  }
  const { data: offersData, isLoading: isLoadingOffers } = useOffers({})
  const activeOffers = offersData?.filter((offer) => offer.status === 'ACTIVE')
  const tokenQueries = uniq(
    activeOffers?.map(
      (offer) => `${offer.offer.nftContractAddress}:${offer.offer.nftId}`
    )
  )

  const {
    data: tokens,
    mutate: tokensMutate,
    isFetchingPage: isFetchingTokens,
  } = useTokens({
    tokens: tokenQueries,
  })

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
    .filter(
      ({ offer, token }) =>
        // Filter out offers where creator is not the current NFT owner
        token && isEqualAddress(offer.offer.creator, token?.token?.owner)
    )
    .slice(0, numOffers) // Only show numOffers

  const collectionQueries = uniq(
    offersWithTokens?.map(({ offer }) => offer.offer.nftContractAddress)
  )

  const { data: collections } = useCollections({
    contract: collectionQueries,
  })

  const fullOffers = offersWithTokens?.map((offerWithToken) => {
    const collection = collections?.find((collection) =>
      isEqualAddress(
        offerWithToken.offer.offer.nftContractAddress,
        collection.id
      )
    )

    return {
      ...offerWithToken,
      collection,
    }
  })

  if (isLoadingOffers || isFetchingTokens) {
    return (
      <Grid templateColumns={'repeat(5, 1fr)'} gap={12}>
        {[...Array(numOffers)].map((_, idx) => (
          <Skeleton key={idx} rounded="md" height="sm" />
        ))}
      </Grid>
    )
  }

  return (
    <VStack mb="12" spacing="12">
      <Grid w="full" templateColumns={'repeat(5, 1fr)'} gap={12}>
        {fullOffers?.map(({ offer, token, collection }, idx) => (
          <TokenCard
            key={idx}
            token={token}
            financeOffer={offer}
            collection={collection}
            collectionImage={collection?.image}
            mutate={tokensMutate}
          ></TokenCard>
        ))}
      </Grid>
      <Button
        hidden={numOffers > Number(fullOffers?.length)}
        colorScheme={'purple'}
        onClick={onShowMore}
      >
        Show more
      </Button>
    </VStack>
  )
}
