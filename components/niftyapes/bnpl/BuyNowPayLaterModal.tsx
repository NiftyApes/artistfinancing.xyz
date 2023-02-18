import {
  Alert,
  AlertIcon,
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
import useExecuteBuy from 'hooks/niftyapes/useExecuteBuy'
import useCoinConversion from 'hooks/useCoinConversion'
import useTokens from 'hooks/useTokens'
import { formatDollar } from 'lib/numbers'
import { useState } from 'react'
import { IoCheckmarkCircle, IoWallet } from 'react-icons/io5'
import LoadingDots from '../LoadingDots'
import TermStats from '../TermStats'

enum Step {
  Checkout,
  WalletApproval,
  Success,
}

export default function BuyNowPayLaterModal({
  token,
}: {
  token?: ReturnType<typeof useTokens>['tokens']['data'][0]
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const { executeBuy } = useExecuteBuy()
  const [step, setStep] = useState<Step>(Step.Checkout)
  const [isError, setIsError] = useState(false)

  // TODO: Use terms loaded from API.
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
    setIsError(false) // reset error
    setStep(Step.Checkout)
    onModalClose()
  }

  const onCheckout = () => {
    setIsError(false) // reset error
    setStep(Step.WalletApproval)
    // TODO: Replace this with actual data from signature offer for this token.
    executeBuy({
      offer: {
        creator: '0x5e739684A36C47EE17A004a76d3094E3795177fd',
        downPaymentAmount: '10000000000000000',
        expiration: 1679004772,
        minimumPrincipalPerPeriod: '2000000000000000',
        nftId: '260',
        nftContractAddress: '0xACeC411DD36946bb5bEC9900eF28Bb58be7AcBD4',
        periodDuration: 2592000,
        periodInterestRateBps: 164,
        price: '50000000000000000',
      },
      signature:
        '0xc06e2426b4aa86e4c11a124d7a0321862a9f20c4ff5ee4cc3d9197c88ebb7f3742a90e87596207add505552f6c2e0c70ced87368ca7f90db124e941c5d2e5e8c1b',
      onSuccess() {
        setStep(Step.Success)
      },
      onError() {
        setIsError(true)
        setStep(Step.Checkout)
      },
    })
  }

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
                    {isError && (
                      <Alert bg="red.900" rounded="md" status="error">
                        <AlertIcon />
                        There was an error completing your purchase. Please try
                        again.
                      </Alert>
                    )}
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
                            <Text>Price</Text>
                            <FormatNativeCrypto amount={terms.listPrice} />
                          </HStack>
                        </GridItem>
                        <GridItem>
                          <HStack justify="space-between">
                            <Text>Down payment</Text>
                            <FormatNativeCrypto amount={paidOnSale} />
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
                            <Text>Grace period</Text>
                            <Text fontWeight="semibold">{`${terms.gracePeriodDays} days`}</Text>
                          </HStack>
                        </GridItem>
                        <GridItem>
                          <HStack justify="space-between">
                            <Text>Late payments</Text>
                            <Text fontWeight="semibold">
                              {terms.numLatePayments}
                            </Text>
                          </HStack>
                        </GridItem>
                      </Grid>
                    </VStack>

                    <HStack align="start" width="full" justify="space-between">
                      <Heading size="lg">Total due now</Heading>
                      <VStack>
                        <FormatNativeCrypto
                          amount={paidOnSale}
                          logoWidth={21}
                          fontSize={21}
                        />
                        {usdPrice && (
                          <Text
                            mt="0 !important"
                            fontWeight="semibold"
                            color="whiteAlpha.600"
                          >
                            {formatDollar(usdPrice * paidOnSale)}
                          </Text>
                        )}
                      </VStack>
                    </HStack>

                    <Button colorScheme={'blue'} onClick={onCheckout}>
                      Checkout
                    </Button>
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
                          Congrats! Your NFT has been purchased with financing!
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
