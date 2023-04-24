import InfoTooltip from 'components/InfoTooltip'
import { ReactNode } from 'react'

const FormField = ({
  name,
  children,
  infoName,
  infoValue,
  tooltip,
}: {
  name: string
  children: ReactNode
  infoName?: string
  infoValue?: string
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
            <InfoTooltip side="top" content={tooltip} modeOverride="light" />
          )}
        </div>
        {children}
      </div>
      {infoName && infoValue && (
        <div className="flex flex-grow items-center justify-between">
          <p className="text-xs text-gray-500">{infoName}</p>
          <p className="text-sm font-bold text-gray-500">{infoValue} ETH</p>
        </div>
      )}
    </div>
  )
}

export default FormField
