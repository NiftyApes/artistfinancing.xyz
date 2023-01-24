import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  NumberInput,
  NumberInputField,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { FaPercent } from 'react-icons/fa'
import useEnvChain from 'hooks/useEnvChain'
import getAttributeFloor from '../util/getAttributeFloor'

export default function FinancingTermsForm({
  token,
  collection,
}: {
  token: any
  collection: any
}) {
  const chain = useEnvChain()
  const attributeFloor = getAttributeFloor(token?.token?.attributes)

  return (
    <>
      <Heading size="md" mb="4">
        Set Your Terms
      </Heading>

      <Grid templateColumns="4fr 1fr" columnGap={4} rowGap={6}>
        {/* List price */}
        <GridItem>
          <FormControl>
            <FormLabel>
              <Text>List price</Text>
            </FormLabel>
            <HStack spacing="2">
              <Image src="/niftyapes/banana.png" />
              <HStack>
                <Image src="/eth-dark.svg" boxSize="6" />
                <Text>{chain?.nativeCurrency.symbol || 'ETH'}</Text>
              </HStack>
              <NumberInput
                flexGrow="1"
                bg="blackAlpha.500"
                borderRadius="md"
                defaultValue={
                  attributeFloor ||
                  collection?.floorAsk?.price?.amount?.native ||
                  0
                }
              >
                <NumberInputField border="0" borderColor="gray.400" />
              </NumberInput>
            </HStack>
          </FormControl>
        </GridItem>

        <GridItem>
          <VStack align="start">
            <HStack>
              <Text fontSize="sm">Profit</Text>
              <Tooltip
                hasArrow
                placement="right"
                label="How much ETH you will receive after marketplace fees and creator royalties are subtracted."
              >
                <span>
                  <Icon as={IoInformationCircleOutline} />
                </span>
              </Tooltip>
            </HStack>
            <VStack align="start">
              <HStack>
                <Image src="/eth-dark.svg" boxSize="3" />
                <Text fontSize="md" fontWeight="semibold">
                  0.19
                </Text>
              </HStack>
              <Text fontSize="xs" fontWeight="semibold" color="whiteAlpha.600">
                $309.55
              </Text>
            </VStack>
          </VStack>
        </GridItem>

        {/* Down payment */}
        <GridItem>
          <FormControl>
            <FormLabel>Down payment</FormLabel>

            <HStack>
              <NumberInput
                bg="blackAlpha.500"
                borderRadius="md"
                defaultValue={20}
                flexGrow={1}
              >
                <NumberInputField border="0" borderColor="gray.400" />
              </NumberInput>
              <Icon as={FaPercent} />
            </HStack>
          </FormControl>
        </GridItem>

        <GridItem>
          <VStack align="start">
            <Text fontSize="sm">Paid on sale</Text>
            <VStack align="start">
              <HStack>
                <Image src="/eth-dark.svg" boxSize="3" />
                <Text fontSize="md" fontWeight="semibold">
                  0.038
                </Text>
              </HStack>
              <Text fontSize="xs" fontWeight="semibold" color="whiteAlpha.600">
                $61.91
              </Text>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </>
  )
}
