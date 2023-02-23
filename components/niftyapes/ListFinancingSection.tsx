import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import useOffers from 'hooks/niftyapes/useOffers'
import { DateTime, Duration } from 'luxon'
import { Collection } from 'types/reservoir'
import BuyNowPayLaterModal from './bnpl/BuyNowPayLaterModal'
import CancelListingModal from './cancel-listing/CancelListingModal'
import ListFinancingModal from './list-financing/ListFinancingModal'

export default function ListFinancingSection({
  token,
  collection,
  isOwner,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
  collection: Collection
  isOwner: boolean
}) {
  const {
    data: offerData,
    error,
    isLoading,
  } = useOffers({ collection: collection?.id, nftId: token?.token?.tokenId })
  const listing = offerData?.filter((offer) => offer.status !== 'CANCELLED')[0]

  let terms = null
  if (listing) {
    const { periodInterestRateBps, periodDuration } = listing.offer
    const interestRatePerSecond = periodInterestRateBps / periodDuration / 100
    const apr = Math.round(interestRatePerSecond * (365 * 86400))

    terms = {
      price: listing.offer.price,
      downPayment: listing.offer.downPaymentAmount,
      apr,
      minPrincipal: listing.offer.minimumPrincipalPerPeriod,
      payPeriodDuration: Duration.fromObject({
        seconds: listing.offer.periodDuration,
      }).as('days'),
      expiration: DateTime.fromSeconds(listing.offer.expiration).toRelative()!,
    }
  }

  return (
    <VStack w="full" align="left" spacing="8">
      <VStack w="full" align="left" spacing="0">
        <Heading size="md">
          {isOwner ? 'List with financing' : 'Buy now, pay later'}
        </Heading>
        <HStack>
          <Text>on NiftyApes</Text>
          <Image
            borderRadius="md"
            boxSize="1.5rem"
            src="/niftyapes/banana.png"
          />
        </HStack>
      </VStack>
      {listing && <CurrentListing terms={terms!} isOwner={isOwner} />}
      {isOwner ? (
        <HStack>
          <ListFinancingModal
            token={token}
            collection={collection}
            currListingExists={listing ? true : false}
            roundedButton={true}
          />
          {/* TODO Pass listing to cancel listing modal */}
          {listing && <CancelListingModal />}
        </HStack>
      ) : listing ? (
        <BuyNowPayLaterModal
          token={token}
          roundedButton={true}
          offer={listing}
        />
      ) : (
        <Box>No current finance listings</Box>
      )}
    </VStack>
  )
}

function CurrentListing({
  terms,
  isOwner,
}: {
  terms: {
    price: string
    downPayment: string
    apr: number
    minPrincipal: string
    payPeriodDuration: number
    expiration: string
  }
  isOwner: boolean
}) {
  return (
    <VStack w="full" align="left" spacing="4">
      <Heading size="sm">
        {isOwner ? 'Your current listing' : 'Current listing'}
      </Heading>
      <Grid rowGap="2" columnGap="12" templateColumns={'1fr 1fr'}>
        <GridItem>
          <HStack justify="space-between">
            <Text>Down payment</Text>
            <FormatNativeCrypto amount={terms.downPayment} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Price</Text>
            <FormatNativeCrypto amount={terms.price} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>APR</Text>
            <Text fontWeight="semibold">{`${terms.apr}%`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Minimum principal</Text>
            <FormatNativeCrypto amount={terms.minPrincipal} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Pay period</Text>
            <Text fontWeight="semibold">{`${terms.payPeriodDuration} days`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Expires</Text>
            <Text fontWeight="semibold">{terms.expiration}</Text>
          </HStack>
        </GridItem>
      </Grid>
    </VStack>
  )
}
