import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

export default function FinancingTermsForm() {
  return (
    <FormControl>
      <FormLabel>List price</FormLabel>
      <NumberInput
        bg="blackAlpha.500"
        borderRadius="md"
        defaultValue={15}
        min={10}
        max={20}
      >
        <NumberInputField border="0" borderColor="gray.400" />
        <NumberInputStepper borderColor="gray.400">
          <NumberIncrementStepper borderColor="gray.400" color="gray.400" />
          <NumberDecrementStepper borderColor="gray.400" color="gray.400" />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}
