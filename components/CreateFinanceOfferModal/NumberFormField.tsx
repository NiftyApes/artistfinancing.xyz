import NumberInput from './NumberInput'

const NumberFormField = ({
  name,
  descriptor,
}: {
  name: string
  descriptor: string
}) => {
  return (
    <div className="flex justify-between p-4">
      <label htmlFor={name}>{name}</label>
      <NumberInput id={name} descriptor={descriptor} />
    </div>
  )
}

export default NumberFormField
