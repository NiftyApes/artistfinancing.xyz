import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { FinancingTerms } from 'hooks/niftyapes/useCreateListing'
import useCoinConversion from 'hooks/useCoinConversion'
import useEnvChain from 'hooks/useEnvChain'
import expirationOptions, { Expiration } from 'lib/niftyapes/expirationOptions'
import { formatDollar } from 'lib/numbers'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

type FinancingFormFields = {
  listPrice: string
  downPaymentPercent: string
  apr: string
  payPeriodDays: number
  loanDurMos: number
  expiration: Expiration
}

export default function FinancingTermsForm({
  onSubmit,
  setTerms,
  defaultTerms,
}: {
  onSubmit: () => void
  setTerms: Dispatch<SetStateAction<FinancingTerms>>
  defaultTerms: FinancingTerms
}) {
  const chain = useEnvChain()

  const [formFields, setFormFields] = useState<FinancingFormFields>({
    listPrice: String(defaultTerms.listPrice),
    downPaymentPercent: String(defaultTerms.downPaymentPercent),
    apr: String(defaultTerms.apr),
    payPeriodDays: defaultTerms.payPeriodDays,
    loanDurMos: 6,
    expiration: defaultTerms.expiration,
  })
  const updateTerm = (key: string) => {
    return (value: string) => {
      setFormFields({ ...formFields, [key]: value })
    }
  }
  const [isFormErr, setIsFormErr] = useState(false)
  const [formErrorMsgs, setFormErrorMsgs] = useState({
    listPrice: '',
    loanDurMos: '',
  })
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

  const validateAndSubmit = () => {
    setHasSubmittedOnce(true)
    const { hasErr } = validateFormFields(formFields)
    if (hasErr) return
    onSubmit()
  }

  useEffect(() => {
    // Validate on first submission and revalidate as fields change
    if (!hasSubmittedOnce) {
      return
    }

    const { hasErr, errorMsgs } = validateFormFields(formFields)

    setIsFormErr(hasErr)
    setFormErrorMsgs(errorMsgs)
  }, [formFields, hasSubmittedOnce])

  const receivedOnSale =
    (Number(formFields.downPaymentPercent) / 100) * Number(formFields.listPrice)
  const intEachPer =
    (Number(formFields.apr) / 100) * Number(formFields.listPrice)
  const remainingPrincipal = Number(formFields.listPrice) - receivedOnSale

  return (
    <VStack align={'left'} spacing={6}>
      <Heading size="md">Set Your Terms</Heading>

      <Grid templateColumns="5fr 2fr" gap={4}>
        {/* List price */}
        <GridItem>
          <FormControl isInvalid={formErrorMsgs.listPrice !== ''}>
            <FormLabel>List price</FormLabel>
            <HStack spacing="2">
              <Image src="/niftyapes/banana.png" />
              <HStack>
                <Image src="/eth-dark.svg" boxSize="6" />
                <Text>{chain?.nativeCurrency.symbol || 'ETH'}</Text>
              </HStack>
              <TermInputNumber
                value={formFields.listPrice}
                updateTerm={updateTerm('listPrice')}
              />
            </HStack>
            {formErrorMsgs.listPrice !== '' && (
              <FormErrorMessage>{formErrorMsgs.listPrice}</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>

        <GridItem>
          <ExtraInfo
            text="Profit"
            tooltipText="How much ETH you will receive after marketplace fees and creator royalties are subtracted."
            amount={Number(formFields.listPrice)}
          />
        </GridItem>

        {/* Down payment */}
        <GridItem>
          <FormControl>
            <FormLabel>Down payment</FormLabel>

            <TermInputNumber
              withPercent={true}
              value={formFields.downPaymentPercent}
              updateTerm={updateTerm('downPaymentPercent')}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <ExtraInfo text="Received on sale" amount={receivedOnSale} />
        </GridItem>

        {/* Annual interest rate */}
        <GridItem>
          <FormControl>
            <FormLabel>Annual interest rate (APR)</FormLabel>

            <TermInputNumber
              withPercent={true}
              value={formFields.apr}
              updateTerm={updateTerm('apr')}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <ExtraInfo text="Interest each period" amount={intEachPer} />
        </GridItem>

        {/* Loan duration */}
        <GridItem>
          <FormControl>
            <FormLabel>Loan duration</FormLabel>

            <NumberInput
              flexGrow="1"
              bg="gray.900"
              borderRadius="md"
              min={1}
              value={((val) => val + ' months')(formFields.loanDurMos)}
              onChange={(valueString) => {
                const parsedValue = valueString.replace(/^ months/, '')
                updateTerm(parsedValue)
              }}
            >
              <NumberInputField border="0" borderColor="gray.400" />
            </NumberInput>
          </FormControl>
        </GridItem>

        <GridItem>
          {/* TODO */}
          {/* <ExtraInfo text="Minimum each period" amount={minEachPer} /> */}
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
              defaultValue={formFields.payPeriodDays}
              onChange={(event) => {
                setFormFields({
                  ...formFields,
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
              defaultValue={formFields.expiration}
              onChange={(event) => {
                setFormFields({
                  ...formFields,
                  expiration: Number(event.target.value) as Expiration,
                })
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem></GridItem>
      </Grid>

      <Button
        isDisabled={isFormErr}
        colorScheme={'blue'}
        onClick={validateAndSubmit}
      >
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
  updateTerm: (value: string) => void
}) {
  const formatValue = (val: string) => {
    return withPercent ? val + '%' : val
  }

  return (
    <NumberInput
      flexGrow="1"
      bg="gray.900"
      borderRadius="md"
      min={0}
      value={formatValue(String(value))}
      onChange={(valueString) => {
        updateTerm(valueString)
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

function validateFormFields(formFields: FinancingFormFields) {
  let errorMsgs = {
    listPrice: validateNumField(formFields.listPrice),
    loanDurMos: validateNumField(String(formFields.loanDurMos)),
  }

  const hasErr = Object.values(errorMsgs).some((errMsg) => errMsg !== '')

  return { hasErr, errorMsgs }
}

function validateNumField(field: string) {
  const parsedField = parseFloat(field)

  if (Number.isNaN(parsedField) || parsedField <= 0) {
    return 'Please enter a number greater than 0'
  }

  return ''
}
