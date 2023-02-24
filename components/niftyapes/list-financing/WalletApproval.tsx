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
import { ListFinancingSteps } from './ListFinancingModal'

export default function WalletApproval({
  imageSrc,
  tokenName,
  isError,
  backToEdit,
  retry,
  step,
}: {
  imageSrc?: string
  tokenName?: string
  isError: boolean
  backToEdit: () => void
  retry: () => void
  step: ListFinancingSteps
}) {
  const buttonLoadingText =
    step === ListFinancingSteps.ApproveContract
      ? 'Waiting for Approval'
      : 'Waiting for Signature'

  return (
    <VStack w="full" h="full" justify="space-between">
      {isError && (
        <Alert w="full" bg="red.900" rounded="md" status="error">
          <AlertIcon />
          There was an error listing your item
        </Alert>
      )}
      <VStack justify="center" spacing="10" flexGrow={1}>
        <Heading size={'md'} textAlign="center">
          {step === ListFinancingSteps.ApproveContract
            ? `Approve ${window.location.hostname} (on NiftyApes) to access item in your wallet`
            : `Confirm finance listing on ${window.location.hostname} (on NiftyApes) in your wallet`}
        </Heading>
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
          {step === ListFinancingSteps.ApproveContract
            ? 'Each NFT you want to trade requires a one-time approval transaction'
            : 'A free off-chain signature to create the finance listing'}
        </Text>
      </VStack>
      {isError ? (
        <HStack w="full">
          <Button
            w="50%"
            bg="gray.700"
            _hover={{ bg: 'gray.600' }}
            onClick={backToEdit}
          >
            Edit listing
          </Button>
          <Button w="50%" colorScheme={'blue'} onClick={retry}>
            Retry
          </Button>
        </HStack>
      ) : (
        <Button
          isLoading
          loadingText={buttonLoadingText}
          colorScheme="blue"
          w="full"
        ></Button>
      )}
    </VStack>
  )
}
