import InfoTooltip from 'components/InfoTooltip'
import { FC, ReactNode } from 'react'

type Props = {
  name: string
  children: ReactNode
  infoName?: string
  infoValue?: string
  tooltip?: string
}

const FormField: FC<Props> = ({
  name,
  children,
  infoName,
  infoValue,
  tooltip,
}) => {
  return (
    <div className="flex gap-6">
      <div className="flex w-[350px] items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor={name} className="text-sm text-gray-500">
            {name}
          </label>
          {tooltip && (
            <InfoTooltip side="top" content={tooltip} modeOverride="light" />
          )}
        </div>
        <div className="h-[46px] w-[170px]">{children}</div>
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
