import { FC } from 'react'
import FormField from './FormField'
import NumberInput from './NumberInput'

type Props = {
  name: string
  descriptor: string
  infoName?: string
  infoValue?: string
  tooltip?: string
  defaultValue?: string
  formError?: string
  onChange?: (value: string) => void
}

const NumberFormField: FC<Props> = ({
  name,
  descriptor,
  infoName,
  infoValue,
  tooltip,
  defaultValue,
  formError,
  onChange,
}) => {
  return (
    <FormField
      name={name}
      infoName={infoName}
      infoValue={infoValue}
      tooltip={tooltip}
    >
      <NumberInput
        id={name}
        descriptor={descriptor}
        onChange={onChange}
        defaultValue={defaultValue}
        formError={formError}
      />
    </FormField>
  )
}

export default NumberFormField
