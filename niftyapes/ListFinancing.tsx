import {
  Button,
  GridItem,
  Text,
  Image,
  Heading,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  VStack,
} from '@chakra-ui/react'

// TODO: Type out props.
export default function ListFinancing({ token }: { token: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!token) {
    return null
  }

  return (
    <>
      <Button onClick={onOpen} as={GridItem} colSpan={2} colorScheme={'blue'}>
        List with Financing
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            marginBottom={4}
            borderBottom={'1px'}
            borderColor="gray.600"
          >
            List with Financing
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <VStack align={'left'}>
                <Image
                  borderRadius={'md'}
                  boxSize={'150px'}
                  objectFit={'cover'}
                  src={token.token.image}
                  alt={token.token.name}
                ></Image>
                <Heading size={'sm'}>{token.token.name}</Heading>
                <Text margin={0} fontSize={'xs'} color={'whiteAlpha.800'}>
                  {token.token.collection.name}
                </Text>
              </VStack>
              <VStack></VStack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
