import { Box, Button, Skeleton, VStack } from '@chakra-ui/react'
import { useCollections, useTokens } from '@reservoir0x/reservoir-kit-ui'
import TokenCard from 'components/TokenCard'
import { useOffers } from '@niftyapes/sdk'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { sortBy, uniq, uniqBy } from 'lodash'
import { useState } from 'react'
import Masonry from 'react-masonry-css'

export default function FeaturedFinancingOffers() {
  const [numOffers, setNumOffers] = useState(10) // Show 10 initial offers
  const onShowMore = () => {
    setNumOffers(numOffers + 10)
  }
  const { data: offersData, isLoading: isLoadingOffers } = useOffers({})

  const activeOffers = offersData?.filter((offer) => offer.status === 'ACTIVE')

  const mostRecentActiveOfferForEachNft = uniqBy(
    // sortBy is redundant since the API is already sorting
    // but it doesn't hurt to have it both on the backend and frontend
    sortBy(activeOffers, (offer) => -offer.createdAt),
    (offer) => `${offer.offer.nftContractAddress}:${offer.offer.nftId}`
  )

  const tokenQueries = uniq(
    mostRecentActiveOfferForEachNft?.map(
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

  const offersWithTokens = mostRecentActiveOfferForEachNft
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

  return (
    <VStack mb="12" spacing="12" w="full" className="w-full">
      <Masonry
        key="tokensGridMasonry"
        breakpointCols={{
          default: 5,
          1900: 5,
          1536: 4,
          1280: 3,
          1024: 2,
          768: 2,
          640: 2,
          500: 1,
        }}
        className="flex w-full gap-12"
        columnClassName=""
      >
        {isLoadingOffers || isFetchingTokens
          ? [...Array(numOffers)].map((_, idx) => (
              <Skeleton key={idx} rounded="md" height="sm" mb="6" />
            ))
          : fullOffers?.map(({ offer, token, collection }, idx) => (
              <Box mb="12" key={idx}>
                <TokenCard
                  token={token}
                  collection={collection}
                  collectionImage={collection?.image}
                  mutate={tokensMutate}
                />
              </Box>
            ))}
      </Masonry>
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
