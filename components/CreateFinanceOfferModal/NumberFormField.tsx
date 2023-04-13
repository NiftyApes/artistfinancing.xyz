import NumberInput from './NumberInput'

const NumberFormField = ({
  name,
  descriptor,
  infoName,
  infoValue,
}: {
  name: string
  descriptor: string
  infoName: string
  infoValue: string
}) => {
  return (
    <div className="flex justify-between gap-6 pt-4">
      <div className="flex w-[350px] items-center justify-between">
        <label htmlFor={name} className="text-sm text-gray-500">
          {name}
        </label>
        <NumberInput id={name} descriptor={descriptor} />
      </div>
      <div className="flex flex-grow items-center justify-between">
        <p className="text-xs text-gray-500">{infoName}</p>
        <p className="text-sm">{infoValue} ETH</p>
      </div>
    </div>
  )
}

export default NumberFormField
