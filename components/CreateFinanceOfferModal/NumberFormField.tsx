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
      <div className="h-[46px] w-[170px]">
        <NumberInput id={name} descriptor={descriptor} />
      </div>
    </FormField>
  )
}

export default NumberFormField
