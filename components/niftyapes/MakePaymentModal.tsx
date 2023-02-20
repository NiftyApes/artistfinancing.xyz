import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
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
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { addMonths, format, formatDistanceToNow } from 'date-fns'
import useCoinConversion from 'hooks/useCoinConversion'
import useTokens from 'hooks/useTokens'
import { formatDollar } from 'lib/numbers'
import { useState } from 'react'
import { IoCheckmarkCircle, IoWallet } from 'react-icons/io5'
import LoadingDots from './LoadingDots'
import TermStats from './TermStats'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si';

enum Step {
  Checkout,
  WalletApproval,
  Success,
}

export default function MakePaymentModal({
  token,
}: {
  token?: ReturnType<typeof useTokens>['tokens']['data'][0]
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const [step, setStep] = useState<Step>(Step.Checkout)
  const terms = {
    listPrice: 1.2,
    downPaymentPercent: 20,
    apr: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    gracePeriodDays: 15,
    numLatePayments: 3,
  }
  const paidOnSale = (terms.downPaymentPercent / 100) * terms.listPrice
  const usdPrice = useCoinConversion('usd')

  const onClose = () => {
    setStep(Step.Checkout)
    onModalClose()
  }

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
                  src={token?.token?.image}
                  alt={token?.token?.name}
                ></Image>
                <VStack align="left" w="full">
                  <Heading size="sm">{token?.token?.name}</Heading>
                  <Text mt="0 !important" fontSize="xs" color="whiteAlpha.800">
                    {token?.token?.collection?.name}
                  </Text>
                </VStack>
                {[Step.WalletApproval, Step.Success].includes(step) && (
                  <TermStats terms={terms} />
                )}
              </VStack>

              <Box p="6" w="full">
                {step === Step.Checkout && (
                  <VStack spacing="8" align="left">
                    <VStack spacing="4" align="left">
                      <Heading size="md">Financing Terms</Heading>
                      <Grid
                        p="4"
                        bg="gray.700"
                        borderRadius="md"
                        rowGap="2"
                        columnGap="8"
                        templateColumns={'1fr 1fr'}
                      >
                        <GridItem>
                          <HStack justify="space-between">
                            <Text>Remaining principal</Text>
                            <FormatNativeCrypto amount={terms.listPrice} />
                          </HStack>
                        </GridItem>
                        <GridItem>
                          <HStack justify="space-between">
                            <Text>APR</Text>
                            <Text fontWeight="semibold">{`${terms.apr}%`}</Text>
                          </HStack>
                        </GridItem>
                        <GridItem>
                          <HStack justify="space-between">
                            <Text>Minimum payment</Text>
                            <Text fontWeight="semibold">{`${terms.minPrincipalPercent}%`}</Text>
                          </HStack>
                        </GridItem>
                        <GridItem>
                          <HStack justify="space-between">
                            <Text>Pay period</Text>
                            <Text fontWeight="semibold">{`${terms.payPeriodDays} days`}</Text>
                          </HStack>
                        </GridItem>
                        <GridItem>
                          <HStack justify="space-between">
                            <Text>Duration</Text>
                            <Text fontWeight="semibold">{formatDistanceToNow(addMonths(new Date(), 12))}</Text>
                          </HStack>
                        </GridItem>
                      </Grid>
                    </VStack>

                    <VStack align="start" width="full" justify="space-between" gap={4}>
                      <div className="flex flex-row items-center p-4 border-2 rounded-lg border-gray-600 justify-between w-full">
                        <div className="flex flex-col gap-2 items-center">
                          <div className="flex flex-row items-center font-semibold gap-2 text-xl">
                            <p>
                              25.5
                            </p>
                            <AiOutlineArrowRight />
                            <p className="text-green-400">
                              20.0
                            </p>
                          </div>
                          <p className="text-sm text-gray-300">
                            Principal Change
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                          <div className="flex flex-row items-center font-semibold gap-2 text-xl">
                            <p>
                              5.07433
                            </p>
                          </div>
                          <p className="text-sm text-gray-300">
                            Payment Due Now
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                          <div className="flex flex-row items-center font-semibold">
                            <p>
                              {format(addMonths(new Date(), 12), 'Pp')}
                            </p>
                          </div>
                          <p className="text-sm text-gray-300">
                            Next Payment Due
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row items-center p-4 border-2 rounded-lg border-gray-600 justify-between w-full">
                        <div className="flex flex-row items-center gap-4 w-full">
                          <div className="flex flex-row items-center gap-2 text-2xl font-bold">
                            <SiEthereum />
                            <p>
                              ETH
                            </p>
                          </div> 
                          <input value={"5.07433"} type="text" className="rounded-md border-2 border-gray-400 bg-gray-700 p-2" />
                          <button className="btn-purple-fill ml-auto">
                            Make Payment
                          </button>
                        </div>
                      </div>
                    </VStack>
                  </VStack>
                )}
                {step === Step.WalletApproval && (
                  <VStack w="full" h="full" justify="space-between">
                    <VStack justify="center" spacing="10" flexGrow={1}>
                      <Heading textAlign={'center'} size="lg">
                        Confirm purchase in your wallet
                      </Heading>
                      <HStack spacing="6">
                        <Image
                          borderRadius="md"
                          boxSize="80px"
                          src={token?.token?.image}
                          alt={token?.token?.name}
                        ></Image>
                        <LoadingDots />
                        <Icon as={IoWallet} boxSize="24" />
                      </HStack>
                    </VStack>
                    <Button
                      isLoading
                      loadingText="Waiting for Approval"
                      colorScheme="blue"
                      w="full"
                    ></Button>
                  </VStack>
                )}
                {step === Step.Success && (
                  <VStack w="full" h="full" justify="space-between">
                    <VStack justify="center" spacing="8" flexGrow={1}>
                      <Icon
                        color="green.400"
                        boxSize="20"
                        as={IoCheckmarkCircle}
                      />
                      <VStack>
                        <Heading size={'md'} textAlign="center">
                          Congrats! Your NFT has been purchased!
                        </Heading>
                        <Text align="center">
                          <Text as="span" color="blue.600">
                            {token?.token?.name}
                          </Text>{' '}
                          from{' '}
                          <Text as="span" color="blue.600">
                            {token?.token?.collection?.name}
                          </Text>{' '}
                          has been purchased.
                        </Text>
                      </VStack>
                      <VStack>
                        <Text>View item on</Text>
                        <Image
                          borderRadius="md"
                          boxSize="60px"
                          src="/niftyapes/NA-BLACK.png"
                        />
                      </VStack>
                    </VStack>
                    <Button onClick={onClose} colorScheme="blue" w="full">
                      Close
                    </Button>
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
