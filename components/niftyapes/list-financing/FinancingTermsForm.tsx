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
import expirationOptions, { Expiration } from 'lib/niftyapes/expirationOptions'
import { formatDollar } from 'lib/numbers'
import { Dispatch, SetStateAction } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

export type FinancingTerms = {
  listPrice: number
  downPaymentPercent: number
  apr: number
  minPrincipalPercent: number
  payPeriodDays: number
  expiration: Expiration
}

export default function FinancingTermsForm({
  onSubmit,
  terms,
  setTerms,
}: {
  onSubmit: () => void
  terms: FinancingTerms
  setTerms: Dispatch<SetStateAction<FinancingTerms>>
}) {
  const chain = useEnvChain()
  const paidOnSale = (terms.downPaymentPercent / 100) * terms.listPrice
  const intEachPer = (terms.apr / 100) * terms.listPrice
  const remainingPrincipal = terms.listPrice - paidOnSale
  const minEachPer = (terms.minPrincipalPercent / 100) * remainingPrincipal
  const updateTerm = (key: string) => {
    return (value: string | number) => {
      setTerms({ ...terms, [key]: value })
    }
  }

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
                value={terms.listPrice}
                updateTerm={updateTerm('listPrice')}
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
              value={terms.downPaymentPercent}
              updateTerm={updateTerm('downPaymentPercent')}
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
              value={terms.apr}
              updateTerm={updateTerm('apr')}
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
              value={terms.minPrincipalPercent}
              updateTerm={updateTerm('minPrincipalPercent')}
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

      <Button colorScheme={'blue'} onClick={onSubmit}>
        Next
      </Button>
    </VStack>
  )
}

function TermInputNumber({
  value,
  updateTerm,
  withPercent,
}: NumberInputProps & {
  withPercent?: boolean
  updateTerm: (value: string | number) => void
}) {
  const formatPercent = (val: number | string | undefined) => val + '%'
  const parsePercent = (val: string) => val.replace(/^\%/, '')

  return (
    <NumberInput
      flexGrow="1"
      bg="gray.900"
      borderRadius="md"
      min={0}
      value={withPercent ? formatPercent(value) : value}
      onChange={(valueString) => {
        const parsedValue = withPercent
          ? parsePercent(valueString)
          : valueString
        updateTerm(parsedValue)
      }}
    >
      <NumberInputField border="0" borderColor="gray.400" />
    </NumberInput>
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
  amount = Number(amount)

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
          <Text
            mt="0 !important"
            fontSize="sm"
            fontWeight="semibold"
            color="whiteAlpha.600"
          >
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
