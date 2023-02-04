import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
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
import useCoinConversion from 'hooks/useCoinConversion'
import useTokens from 'hooks/useTokens'
import { formatDollar } from 'lib/numbers'
import { useState } from 'react'

enum Step {
  Checkout,
  Success,
}

export default function BuyNowPayLaterModal({
  token,
}: {
  token?: ReturnType<typeof useTokens>['tokens']['data'][0]
  collection: any
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [step, setStep] = useState<Step>(Step.Checkout)
  const terms = {
    listPrice: 1.2,
    downPaymentPercent: 20,
    interestRatePercent: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    gracePeriodDays: 15,
    numLatePayments: 3,
  }
  const paidOnSale = (terms.downPaymentPercent / 100) * terms.listPrice
  const usdPrice = useCoinConversion('usd')

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

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bg="gray.700">
            Complete Checkout
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Flex>
              <VStack
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
              </VStack>

              <VStack spacing="8" p="6" align="left" w="full">
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
                        <Text fontWeight="semibold">{`${terms.interestRatePercent}%`}</Text>
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
                  <Heading size="lg">Total</Heading>
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

                <Button colorScheme={'blue'}>Checkout</Button>
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
