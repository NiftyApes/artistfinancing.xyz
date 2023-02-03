import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import useTokens from 'hooks/useTokens'
import { useState } from 'react'

enum Step {
  Checkout,
  Success,
}

export default function BuyNowPayLaterModal({
  token,
}: {
  token?: ReturnType<typeof useTokens>['tokens']['data'][0]
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [step, setStep] = useState<Step>(Step.Checkout)

  return (
    <>
      <Button
        borderRadius={'none'}
        w="full"
        onClick={onOpen}
        colorScheme="blue"
      >
        Buy Now, Pay Later
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bg="gray.700">
            Complete Checkout
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Image
              m="5px 0 !important"
              borderRadius="md"
              boxSize="200px"
              objectFit="cover"
              src={token?.token?.image}
              alt={token?.token?.name}
            ></Image>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
