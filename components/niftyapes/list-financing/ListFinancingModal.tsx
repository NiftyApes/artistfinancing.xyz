import {
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
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { setToast } from 'components/token/setToast'
import useCreateListing from 'hooks/niftyapes/useCreateListing'
import useERC721Approval from 'hooks/niftyapes/useERC721Approval'
import { Expiration } from 'lib/niftyapes/expirationOptions'
import getAttributeFloor from 'lib/niftyapes/getAttributeFloor'
import { FinancingTerms } from 'lib/niftyapes/processOffer'
import { useState } from 'react'
import { Collection } from 'types/reservoir'
import { Address } from 'wagmi'
import TermsStats from '../TermStats'
import FinancingTermsForm from './FinancingTermsForm'
import ListingSuccess from './ListingSuccess'
import TokenStats from './TokenStats'
import WalletApproval from './WalletApproval'

export enum ListFinancingSteps {
  SetTerms,
  ApproveContract,
  SignOffer,
  Success,
}

export default function ListFinancingModal({
  token,
  collection,
  currListingExists,
  roundedButton,
}: {
  token: ReturnType<typeof useTokens>['data'][0]
  collection?: Collection
  currListingExists: boolean
  roundedButton: boolean
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const [step, setStep] = useState<ListFinancingSteps>(
    ListFinancingSteps.SetTerms
  )
  const { createListing } = useCreateListing()
  const { approvalRequired, grantApproval, approvalCheckErr } =
    useERC721Approval({
      tokenId: token?.token?.tokenId as string,
      contractAddress: token?.token?.contract as Address,
    })

  const attributeFloor = getAttributeFloor(token?.token?.attributes)
  const defaultTerms = {
    listPrice:
      attributeFloor || collection?.floorAsk?.price?.amount?.native || 0,
    downPaymentPercent: 20,
    apr: 20,
    payPeriodDays: 30,
    loanDurMos: 6,
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
  const onApprovalCheckErr = () => {
    setListingErr(true)
    setToast({
      kind: 'error',
      message: 'The transaction was not completed.',
      title: 'Failed to verify token approval',
    })
  }
  const onClose = () => {
    setTerms(defaultTerms)
    setStep(ListFinancingSteps.SetTerms)
    setListingErr(false)
    onModalClose()
  }
  const onContractApproved = () => {
    setStep(ListFinancingSteps.SignOffer)
    createListing({
      terms,
      token,
      onSuccess: () => {
        setStep(ListFinancingSteps.Success)
      },
      onError,
    })
  }
  const onSubmit = () => {
    // reset error
    setListingErr(false)
    setStep(ListFinancingSteps.ApproveContract)

    if (approvalCheckErr) {
      onApprovalCheckErr()
      return
    }

    if (approvalRequired) {
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
    case ListFinancingSteps.Success:
      progressValue = 100
      break
    case ListFinancingSteps.SignOffer:
      progressValue = 50
      break
    case ListFinancingSteps.ApproveContract:
    default:
      progressValue = 0
  }

  if (!token || !collection) {
    return null
  }

  return (
    <>
      <button
        onClick={() => {
          onOpen()
          setTerms(defaultTerms)
        }}
        className={`btn-primary-fill reservoir-subtitle flex h-[40px] w-full items-center justify-center whitespace-nowrap ${
          roundedButton ? 'rounded-md' : 'rounded-none'
        } text-white focus:ring-0`}
      >
        {currListingExists
          ? 'Create new finance listing'
          : 'Create finance listing'}
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
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
                  src={token?.token?.image}
                  alt={token?.token?.name}
                ></Image>
                <VStack align="left" w="full">
                  <Heading size="sm">{token?.token?.name}</Heading>
                  <Text mt="0 !important" fontSize="xs" color="whiteAlpha.800">
                    {token?.token?.collection?.name}
                  </Text>
                </VStack>
                {step === ListFinancingSteps.SetTerms && (
                  <TokenStats token={token} collection={collection} />
                )}
                {[
                  ListFinancingSteps.ApproveContract,
                  ListFinancingSteps.SignOffer,
                  ListFinancingSteps.Success,
                ].includes(step) && <TermsStats terms={terms} />}
              </VStack>
              <VStack p="6" w="full">
                {[
                  ListFinancingSteps.ApproveContract,
                  ListFinancingSteps.SignOffer,
                  ListFinancingSteps.Success,
                ].includes(step) && (
                  <Progress
                    rounded="md"
                    w="full"
                    colorScheme="blue"
                    value={progressValue}
                  />
                )}
                {step === ListFinancingSteps.SetTerms && (
                  <FinancingTermsForm
                    onSubmit={onSubmit}
                    terms={terms}
                    setTerms={setTerms}
                  />
                )}
                {[
                  ListFinancingSteps.ApproveContract,
                  ListFinancingSteps.SignOffer,
                ].includes(step) && (
                  <WalletApproval
                    imageSrc={token?.token?.image}
                    tokenName={token?.token?.name}
                    isError={listingErr}
                    backToEdit={() => {
                      setListingErr(false)
                      setStep(ListFinancingSteps.SetTerms)
                    }}
                    retry={onSubmit}
                    step={step}
                  />
                )}
                {step === ListFinancingSteps.Success && (
                  <ListingSuccess
                    tokenName={token?.token?.name}
                    collectionName={token?.token?.collection?.name}
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
