import { HStack, Text, VStack } from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import expirationOptions from 'lib/niftyapes/expirationOptions'
import { FinancingTerms } from 'lib/niftyapes/processOffer'

export default function TermsStats({ terms }: { terms: FinancingTerms }) {
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
        <FormatNativeCrypto amount={terms.downPaymentAmount} />
      </HStack>
      <HStack justify="space-between">
        <Text>APR</Text>
        <Text fontWeight="semibold">{`${terms.apr}%`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Minimum payment</Text>
        <FormatNativeCrypto amount={terms.minPrincipalPerPeriod} />
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
