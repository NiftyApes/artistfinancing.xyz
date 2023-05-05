import FormField from './FormField'
import SelectInput from './SelectInput'

const SelectFormField = ({
  name,
  infoName,
  infoValue,
  tooltip,
}: {
  name: string
  infoName?: string
  infoValue?: string
  tooltip?: string
  onChange?: (value: string) => void
}) => {
  return (
    <FormField
      name={name}
      infoName={infoName}
      infoValue={infoValue}
      tooltip={tooltip}
    >
      <SelectInput name={name} />
    </FormField>
  )
}

export default SelectFormField
