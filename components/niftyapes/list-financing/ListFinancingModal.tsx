import {
  Box,
  Button,
  Flex,
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
import { Expiration } from 'lib/niftyapes/expirationOptions'
import getAttributeFloor from 'lib/niftyapes/getAttributeFloor'
import FinancingTermsForm, { FinancingTerms } from './FinancingTermsForm'
import TokenStats from './TokenStats'
import ListingSuccess from './ListingSuccess'
import TermsStats from '../TermStats'
import WalletApproval from './WalletApproval'
import useCreateListing from 'hooks/niftyapes/useCreateListing'

enum Step {
  SetTerms,
  WalletApproval,
  Success,
}

// TODO: Type out props.
// TODO: Load token and collection in modal.
export default function ListFinancingModal({
  token,
  collection,
  currListingExists,
  onSuccess,
}: {
  token: any
  collection: any
  currListingExists: boolean
  onSuccess: () => void
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const [step, setStep] = useState<Step>(Step.SetTerms)
  const { createListing } = useCreateListing()

  const attributeFloor = getAttributeFloor(token?.token?.attributes)
  const defaultTerms = {
    listPrice:
      attributeFloor || collection?.floorAsk?.price?.amount?.native || 0,
    downPaymentPercent: 20,
    interestRatePercent: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    expiration: Expiration.OneMonth,
  }
  const [terms, setTerms] = useState<FinancingTerms>(defaultTerms)
  const onClose = () => {
    setTerms(defaultTerms)
    setStep(Step.SetTerms)
    onModalClose()
  }
  // TODO: onError, setToast
  const onSubmit = () => {
    setStep(Step.WalletApproval)
    createListing({ terms })
  }

  if (!token || !collection) {
    return null
  }

  return (
    <>
      <Button w="full" onClick={onOpen} colorScheme="blue">
        {currListingExists
          ? 'Create new finance listing'
          : 'Create finance listing'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bg="gray.700">
            List with Financing
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Flex>
              <VStack
                w="72"
                borderRight="1px"
                borderColor="gray.600"
                p="6"
                flexShrink={0}
                align="left"
              >
                <Image
                  m="5px 0 !important"
                  borderRadius="md"
                  boxSize="200px"
                  objectFit="cover"
                  src={token.token.image}
                  alt={token.token.name}
                ></Image>
                <VStack align="left" w="full">
                  <Heading size="sm">{token.token.name}</Heading>
                  <Text mt="0 !important" fontSize="xs" color="whiteAlpha.800">
                    {token.token.collection.name}
                  </Text>
                </VStack>
                {step === Step.SetTerms && (
                  <TokenStats token={token} collection={collection} />
                )}
                {[Step.WalletApproval, Step.Success].includes(step) && (
                  <TermsStats terms={terms} />
                )}
              </VStack>
              <Box p="6" w="full">
                {step === Step.SetTerms && (
                  <FinancingTermsForm
                    terms={terms}
                    setTerms={setTerms}
                    onSubmit={onSubmit}
                  />
                )}
                {step === Step.WalletApproval && (
                  <WalletApproval
                    imageSrc={token.token.image}
                    tokenName={token.token.name}
                    onApprove={() => {
                      setStep(Step.Success)
                      onSuccess()
                    }}
                  />
                )}
                {step === Step.Success && (
                  <ListingSuccess
                    tokenName={token.token.name}
                    collectionName={token.token.collection.name}
                    onClose={onClose}
                  />
                )}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
