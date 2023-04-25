import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si'
import PaymentModalTermStats from './PaymentModalTermStats'
import { BigNumber } from 'ethers'
import { useMakePayment } from '../../hooks/niftyapes/useMakePayment'
import { OfferDetails } from '@niftyapes/sdk'
import { useEtherscanUri } from '../../hooks/niftyapes/useEtherscan'
import { processOffer } from '../../lib/niftyapes/processOffer'
import { formatEther } from 'ethers/lib/utils'
import FormatNativeCrypto from '../FormatNativeCrypto'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { LoanDetails } from 'hooks/niftyapes/useLoans'

export default function MakePaymentModal({
  data,
  loan,
  offer,
}: {
  data: Record<string, any>
  loan: LoanDetails
  offer: OfferDetails
}) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { address } = router.query
  const parentTableQuery = `/loans?buyer=${address as string}`

  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const etherscanUri: string = useEtherscanUri()

  const { apr, payPeriodDays, loanDurMos } = processOffer(offer)

  const onClose = () => {
    onModalClose()
  }

  const payment: BigNumber = BigNumber.from(loan.minimumPrincipalPerPeriod).add(
    BigNumber.from(loan.remainingPrincipal)
      .mul(BigNumber.from(loan.periodInterestRateBps))
      .div(BigNumber.from('10000'))
  )

  const terms = {
    apr: apr,
    duration: loanDurMos,
    minPayment: payment,
    payPeriodDays: payPeriodDays,
    remainingPrincipal: loan.remainingPrincipal,
  }

  const {
    data: paymentTransaction,
    isLoading,
    isSuccess,
    isError,
    write,
  } = useMakePayment({
    nftContractAddress: offer.nftContractAddress,
    nftId: BigNumber.from(offer.nftId),
    paymentAmount: payment,
  })

  useEffect(() => {
    // Invalidates parent table query three seconds after the transaction
    if (isSuccess) {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [parentTableQuery] })
      }, 3000)
    }
  }, [isSuccess])

  return (
    <>
      <button
        onClick={onOpen}
        className="btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4"
      >
        Make Payment
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bg="gray.700">
            Make Payment
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Flex>
              <VStack
                w="72"
                borderRight="1px"
                borderColor="gray.600"
                p="6"
                align="left"
                flexShrink={0}
              >
                <Image
                  borderRadius="md"
                  boxSize="200px"
                  objectFit="cover"
                  src={data.image}
                  alt={data.image}
                ></Image>
                <VStack align="left" w="full">
                  <Heading size="sm">{data.name}</Heading>
                  <Text mt="0 !important" fontSize="xs" color="whiteAlpha.800">
                    {data.collectionName}
                  </Text>
                </VStack>
                <PaymentModalTermStats terms={terms} />
              </VStack>
              <Box p="6" w="full">
                {paymentTransaction &&
                  isSuccess &&
                  `Thanks for your payment. Transaction processed successfully. `}
                {paymentTransaction &&
                  isLoading &&
                  `Processing transaction... `}
                {paymentTransaction &&
                  isError &&
                  `Unable to process transaction... `}
                {paymentTransaction && (
                  <Box>
                    <Link
                      href={`${etherscanUri}/tx/${paymentTransaction.hash}`}
                      isExternal
                    >
                      View Transaction
                    </Link>
                  </Box>
                )}
                {!paymentTransaction && (
                  <VStack
                    align="start"
                    width="full"
                    justify="space-between"
                    gap={4}
                  >
                    <div className="flex w-full flex-row items-center justify-between rounded-md bg-gray-700 p-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                          <p>
                            {Number(
                              formatEther(loan.remainingPrincipal)
                            ).toFixed(4)}
                          </p>
                          <AiOutlineArrowRight />
                          <p className="text-green-400">
                            {Number(
                              formatEther(
                                BigNumber.from(loan.remainingPrincipal).sub(
                                  BigNumber.from(loan.minimumPrincipalPerPeriod)
                                )
                              )
                            ).toFixed(4)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-300">
                          Principal Change
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                          <p>
                            <FormatNativeCrypto
                              maximumFractionDigits={4}
                              amount={payment}
                            />
                          </p>
                        </div>
                        <p className="text-sm text-gray-300">Payment Due Now</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center font-semibold">
                          <p>
                            {format(
                              new Date(loan.periodEndTimestamp * 1000),
                              'Pp'
                            )}
                          </p>
                        </div>
                        <p className="text-sm text-gray-300">
                          Next Payment Due
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full flex-row items-center justify-between rounded-md bg-gray-700 p-4">
                      <div className="flex w-full flex-row items-center gap-4">
                        <div className="flex flex-row items-center gap-2 text-2xl font-bold">
                          <SiEthereum />
                          <p>ETH</p>
                        </div>
                        <input
                          value={formatEther(payment)}
                          type="number"
                          className="reservoir-label-l input-primary-outline dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:ring-primary-900 dark:placeholder:text-neutral-400  dark:focus:ring-4"
                        />
                        <button
                          className="btn-purple-fill ml-auto"
                          onClick={() => write?.()}
                        >
                          Make Payment
                        </button>
                      </div>
                    </div>
                  </VStack>
                )}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
