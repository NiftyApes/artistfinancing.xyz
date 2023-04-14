import InfoTooltip from 'components/InfoTooltip'
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
  infoName: string
  infoValue: string
  tooltip?: string
}) => {
  return (
    <div className="flex justify-between gap-6 pt-4">
      <div className="flex w-[350px] items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor={name} className="text-sm text-gray-500">
            {name}
          </label>
          {tooltip && (
            <InfoTooltip side="bottom" content={tooltip} modeOverride="light" />
          )}
        </div>
        <NumberInput id={name} descriptor={descriptor} />
      </div>
      <div className="flex flex-grow items-center justify-between">
        <p className="text-xs text-gray-500">{infoName}</p>
        <p className="text-sm font-bold text-gray-500">{infoValue} ETH</p>
      </div>
    </div>
  )
}

export default NumberFormField
