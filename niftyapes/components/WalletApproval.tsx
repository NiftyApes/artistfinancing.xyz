import {
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import expirationOptions from 'niftyapes/util/expirationOptions'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { FinancingTerms } from './FinancingTermsForm'
import LoadingDots from './LoadingDots'

export function TermsStats({ terms }: { terms: FinancingTerms }) {
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
      <HStack justify="space-between">
        <Text>Grace period</Text>
        <Text fontWeight="semibold">{`${terms.gracePeriodDays} days`}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Late payments</Text>
        <Text fontWeight="semibold">{terms.numLatePayments}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text>Expires</Text>
        <Text fontWeight="semibold">
          {expirationOptions.find((option) => option.value === terms.expiration)
            ?.label || 'None'}
        </Text>
      </HStack>
    </VStack>
  )
}

export function WalletApproval({
  imageSrc,
  tokenName,
  onApprove,
}: {
  imageSrc: string
  tokenName: string
  onApprove: () => void
}) {
  // TODO: Remove when wallet integration implemented.
  setTimeout(onApprove, 3000)

  return (
    <VStack h="full" justify="space-between">
      <VStack justify="center" spacing="10" flexGrow={1}>
        <Heading
          size={'md'}
          textAlign="center"
        >{`Approve ${window.location.hostname} (on NiftyApes) to access item in your wallet`}</Heading>
        <HStack spacing="6">
          <Image
            borderRadius="md"
            boxSize="80px"
            src={imageSrc}
            alt={tokenName}
          ></Image>
          <LoadingDots />
          <Image
            borderRadius="md"
            boxSize="80px"
            src="/niftyapes/NA-BLACK.png"
          />
        </HStack>
        <Text align="center">
          Each NFT collection you want to trade requires a one-time approval
          transaction
        </Text>
      </VStack>
      <Button
        isLoading
        loadingText="Waiting for Approval"
        colorScheme="blue"
        w="full"
      ></Button>
    </VStack>
  )
}

export function ListingSuccess({
  tokenName,
  collectionName,
  onClose,
}: {
  tokenName: string
  collectionName: string
  onClose: () => void
}) {
  return (
    <VStack w="full" h="full" justify="space-between">
      <VStack justify="center" spacing="8" flexGrow={1}>
        <Icon color="green.400" boxSize="20" as={IoCheckmarkCircle} />
        <VStack>
          <Heading size={'md'} textAlign="center">
            Your item has been listed with financing!
          </Heading>
          <Text align="center">
            <Text as="span" color="blue.600">
              {tokenName}
            </Text>{' '}
            from{' '}
            <Text as="span" color="blue.600">
              {collectionName}
            </Text>{' '}
            has been listed for sale with financing
          </Text>
        </VStack>
        <VStack>
          <Text>View listing on</Text>
          <Image
            borderRadius="md"
            boxSize="60px"
            src="/niftyapes/NA-BLACK.png"
          />
        </VStack>
      </VStack>
      <Button onClick={onClose} colorScheme="blue" w="full">
        Close
      </Button>
    </VStack>
  )
}
