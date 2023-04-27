import FormField from './FormField'
import NumberInput from './NumberInput'

const NumberFormField = ({
  name,
  descriptor,
  infoName,
  infoValue,
  tooltip,
}: {
  name: string
  descriptor: string
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
      <NumberInput id={name} descriptor={descriptor} />
    </FormField>
  )
}

export default NumberFormField
