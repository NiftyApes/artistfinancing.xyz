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
import TokenStats from './components/TokenStats'

// TODO: Type out props.
export default function ListFinancing({
  token,
  collection,
}: {
  token: any
  collection: any
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!token || !collection) {
    return null
  }

  return (
    <>
      <Button onClick={onOpen} as={GridItem} colSpan={2} colorScheme="blue">
        List with Financing
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bg="gray.700">
            List with Financing
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Flex>
              <VStack w="72" borderRight="1px" borderColor="gray.600" p="6">
                <VStack align="left" w="full">
                  <Image
                    m="5px 0 !important"
                    borderRadius="md"
                    boxSize="200px"
                    objectFit="cover"
                    src={token.token.image}
                    alt={token.token.name}
                  ></Image>
                </VStack>
                <VStack align="left" w="full">
                  <Heading size="sm">{token.token.name}</Heading>
                  <Text fontSize="xs" color="whiteAlpha.800">
                    {token.token.collection.name}
                  </Text>
                </VStack>
                <TokenStats token={token} collection={collection} />
              </VStack>
              <VStack align="left" p="6" flexGrow="1">
                <Heading size="md">Set your price</Heading>
                <Button colorScheme="blue" onClick={onClose}>
                  Next
                </Button>
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
