import {
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Offer } from 'hooks/niftyapes/useOffers'
import { useEffect } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdOutlineError } from 'react-icons/md'
import LoadingDots from '../LoadingDots'
import { useWaitForTransaction } from 'wagmi'
import { useCancelListing } from '@niftyapes/sdk'

export default function CancelListingModal({
  offer,
  refetch,
}: {
  offer: Offer
  refetch: () => void
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const onClose = () => {
    onModalClose()
  }

  const { data, isError, isLoading, write } = useCancelListing({
    offer: offer.offer,
    signature: offer.signature,
  })

  const {
    isError: isErrorTxn,
    isLoading: isLoadingTxn,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onCancel = () => {
    onOpen()
    write?.()
  }

  useEffect(() => {
    setTimeout(refetch, 3000)
  }, [isSuccess])

  return (
    <>
      <Button
        w="full"
        onClick={onCancel}
        variant="outline"
        colorScheme="gray"
        _hover={{ bg: 'gray.800' }}
      >
        Cancel finance listing
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bg="gray.700">
            Cancel your listing
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="12">
            {(isLoading || isLoadingTxn) && <CancellationInProgress />}
            {(isError || isErrorTxn) && <CancellationError onClose={onClose} />}
            {isSuccess && <CancellationSuccess onClose={onClose} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function CancellationError({ onClose }: { onClose: () => void }) {
  return (
    <VStack spacing="6">
      <VStack spacing="2">
        <Heading size="md">Cancellation Error</Heading>
        <Icon color="red.400" boxSize="20" as={MdOutlineError} />
      </VStack>
      <Button onClick={onClose} colorScheme="blue" w="full">
        Close
      </Button>
    </VStack>
  )
}

function CancellationInProgress() {
  return (
    <VStack spacing="6">
      <VStack align="left" spacing="2">
        <Heading size="md">Submit cancellation</Heading>
        <Text>
          To cancel this listing you must confirm the transaction and pay the
          gas fee.
        </Text>
      </VStack>
      <LoadingDots />
    </VStack>
  )
}

function CancellationSuccess({ onClose }: { onClose: () => void }) {
  return (
    <VStack spacing="6">
      <VStack spacing="2">
        <Heading size="md">Cancellation Success</Heading>
        <Icon color="green.400" boxSize="20" as={IoCheckmarkCircle} />
      </VStack>
      <Button onClick={onClose} colorScheme="blue" w="full">
        Close
      </Button>
    </VStack>
  )
}
