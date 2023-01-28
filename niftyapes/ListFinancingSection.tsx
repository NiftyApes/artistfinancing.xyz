import {
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
import CancelListingModal from './components/CancelListingModal'
import { FinancingTerms } from './components/FinancingTermsForm'
import ListFinancingModal from './components/ListFinancingModal'
import expirationOptions, { Expiration } from './util/expirationOptions'
import getAttributeFloor from './util/getAttributeFloor'

export default function ListFinancingSection({
  token,
  collection,
}: {
  token: any
  collection: any
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
  const currListingExists = useState(true)

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
      {currListingExists && <CurrentListing terms={defaultTerms} />}
      <HStack>
        <ListFinancingModal
          token={token}
          collection={collection}
          currListingExists
        />
        {currListingExists && <CancelListingModal />}
      </HStack>
    </VStack>
  )
}

function CurrentListing({ terms }: { terms: FinancingTerms }) {
  const paidOnSale = (terms.downPaymentPercent / 100) * terms.listPrice

  return (
    <VStack w="full" align="left" spacing="4">
      <Heading size="sm">Your current listing</Heading>
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
