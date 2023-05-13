import FormField from './FormField'
import { Select, SelectItem } from './Select'
import { FC } from 'react'
import NumberInput from './NumberInput'

type Option = {
  label: string
  value: string
}

type Props = {
  name: string
  options: Option[]
  defaultValue?: string
  infoName?: string
  infoValue?: string
  tooltip?: string
  onChange?: (value: string) => void
}

const SelectFormField: FC<Props> = ({
  options,
  defaultValue,
  name,
  infoName,
  infoValue,
  tooltip,
  onChange,
}) => {
  return (
    <FormField
      name={name}
      infoName={infoName}
      infoValue={infoValue}
      tooltip={tooltip}
    >
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        {options.map((option, idx) => (
          <SelectItem key={idx} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </FormField>
  )
}

export default SelectFormField
