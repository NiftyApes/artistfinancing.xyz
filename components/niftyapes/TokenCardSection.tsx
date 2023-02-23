import { Box, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { BigNumber } from 'ethers'
import { Offer } from 'hooks/niftyapes/useOffers'
import useTokens from 'hooks/useTokens'
import { DateTime } from 'luxon'
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
  const downPaymentAmount = BigNumber.from(offer.offer.downPaymentAmount)

  const { periodInterestRateBps, periodDuration } = offer.offer
  const interestRatePerSecond = periodInterestRateBps / periodDuration / 100
  const apr = Math.round(interestRatePerSecond * (365 * 86400))

  const expiration = DateTime.fromSeconds(offer.offer.expiration).toRelative()

  return (
    <Box>
      <VStack px="4" pb="4">
        <HStack w="full" justify={'space-between'}>
          <HStack>
            <FormatNativeCrypto amount={downPaymentAmount} />
            <Text>Down</Text>
          </HStack>
          <Image
            borderRadius="full"
            boxSize="1.5rem"
            src="/niftyapes/NA-BLACK.png"
          />
        </HStack>
        <HStack w="full" spacing="4" justify={'space-between'}>
          <Text>{`${apr}% APR`}</Text>
          <HStack spacing="1">
            <Icon as={FiClock} />
            <Text>{expiration}</Text>
          </HStack>
        </HStack>
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
