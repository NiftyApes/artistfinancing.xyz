import { Text, Image, Heading, Icon, VStack, Button } from '@chakra-ui/react'
import { IoCheckmarkCircle } from 'react-icons/io5'

export default function ListingSuccess({
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
            has been listed for sale with financing.
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
