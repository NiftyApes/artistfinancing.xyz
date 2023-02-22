import { Box, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { BigNumber } from 'ethers'
import { Offer } from 'hooks/niftyapes/useOffers'
import useTokens from 'hooks/useTokens'
import { DateTime } from 'luxon'
import { FiClock } from 'react-icons/fi'
import { GoArrowDown } from 'react-icons/go'
import BuyNowPayLaterModal from './bnpl/BuyNowPayLaterModal'

export default function TokenCardSection({
  token,
  isOwner,
  offer,
}: {
  token: ReturnType<typeof useTokens>['tokens']['data'][0]
  isOwner: boolean
  offer: Offer
}) {
  const price = BigNumber.from(offer.offer.price)

  const downPaymentAmount = BigNumber.from(offer.offer.downPaymentAmount)
  const downPaymentPercent = downPaymentAmount.mul(100).div(price)

  const { periodInterestRateBps, periodDuration } = offer.offer
  const interestRatePerSecond = periodInterestRateBps / periodDuration / 100
  const apr = Math.round(interestRatePerSecond * (365 * 86400))

  const expiration = DateTime.fromSeconds(offer.offer.expiration).toRelative()

  return (
    <Box>
      <VStack px="4" pb="4">
        <HStack w="full" justify={'space-between'}>
          <FormatNativeCrypto amount={price} />
          <HStack>
            <Icon as={GoArrowDown} />
            <Text fontWeight="semibold">{`${downPaymentPercent}%`}</Text>
          </HStack>
          <Image
            borderRadius="full"
            boxSize="1.5rem"
            src="/niftyapes/NA-BLACK.png"
          />
        </HStack>
        <HStack w="full" spacing="4">
          <Text fontWeight="semibold">{`${apr}% APR`}</Text>
          <HStack spacing="1">
            <Icon as={FiClock} />
            <Text fontWeight="semibold">{expiration}</Text>
          </HStack>
        </HStack>
      </VStack>
      {!isOwner && <BuyNowPayLaterModal token={token} />}
    </Box>
  )
}
