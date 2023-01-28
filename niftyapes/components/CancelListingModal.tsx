import {
  Button,
  Heading,
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

export default function CancelListingModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <VStack spacing="2">
              <Heading size="md">Submit cancellation</Heading>
              <Text>
                To cancel this listing you must confirm the transaction and pay
                the gas fee.
              </Text>
            </VStack>
            <Button
              w="full"
              variant="outline"
              colorScheme="red"
              _hover={{ bg: 'blackAlpha.100' }}
              onClick={onClose}
            >
              Abort cancellation
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
