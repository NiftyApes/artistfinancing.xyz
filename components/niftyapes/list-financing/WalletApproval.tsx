import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import LoadingDots from '../LoadingDots'

export default function WalletApproval({
  imageSrc,
  tokenName,
  isError,
}: {
  imageSrc: string
  tokenName: string
  isError: boolean
}) {
  return (
    <VStack h="full" justify="space-between">
      {isError && (
        <Alert bg="red.900" rounded="md" status="error">
          <AlertIcon />
          There was an error listing your item
        </Alert>
      )}
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
