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
import useTokens from 'hooks/useTokens'
import { formatDollar } from 'lib/numbers'
import { DateTime } from 'luxon'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdOutlineError } from 'react-icons/md'
import LoadingDots from './LoadingDots'

export default function AcceptOfferModal({
  token,
  listSourceLogo,
  topBidUsdPrice,
}: {
  token?: ReturnType<typeof useTokens>['tokens']['data'][0]
  listSourceLogo: string
  topBidUsdPrice: number | null
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
  const expiration = DateTime.fromSeconds(topBid?.validUntil!).toRelative()

  console.log(topBid)

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
                    amount={token?.market?.topBid?.price?.amount?.decimal}
                    address={token?.market?.topBid?.price?.currency?.contract}
                    decimals={token?.market?.topBid?.price?.currency?.decimals}
                    logoWidth={30}
                    maximumFractionDigits={8}
                  />

                  <Text fontSize="sm" color="gray.400">
                    {formatDollar(topBidUsdPrice)}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <Box p="6">
              <Text>WOMP</Text>
            </Box>
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
