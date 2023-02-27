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
import { useState } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import LoadingDots from '../LoadingDots'

export default function CancelListingModal() {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const [cancellationSuccess, setCancellationSuccess] = useState(false)
  const onClose = () => {
    setCancellationSuccess(false)
    onModalClose()
  }

  return (
    <>
      <Button
        w="full"
        onClick={onOpen}
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
            {!cancellationSuccess ? (
              <CancellationInProgress
                onApprove={() => {
                  setCancellationSuccess(true)
                }}
                onClose={onClose}
              />
            ) : (
              <CancellationSuccess onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function CancellationInProgress({
  onClose,
  onApprove,
}: {
  onClose: () => void
  onApprove: () => void
}) {
  // TODO: Replace with actual data.
  setTimeout(onApprove, 3000)

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
      <Button
        w="full"
        variant="outline"
        colorScheme="red"
        _hover={{ bg: 'blackAlpha.100' }}
        onClick={onClose}
      >
        Abort cancellation
      </Button>
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
