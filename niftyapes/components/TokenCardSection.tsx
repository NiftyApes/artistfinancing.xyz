import { Box, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import useTokens from 'hooks/useTokens'
import expirationOptions, { Expiration } from 'niftyapes/util/expirationOptions'
import { FiClock } from 'react-icons/fi'
import { GoArrowDown } from 'react-icons/go'
import BuyNowPayLaterModal from './BuyNowPayLaterModal'

export default function TokenCardSection({
  token,
  isOwner,
}: {
  token: ReturnType<typeof useTokens>['tokens']['data'][0]
  isOwner: boolean
}) {
  // TODO: Remove mock data.
  const terms = {
    listPrice: 1.2,
    downPaymentPercent: 20,
    interestRatePercent: 20,
    expiration: Expiration.OneMonth,
  }

  return (
    <Box>
      <VStack px="4" pb="4">
        <HStack w="full" justify={'space-between'}>
          <FormatNativeCrypto amount={terms.listPrice} />
          <HStack>
            <Icon as={GoArrowDown} />
            <Text fontWeight="semibold">{`${terms.downPaymentPercent}%`}</Text>
          </HStack>
          <Image
            borderRadius="full"
            boxSize="1.5rem"
            src="/niftyapes/NA-BLACK.png"
          />
        </HStack>
        <HStack w="full" spacing="4">
          <Text fontWeight="semibold">{`${terms.interestRatePercent}% APR`}</Text>
          <HStack spacing="1">
            <Icon as={FiClock} />
            <Text fontWeight="semibold">
              {expirationOptions.find(
                (option) => option.value === terms.expiration
              )?.label || 'None'}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {!isOwner && <BuyNowPayLaterModal token={token} />}
    </Box>
  )
}
