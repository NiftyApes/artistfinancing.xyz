import {
  Box,
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
import { addMonths, format, formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si'
import PaymentModalTermStats from './PaymentModalTermStats'
import { ethers, BigNumber } from 'ethers'
import { useMakePayment } from '../../hooks/niftyapes/useMakePayment'

enum Step {
  Checkout,
  WalletApproval,
  Success,
}

export default function MakePaymentModal({
  data,
}: {
  data: Record<string, any>
}) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure()
  const [step, setStep] = useState<Step>(Step.Success)
  const terms = {
    remainingPrincipal: 20,
    apr: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    duration: formatDistanceToNow(addMonths(new Date(), 12)),
  }

  const onClose = () => {
    setStep(Step.Checkout)
    onModalClose()
  }

  const {
    data: paymentTransaction,
    isLoading,
    isSuccess,
    write,
  } = useMakePayment({
    nftContractAddress: data.contract,
    paymentAmount: ethers.utils.parseEther('0.0123'),
    nftId: BigNumber.from(data.tokenId || 0),
  })

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
                {step === Step.Success && (
                  <VStack
                    align="start"
                    width="full"
                    justify="space-between"
                    gap={4}
                  >
                    <div className="flex w-full flex-row items-center justify-between rounded-md bg-gray-700 p-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                          <p>25.5</p>
                          <AiOutlineArrowRight />
                          <p className="text-green-400">20.0</p>
                        </div>
                        <p className="text-sm text-gray-300">
                          Principal Change
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                          <p>5.07433</p>
                        </div>
                        <p className="text-sm text-gray-300">Payment Due Now</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center font-semibold">
                          <p>{format(addMonths(new Date(), 12), 'Pp')}</p>
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
                          value={'5.07433'}
                          type="text"
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
