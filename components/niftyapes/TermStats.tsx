import { Text, HStack, VStack } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import expirationOptions, { Expiration } from 'lib/niftyapes/expirationOptions'

type Terms = {
  listPrice: number
  downPaymentPercent: number
  interestRatePercent: number
  minPrincipalPercent: number
  payPeriodDays: number
  expiration?: Expiration
}

export default function TermsStats({ terms }: { terms: Terms }) {
  const paidOnSale = (terms.downPaymentPercent / 100) * terms.listPrice

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
        <Text>Price</Text>
        <FormatNativeCrypto amount={terms.listPrice} />
      </HStack>
      <HStack justify="space-between">
        <Text>Down payment</Text>
        <FormatNativeCrypto amount={paidOnSale} />
      </HStack>
      <HStack justify="space-between">
        <Text>APR</Text>
        <Text fontWeight="semibold">{`${terms.interestRatePercent}%`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Minimum payment</Text>
        <Text fontWeight="semibold">{`${terms.minPrincipalPercent}%`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Pay period</Text>
        <Text fontWeight="semibold">{`${terms.payPeriodDays} days`}</Text>
      </HStack>
      {terms.expiration && (
        <HStack justify="space-between">
          <Text>Expires</Text>
          <Text fontWeight="semibold">
            {expirationOptions.find(
              (option) => option.value === terms.expiration
            )?.label || 'None'}
          </Text>
        </HStack>
      )}
    </VStack>
  )
}
