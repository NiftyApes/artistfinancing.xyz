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
import { FaMinus } from 'react-icons/fa'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdOutlineError } from 'react-icons/md'
import LoadingDots from './LoadingDots'

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
  console.log(price)
  console.log(remainingPrincipal)
  console.log(interestToBePaid)
  const total =
    price - Number(formatEther(remainingPrincipal)) - interestToBePaid

  console.log('topBid', topBid)
  console.log('activeLoan', activeLoan)
  console.log('total', total)

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
          <ModalBody p="0">
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
            <VStack p="6" w="full" spacing="4">
              <HStack w="full" justify={'space-between'}>
                <Text color="gray.400">Bid price</Text>
                <FormatCrypto
                  amount={price}
                  address={token?.market?.topBid?.price?.currency?.contract}
                  decimals={token?.market?.topBid?.price?.currency?.decimals}
                  maximumFractionDigits={8}
                />
              </HStack>
              <HStack w="full" justify={'space-between'}>
                <Text color="gray.400">Remaining loan principal</Text>
                <HStack w="150px" justify={'space-between'}>
                  <Icon as={FaMinus} boxSize="2" />
                  <FormatCrypto
                    amount={remainingPrincipal}
                    address={token?.market?.topBid?.price?.currency?.contract}
                    decimals={token?.market?.topBid?.price?.currency?.decimals}
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
                    address={token?.market?.topBid?.price?.currency?.contract}
                    decimals={token?.market?.topBid?.price?.currency?.decimals}
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
                  justify={'space-between'}
                  py="4"
                  borderTop="1px"
                  borderColor="gray.600"
                >
                  <Icon boxSize={2} as={total < 0 ? FaMinus : Box} />
                  <FormatCrypto
                    amount={Math.abs(total)}
                    address={token?.market?.topBid?.price?.currency?.contract}
                    decimals={token?.market?.topBid?.price?.currency?.decimals}
                    logoWidth={30}
                    fontSize={20}
                    maximumFractionDigits={8}
                  />
                </HStack>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function AcceptOfferError({ onClose }: { onClose: () => void }) {
  return (
    <VStack spacing="6">
      <VStack spacing="2">
        <Heading size="md">Cancellation Error</Heading>
        <Icon color="red.400" boxSize="20" as={MdOutlineError} />
      </VStack>
      <Button onClick={onClose} colorScheme="blue" w="full">
        Close
      </Button>
    </VStack>
  )
}

function AcceptOfferInProgress() {
  return (
    <VStack spacing="6">
      <VStack align="start" spacing="2">
        <Heading size="md">Submit cancellation</Heading>
        <Text>
          To cancel this listing you must confirm the transaction and pay the
          gas fee.
        </Text>
      </VStack>
      <LoadingDots />
    </VStack>
  )
}

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
}
