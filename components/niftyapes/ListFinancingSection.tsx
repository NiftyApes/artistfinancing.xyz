import {
  Box,
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
import { setToast } from 'components/token/setToast'
import useOffers from 'hooks/niftyapes/useOffers'
import { FinancingTerms, processOffer } from 'lib/niftyapes/processOffer'
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
  const { data: offerData, isError } = useOffers({
    collection: collection?.id,
    nftId: token?.token?.tokenId,
  })
  const listing = offerData?.filter((offer) => offer.status !== 'CANCELLED')[0]
  const terms = listing ? processOffer(listing.offer) : null

  if (isError) {
    setToast({
      kind: 'error',
      message: 'An error occurred while checking for current listing.',
      title: 'Failed to load listing',
    })
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
  terms: FinancingTerms
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
            <FormatNativeCrypto amount={terms.downPaymentAmount} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Price</Text>
            <FormatNativeCrypto amount={terms.listPrice} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Minimum principal</Text>
            <FormatNativeCrypto amount={terms.minPrincipalPerPeriod} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Pay period</Text>
            <Text fontWeight="semibold">{`${terms.payPeriodDays} days`}</Text>
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
            <Text>Total cost</Text>
            <FormatNativeCrypto amount={terms.totalCost} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Loan duration</Text>
            <Text fontWeight="semibold">{`${terms.loanDurMos} months`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Expires</Text>
            <Text fontWeight="semibold">{terms.expirationRelative}</Text>
          </HStack>
        </GridItem>
      </Grid>
    </VStack>
  )
}
