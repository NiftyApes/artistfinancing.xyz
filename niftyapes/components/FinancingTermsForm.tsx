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
  NumberInputProps,
  Select,
  SelectProps,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import useCoinConversion from 'hooks/useCoinConversion'
import useEnvChain from 'hooks/useEnvChain'
import { formatDollar } from 'lib/numbers'
import expirationOptions, { Expiration } from 'niftyapes/util/expirationOptions'
import { useState } from 'react'
import { FaPercent } from 'react-icons/fa'
import { IoInformationCircleOutline } from 'react-icons/io5'
import getAttributeFloor from '../util/getAttributeFloor'

// TODO: Type 'any'
export default function FinancingTermsForm({
  token,
  collection,
  onClose,
}: {
  token: any
  collection: any
  onClose: () => void
}) {
  const chain = useEnvChain()
  const attributeFloor = getAttributeFloor(token?.token?.attributes)
  const defaultTerms = {
    listPrice:
      attributeFloor || collection?.floorAsk?.price?.amount?.native || 0,
    downPaymentPercent: 20,
    interestRatePercent: 20,
    minPrincipalPercent: 5,
    payPeriodDays: 30,
    gracePeriodDays: 15,
    numLatePayments: 3,
    expiration: Expiration.OneMonth,
  }
  const [terms, setTerms] = useState(defaultTerms)
  const paidOnSale = (terms.downPaymentPercent / 100) * terms.listPrice
  const intEachPer = (terms.interestRatePercent / 100) * terms.listPrice
  const minEachPer = (terms.minPrincipalPercent / 100) * terms.listPrice

  return (
    <VStack align={'left'} spacing={6}>
      <Heading size="md">Set Your Terms</Heading>

      <Grid templateColumns="5fr 2fr" gap={4}>
        {/* List price */}
        <GridItem>
          <FormControl>
            <FormLabel>List price</FormLabel>
            <HStack spacing="2">
              <Image src="/niftyapes/banana.png" />
              <HStack>
                <Image src="/eth-dark.svg" boxSize="6" />
                <Text>{chain?.nativeCurrency.symbol || 'ETH'}</Text>
              </HStack>
              <TermInputNumber
                defaultValue={terms.listPrice}
                onChange={(_, listPrice) => {
                  setTerms({ ...terms, listPrice })
                }}
              />
            </HStack>
          </FormControl>
        </GridItem>

        <GridItem>
          <ExtraInfo
            text="Profit"
            tooltipText="How much ETH you will receive after marketplace fees and creator royalties are subtracted."
            amount={terms.listPrice}
          />
        </GridItem>

        {/* Down payment */}
        <GridItem>
          <FormControl>
            <FormLabel>Down payment</FormLabel>

            <TermInputNumber
              withPercent={true}
              defaultValue={terms.downPaymentPercent}
              onChange={(_, downPaymentPercent) => {
                setTerms({ ...terms, downPaymentPercent })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <ExtraInfo text="Paid on sale" amount={paidOnSale} />
        </GridItem>

        {/* Annual interest rate */}
        <GridItem>
          <FormControl>
            <FormLabel>Annual interest rate</FormLabel>

            <TermInputNumber
              withPercent={true}
              defaultValue={terms.interestRatePercent}
              onChange={(_, interestRatePercent) => {
                setTerms({ ...terms, interestRatePercent })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <ExtraInfo text="Interest each period" amount={intEachPer} />
        </GridItem>

        {/* Minimum principal per pay period */}
        <GridItem>
          <FormControl>
            <FormLabel>Minimum principal per pay period</FormLabel>

            <TermInputNumber
              withPercent={true}
              defaultValue={terms.minPrincipalPercent}
              onChange={(_, minPrincipalPercent) => {
                setTerms({ ...terms, minPrincipalPercent })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <ExtraInfo text="Minimum each period" amount={minEachPer} />
        </GridItem>

        {/* Pay period duration */}
        <GridItem>
          <FormControl>
            <FormLabel>Pay period duration</FormLabel>

            <TermInputSelect
              options={[
                { value: 15, label: '15 days' },
                { value: 30, label: '30 days' },
                { value: 60, label: '60 days' },
              ]}
              defaultValue={terms.payPeriodDays}
              onChange={(event) => {
                setTerms({
                  ...terms,
                  payPeriodDays: Number(event.target.value),
                })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem></GridItem>

        {/* Grace period duration */}
        <GridItem>
          <FormControl>
            <FormLabel>Grace period duration</FormLabel>

            <TermInputSelect
              options={[
                { value: 5, label: '5 days' },
                { value: 10, label: '10 days' },
                { value: 15, label: '15 days' },
                { value: 30, label: '30 days' },
              ]}
              defaultValue={terms.gracePeriodDays}
              onChange={(event) => {
                setTerms({
                  ...terms,
                  gracePeriodDays: Number(event.target.value),
                })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem></GridItem>

        {/* Number of late payments tolerated */}
        <GridItem>
          <FormControl>
            <FormLabel>Number of late payments tolerated</FormLabel>

            <TermInputSelect
              options={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
              ]}
              defaultValue={terms.numLatePayments}
              onChange={(event) => {
                setTerms({
                  ...terms,
                  numLatePayments: Number(event.target.value),
                })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem></GridItem>

        {/* Expiration */}
        <GridItem>
          <FormControl>
            <FormLabel>Expiration</FormLabel>

            <TermInputSelect
              options={expirationOptions}
              defaultValue={terms.expiration}
              onChange={(event) => {
                setTerms({
                  ...terms,
                  expiration: Number(event.target.value) as Expiration,
                })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem></GridItem>
      </Grid>

      <Button colorScheme={'blue'} onClick={onClose}>
        Next
      </Button>
    </VStack>
  )
}

function TermInputNumber({
  defaultValue,
  onChange,
  withPercent,
}: NumberInputProps & { withPercent?: boolean }) {
  const numInput = (
    <NumberInput
      flexGrow="1"
      bg="gray.900"
      borderRadius="md"
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <NumberInputField border="0" borderColor="gray.400" />
    </NumberInput>
  )

  return withPercent ? (
    <HStack>
      {numInput}
      <Icon as={FaPercent} />
    </HStack>
  ) : (
    numInput
  )
}

function ExtraInfo({
  text,
  tooltipText,
  amount,
}: {
  text: string
  tooltipText?: string
  amount: number
}) {
  const usdPrice = useCoinConversion('usd')

  return (
    <VStack align="start">
      <HStack>
        <Text fontSize="sm">{text}</Text>
        {tooltipText && (
          <Tooltip hasArrow placement="right" label={tooltipText}>
            <span>
              <Icon as={IoInformationCircleOutline} />
            </span>
          </Tooltip>
        )}
      </HStack>
      <VStack align="start">
        <FormatNativeCrypto amount={amount} maximumFractionDigits={4} />
        {usdPrice && (
          <Text fontSize="xs" fontWeight="semibold" color="whiteAlpha.600">
            {formatDollar(usdPrice * amount)}
          </Text>
        )}
      </VStack>
    </VStack>
  )
}

type Option = {
  value: number
  label: string
}

function TermInputSelect({
  onChange,
  defaultValue,
  options,
}: SelectProps & { options: Option[] }) {
  return (
    <Select
      onChange={onChange}
      defaultValue={defaultValue}
      border="0"
      bg="gray.900"
    >
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}
