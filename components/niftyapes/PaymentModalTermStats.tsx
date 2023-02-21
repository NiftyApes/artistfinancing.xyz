import { Text, HStack, VStack } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'

type Terms = {
  remainingPrincipal: number
  apr: number
  minPrincipalPercent: number
  payPeriodDays: number
  duration?: string
}

export default function PaymentModalTermStats({ terms }: { terms: Terms }) {
  return (
    <VStack
      bg="gray.700"
      py="2"
      px="4"
      borderRadius="md"
      align="left"
      w="full"
      spacing="1"
    >
      <HStack justify="space-between">
        <Text>Remaining principal</Text>
        <FormatNativeCrypto amount={terms.remainingPrincipal} />
      </HStack>
      <HStack justify="space-between">
        <Text>APR</Text>
        <Text fontWeight="semibold">{`${terms.apr}%`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Minimum payment</Text>
        <Text fontWeight="semibold">{`${terms.minPrincipalPercent}%`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Pay period</Text>
        <Text fontWeight="semibold">{`${terms.payPeriodDays} days`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Duration</Text>
        <Text fontWeight="semibold">{terms.duration}</Text>
      </HStack>
    </VStack>
  )
}
