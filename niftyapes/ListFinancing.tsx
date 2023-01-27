import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Image,
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
import FinancingTermsForm, {
  FinancingTerms,
} from './components/FinancingTermsForm'
import TokenStats from './components/TokenStats'
import { TermsStats, WalletApproval } from './components/WalletApproval'
import { Expiration } from './util/expirationOptions'
import getAttributeFloor from './util/getAttributeFloor'

enum Step {
  SetTerms,
  WalletApproval,
  Success,
}

// TODO: Type out props.
export default function ListFinancing({
  token,
  collection,
}: {
  token: any
  collection: any
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [step, setStep] = useState<Step>(Step.SetTerms)

  const attributeFloor = getAttributeFloor(token?.token?.attributes)
  const defaultTerms = {
    listPrice:
      attributeFloor || collection?.floorAsk?.price?.amount?.native || 0,
    downPaymentPercent: 20,
    interestRatePercent: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    gracePeriodDays: 15,
    numLatePayments: 3,
    expiration: Expiration.OneMonth,
  }
  const [terms, setTerms] = useState<FinancingTerms>(defaultTerms)

  if (!token || !collection) {
    return null
  }

  return (
    <>
      <Button onClick={onOpen} as={GridItem} colSpan={2} colorScheme="blue">
        List with Financing
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setTerms(defaultTerms)
          setStep(Step.SetTerms)
          onClose()
        }}
        size="4xl"
      >
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
                {step === Step.SetTerms && (
                  <TokenStats token={token} collection={collection} />
                )}
                {step === Step.WalletApproval && <TermsStats />}
              </VStack>
              <Box p="6" flexGrow="1">
                {step === Step.SetTerms && (
                  <FinancingTermsForm
                    terms={terms}
                    setTerms={setTerms}
                    onSubmit={() => {
                      setStep(Step.WalletApproval)
                    }}
                  />
                )}
                {step === Step.WalletApproval && <WalletApproval />}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
