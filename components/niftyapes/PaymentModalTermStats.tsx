import { Text, HStack, VStack } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { BigNumber } from 'ethers'

type Terms = {
  apr: number
  duration: number
  minPayment: BigNumber
  payPeriodDays: number
  remainingPrincipal: number
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
        <Text>Principal</Text>
        <FormatNativeCrypto maximumFractionDigits={4} amount={terms.remainingPrincipal} />
      </HStack>
      <HStack justify="space-between">
        <Text>APR</Text>
        <Text fontWeight="semibold">{`${terms.apr}%`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Min. payment</Text>
        <FormatNativeCrypto maximumFractionDigits={4} amount={terms.minPayment} />
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
