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
