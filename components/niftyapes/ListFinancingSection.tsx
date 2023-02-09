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
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { useState } from 'react'
import BuyNowPayLaterModal from './bnpl/BuyNowPayLaterModal'
import CancelListingModal from './cancel-listing/CancelListingModal'
import { FinancingTerms } from './list-financing/FinancingTermsForm'
import ListFinancingModal from './list-financing/ListFinancingModal'
import expirationOptions, { Expiration } from 'lib/niftyapes/expirationOptions'
import getAttributeFloor from 'lib/niftyapes/getAttributeFloor'

export default function ListFinancingSection({
  token,
  collection,
  isOwner,
}: {
  token: any
  collection: any
  isOwner: boolean
}) {
  // TODO: Replace with terms from loaded data.
  const attributeFloor = getAttributeFloor(token?.token?.attributes)
  const defaultTerms = {
    listPrice:
      attributeFloor || collection?.floorAsk?.price?.amount?.native || 0,
    downPaymentPercent: 20,
    interestRatePercent: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    gracePeriodDays: 15,
    numLatePayments: 3,
    expiration: Expiration.OneMonth,
  }
  const [currListingExists, setCurrListingExists] = useState(true)

  return (
    <VStack w="full" align="left" spacing="8">
      <VStack w="full" align="left" spacing="0">
        <Heading size="md">List with financing</Heading>
        <HStack>
          <Text>on NiftyApes</Text>
          <Image
            borderRadius="md"
            boxSize="1.5rem"
            src="/niftyapes/banana.png"
          />
        </HStack>
      </VStack>
      {currListingExists && (
        <CurrentListing terms={defaultTerms} isOwner={isOwner} />
      )}
      {isOwner ? (
        <HStack>
          <ListFinancingModal
            token={token}
            collection={collection}
            currListingExists={currListingExists}
            onSuccess={() => {
              setCurrListingExists(true)
            }}
          />
          {currListingExists && (
            <CancelListingModal
              onSuccess={() => {
                setCurrListingExists(false)
              }}
            />
          )}
        </HStack>
      ) : (
        <Box borderRadius="md" overflow="hidden">
          <BuyNowPayLaterModal token={token} />
        </Box>
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
  const paidOnSale = (terms.downPaymentPercent / 100) * terms.listPrice

  return (
    <VStack w="full" align="left" spacing="4">
      <Heading size="sm">
        {isOwner ? 'Your current listing' : 'Current listing'}
      </Heading>
      <Grid rowGap="2" columnGap="12" templateColumns={'1fr 1fr'}>
        <GridItem>
          <HStack justify="space-between">
            <Text>Price</Text>
            <FormatNativeCrypto amount={terms.listPrice} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Down payment</Text>
            <FormatNativeCrypto amount={paidOnSale} />
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>APR</Text>
            <Text fontWeight="semibold">{`${terms.interestRatePercent}%`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Minimum payment</Text>
            <Text fontWeight="semibold">{`${terms.minPrincipalPercent}%`}</Text>
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
            <Text>Grace period</Text>
            <Text fontWeight="semibold">{`${terms.gracePeriodDays} days`}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Late payments</Text>
            <Text fontWeight="semibold">{terms.numLatePayments}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <HStack justify="space-between">
            <Text>Expires</Text>
            <Text fontWeight="semibold">
              {expirationOptions.find(
                (option) => option.value === terms.expiration
              )?.label || 'None'}
            </Text>
          </HStack>
        </GridItem>
      </Grid>
    </VStack>
  )
}
