import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import FormatCrypto from 'components/FormatCrypto'
import { formatEther } from 'ethers/lib/utils.js'
import { Loan } from 'hooks/niftyapes/useLoans'
import useTokens from 'hooks/useTokens'
import { processLoan } from 'lib/niftyapes/processLoan'
import { formatDollar } from 'lib/numbers'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import { IoCheckmarkCircle, IoWallet } from 'react-icons/io5'
import { MdOutlineError } from 'react-icons/md'
import LoadingDots from './LoadingDots'

enum Steps {
  AcceptBid,
  ConfirmTransaction,
  AwaitTransaction,
  Success,
}

export default function AcceptOfferModal({
  token,
  listSourceLogo,
  topBidUsdPrice,
  activeLoan,
}: {
  token?: ReturnType<typeof useTokens>['tokens']['data'][0]
  listSourceLogo: string
  topBidUsdPrice: number | null
  activeLoan: Loan
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const [step, setStep] = useState(Steps.AcceptBid)
  const onClose = () => {
    onModalClose()
  }
  // const {
  //   write,
  //   isErrorTx,
  //   isErrorWrite,
  //   isSuccess,
  //   isLoadingTx,
  //   isLoadingWrite,
  // } = useWithdrawOfferSignature({
  //   offer: offer.offer,
  //   signature: offer.signature,
  // })
  const onCancel = () => {
    onOpen()
    // write?.()
  }

  // useEffect(() => {
  //   setTimeout(refetch, 3000)
  // }, [isSuccess])

  const topBid = token?.market?.topBid
  const showAcceptOffer = topBid?.id !== null && topBid?.id !== undefined
  const expiration = DateTime.fromSeconds(topBid?.validUntil || 0).toRelative()
  const price = token?.market?.topBid?.price?.amount?.decimal || 0
  const { interestToBePaid, remainingPrincipal } = processLoan(activeLoan.loan)
  const total =
    price - Number(formatEther(remainingPrincipal)) - interestToBePaid

  return (
    <>
      {showAcceptOffer && (
        <Button w="full" onClick={onCancel} colorScheme="purple">
          Accept Offer
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bg="gray.700">
            Accept Offer
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              justify="space-between"
              borderBottom="1px"
              borderColor="gray.600"
              p="6"
            >
              <HStack w="full" justify={'space-between'}>
                <Heading size="xs" color="gray.400">
                  Item
                </Heading>
                <Heading size="xs" color="gray.400">
                  Offer
                </Heading>
              </HStack>
              <HStack w="full" justify={'space-between'}>
                <HStack spacing="4">
                  <Image
                    borderRadius="md"
                    boxSize="100px"
                    objectFit="cover"
                    src={token?.token?.image}
                    alt={token?.token?.name}
                  ></Image>
                  <VStack align="start" w="full">
                    <Heading size="md">{token?.token?.name}</Heading>
                    <Text
                      mt="0 !important"
                      fontSize="md"
                      color="whiteAlpha.800"
                    >
                      {token?.token?.collection?.name}
                    </Text>

                    <Text fontSize="sm" color="gray.400">
                      Expires {expiration}
                    </Text>
                  </VStack>
                </HStack>
                <VStack align="end">
                  <Image boxSize="6" src={listSourceLogo} alt="Source Logo" />
                  <FormatCrypto
                    amount={price}
                    address={token?.market?.topBid?.price?.currency?.contract}
                    decimals={token?.market?.topBid?.price?.currency?.decimals}
                    maximumFractionDigits={8}
                  />
                  <Text fontSize="sm" color="gray.400">
                    {formatDollar(topBidUsdPrice)}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            {step === Steps.AcceptBid && (
              <>
                <VStack p="6" w="full" spacing="4">
                  <HStack w="full" justify={'space-between'}>
                    <Text color="gray.400">Bid price</Text>
                    <FormatCrypto
                      amount={price}
                      address={token?.market?.topBid?.price?.currency?.contract}
                      decimals={
                        token?.market?.topBid?.price?.currency?.decimals
                      }
                      maximumFractionDigits={8}
                    />
                  </HStack>
                  <HStack w="full" justify={'space-between'}>
                    <Text color="gray.400">Remaining loan principal</Text>
                    <HStack w="150px" justify={'space-between'}>
                      <Icon as={FaMinus} boxSize="2" />
                      <FormatCrypto
                        amount={remainingPrincipal}
                        address={
                          token?.market?.topBid?.price?.currency?.contract
                        }
                        decimals={
                          token?.market?.topBid?.price?.currency?.decimals
                        }
                        maximumFractionDigits={8}
                      />
                    </HStack>
                  </HStack>
                  <HStack w="full" justify={'space-between'}>
                    <Text color="gray.400">Remaining interest</Text>
                    <HStack w="150px" justify={'space-between'}>
                      <Icon as={FaMinus} boxSize="2" />
                      <FormatCrypto
                        amount={interestToBePaid}
                        address={
                          token?.market?.topBid?.price?.currency?.contract
                        }
                        decimals={
                          token?.market?.topBid?.price?.currency?.decimals
                        }
                        maximumFractionDigits={8}
                      />
                    </HStack>
                  </HStack>
                  <HStack mt="6" w="full" justify={'space-between'}>
                    <Heading size={'md'} fontWeight="semibold">
                      Total
                    </Heading>
                    <HStack
                      w="150px"
                      justify={total < 0 ? 'space-between' : 'end'}
                      py="4"
                      borderTop="1px"
                      borderColor="gray.600"
                    >
                      {total < 0 && <Icon boxSize={2} as={FaMinus} />}
                      <FormatCrypto
                        amount={Math.abs(total)}
                        address={
                          token?.market?.topBid?.price?.currency?.contract
                        }
                        decimals={
                          token?.market?.topBid?.price?.currency?.decimals
                        }
                        logoWidth={20}
                        fontSize={20}
                        maximumFractionDigits={8}
                      />
                    </HStack>
                  </HStack>
                </VStack>
                <Tooltip
                  isDisabled={total >= 0}
                  label="You cannot accept a bid that is less than your outstanding loan amount."
                  hasArrow
                  placement="top"
                >
                  <Button
                    mb="4"
                    w="full"
                    colorScheme={'purple'}
                    isDisabled={total < 0}
                    onClick={() => {
                      setStep(Steps.ConfirmTransaction)
                    }}
                  >
                    Accept
                  </Button>
                </Tooltip>
              </>
            )}
            {step === Steps.ConfirmTransaction && <ConfirmTransaction />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function ConfirmTransaction() {
  return (
    <VStack pt={6} pb={4} w="full" h="full" spacing="10">
      <Heading textAlign={'center'} size="md">
        Confirm purchase in your wallet
      </Heading>
      <Icon as={IoWallet} boxSize="10" />
      <Button
        isLoading
        loadingText="Waiting for Approval"
        colorScheme="blue"
        w="full"
      ></Button>
    </VStack>
  )
}

/*
function AcceptOfferSuccess({ onClose }: { onClose: () => void }) {
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
} */
