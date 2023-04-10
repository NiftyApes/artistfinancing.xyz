import { truncateAddress, truncateEns } from 'lib/truncateText'
import { FC } from 'react'
import Avatar from '../Avatar'

type Props = {
  address: string | undefined
  ens?: {
    avatar: string | null | undefined
    name: string | null | undefined
  }
  title?: string
  side?: 'left' | 'right'
  hideIcon?: boolean
  label: string
}

const EthAccount: FC<Props> = ({
  address,
  ens,
  hideIcon,
  label,
  side = 'right',
}) => {
  const icon = !hideIcon && (
    <Avatar address={address} avatar={ens?.avatar} size={42} />
  )

  return (
    <div className="flex items-center">
      {side === 'left' && icon}
      <div>
        <div className="ml-2 text-xs text-gray-300">{label}</div>
        {ens?.name ? (
          <div
            className="ml-2 whitespace-nowrap text-base text-gray-200"
            title={address}
          >
            {truncateEns(ens.name)}
          </div>
        ) : (
          <div
            className="ml-2 whitespace-nowrap text-base text-gray-200"
            title={address}
          >
            {truncateAddress(address || '')}
          </div>
        )}
      </div>
      {side === 'right' && icon}
    </div>
  )
}

export default EthAccount
