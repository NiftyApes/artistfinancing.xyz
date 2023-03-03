import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { Offer } from 'hooks/niftyapes/useOffers'
import useTokens from 'hooks/useTokens'
import { processOffer } from 'lib/niftyapes/processOffer'
import { FiClock } from 'react-icons/fi'
import { Collection } from 'types/reservoir'
import BuyNowPayLaterModal from './bnpl/BuyNowPayLaterModal'
import ListFinancingModal from './list-financing/ListFinancingModal'

export default function TokenCardSection({
  token,
  collection,
  isOwner,
  offer,
}: {
  token: ReturnType<typeof useTokens>['tokens']['data'][0]
  collection?: Collection
  isOwner: boolean
  offer: Offer
}) {
  const terms = processOffer(offer.offer)

  return (
    <Box>
      <VStack px="4" pb="4">
        <Grid w="full" templateColumns={'repeat(5, 1fr)'} gap={2}>
          <GridItem colSpan={2}>
            <HStack spacing={1}>
              <FormatNativeCrypto amount={terms.downPaymentAmount} />
              <Text fontSize="sm" fontWeight={'semibold'}>Down</Text>
            </HStack>
          </GridItem>
          <GridItem colSpan={2}>
            <Text
              mt={1}
              fontSize={'xs'}
              fontWeight={'semibold'}
            >{`${terms.apr}% APR`}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Image
              borderRadius="full"
              boxSize="1.5rem"
              src="/niftyapes/NA-BLACK.png"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <HStack spacing="1">
              <Icon as={FiClock} />
              <Text fontSize={'xs'} fontWeight={'semibold'}>
                {terms.loanDurMos} months
              </Text>
            </HStack>
          </GridItem>
          <GridItem colSpan={3}>
            <Text fontSize={'xs'} fontWeight={'semibold'}>
              Expires {terms.expirationRelative}
            </Text>
          </GridItem>
        </Grid>
      </VStack>
      {isOwner ? (
        <ListFinancingModal
          token={token}
          collection={collection}
          currListingExists={true}
          roundedButton={false}
        />
      ) : (
        <BuyNowPayLaterModal
          token={token}
          roundedButton={false}
          offer={offer}
        />
      )}
    </Box>
  )
}
