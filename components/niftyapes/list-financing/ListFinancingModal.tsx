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
  Progress,
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
import { setToast } from 'components/token/setToast'
import useERC721Approval from 'hooks/niftyapes/useERC721Approval'

enum Step {
  SetTerms,
  ApproveContract,
  SignOffer,
  Success,
}

// TODO: Type out props.
export default function ListFinancingModal({
  token,
  collection,
  currListingExists,
  showListing,
}: {
  token: any
  collection: any
  currListingExists: boolean
  showListing: () => void
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const [step, setStep] = useState<Step>(Step.SetTerms)
  const { createListing } = useCreateListing()
  const { approvalRequired, grantApproval } = useERC721Approval({
    tokenId: token?.token?.tokenId as string,
    contractAddress: token?.token?.contract,
  })

  const attributeFloor = getAttributeFloor(token?.token?.attributes)
  const defaultTerms = {
    listPrice:
      attributeFloor || collection?.floorAsk?.price?.amount?.native || 0,
    downPaymentPercent: 20,
    apr: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    expiration: Expiration.OneMonth,
  }
  const [terms, setTerms] = useState<FinancingTerms>(defaultTerms)
  const [listingErr, setListingErr] = useState(false)
  const onError = () => {
    setListingErr(true)
    setToast({
      kind: 'error',
      message: 'The transaction was not completed.',
      title: 'Failed to list token',
    })
  }
  const onClose = () => {
    setTerms(defaultTerms)
    setStep(Step.SetTerms)
    setListingErr(false)
    onModalClose()
  }
  const onContractApproved = () => {
    setStep(Step.SignOffer)
    createListing({
      terms,
      token,
      onSuccess: () => {
        setStep(Step.Success)
        showListing()
      },
      onError,
    })
  }
  const onSubmit = () => {
    // reset error
    setListingErr(false)

    if (approvalRequired) {
      setStep(Step.ApproveContract)
      grantApproval({
        onSuccess: onContractApproved,
        onError,
      })
    } else {
      onContractApproved()
    }
  }

  let progressValue = 0
  switch (step) {
    case Step.Success:
      progressValue = 100
      break
    case Step.SignOffer:
      progressValue = 50
      break
    case Step.ApproveContract:
    default:
      progressValue = 0
  }

  if (!token || !collection) {
    return null
  }

  return (
    <>
      <Button
        w="full"
        onClick={() => {
          onOpen()
          setTerms(defaultTerms)
        }}
        colorScheme="blue"
      >
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
                {[Step.ApproveContract, Step.SignOffer, Step.Success].includes(
                  step
                ) && <TermsStats terms={terms} />}
              </VStack>
              <VStack p="6" w="full">
                {[Step.ApproveContract, Step.SignOffer, Step.Success].includes(
                  step
                ) && (
                  <Progress
                    rounded="md"
                    w="full"
                    colorScheme="blue"
                    value={progressValue}
                  />
                )}
                {step === Step.SetTerms && (
                  <FinancingTermsForm
                    terms={terms}
                    setTerms={setTerms}
                    onSubmit={onSubmit}
                  />
                )}
                {[Step.ApproveContract, Step.SignOffer].includes(step) && (
                  <WalletApproval
                    imageSrc={token.token.image}
                    tokenName={token.token.name}
                    isError={listingErr}
                    backToEdit={() => {
                      setListingErr(false)
                      setStep(Step.SetTerms)
                    }}
                    retry={onSubmit}
                    contractApprovalRequired={approvalRequired}
                  />
                )}
                {step === Step.Success && (
                  <ListingSuccess
                    tokenName={token.token.name}
                    collectionName={token.token.collection.name}
                    onClose={onClose}
                  />
                )}
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
