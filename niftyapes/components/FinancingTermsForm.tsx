import {
  Button,
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
  Select,
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
    <VStack align={'left'} spacing={6}>
      <Heading size="md">Set Your Terms</Heading>

      <Grid templateColumns="5fr 2fr" gap={4}>
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
                bg="gray.900"
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
                bg="gray.900"
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

        {/* Annual interest rate */}
        <GridItem>
          <FormControl>
            <FormLabel>Annual interest rate</FormLabel>

            <HStack>
              <NumberInput
                bg="gray.900"
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
            <Text fontSize="sm">Interest each period</Text>
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

        {/* Minimum principal per pay period */}
        <GridItem>
          <FormControl>
            <FormLabel>Minimum principal per pay period</FormLabel>

            <HStack>
              <NumberInput
                bg="gray.900"
                borderRadius="md"
                defaultValue={5}
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
            <Text fontSize="sm">Minimum each period</Text>
            <VStack align="start">
              <HStack>
                <Image src="/eth-dark.svg" boxSize="3" />
                <Text fontSize="md" fontWeight="semibold">
                  0.0095
                </Text>
              </HStack>
              <Text fontSize="xs" fontWeight="semibold" color="whiteAlpha.600">
                $15.48
              </Text>
            </VStack>
          </VStack>
        </GridItem>

        {/* Pay period duration TODO: Fix bg color. */}
        <GridItem>
          <FormControl>
            <FormLabel>Pay period duration</FormLabel>

            <Select defaultValue={30} border="0" bg="gray.900">
              <option value={15}>15 days</option>
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem></GridItem>

        {/* Grace period duration TODO: Fix bg color. */}
        <GridItem>
          <FormControl>
            <FormLabel>Grace period duration</FormLabel>

            <Select defaultValue={15} border="0" bg="gray.900">
              <option value={5}>5 days</option>
              <option value={10}>10 days</option>
              <option value={15}>15 days</option>
              <option value={30}>30 days</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem></GridItem>

        {/* Number of late payments tolerated TODO: Fix bg color. */}
        <GridItem>
          <FormControl>
            <FormLabel>Number of late payments tolerated</FormLabel>

            <Select defaultValue={3} border="0" bg="gray.900">
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem></GridItem>

        {/* Expiration TODO: Fix bg color. */}
        <GridItem>
          <FormControl>
            <FormLabel>Expiration</FormLabel>

            <Select defaultValue={5} border="0" bg="gray.900">
              <option value={0}>1 hour</option>
              <option value={1}>12 hours</option>
              <option value={2}>1 day</option>
              <option value={3}>3 days</option>
              <option value={4}>1 week</option>
              <option value={5}>1 month</option>
              <option value={6}>3 months</option>
              <option value={6}>None</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem></GridItem>
      </Grid>

      <Button colorScheme={'blue'}>Next</Button>
    </VStack>
  )
}
