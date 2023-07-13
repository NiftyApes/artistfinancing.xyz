import { truncateAddress, truncateEns } from 'lib/truncateText'
import { ComponentPropsWithoutRef, FC, forwardRef } from 'react'
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
}

// TODO: Consolidate with 'EthAccount' component.
const TokenCardEthAccount: FC<Props> = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<FC<Props>>
>(({ address, ens, title, side = 'right', hideIcon }, ref) => {
  const icon = !hideIcon && <Avatar address={address} avatar={ens?.avatar} />

  return (
    <a ref={ref}>
      <div className="flex items-center gap-2">
        {title && (
          <p className="text-[13px] capitalize text-gray-400 ">{title}</p>
        )}
        {side === 'left' && icon}
        {ens?.name ? (
          <div title={address} className="dark:text-white">
            {truncateEns(ens.name)}
          </div>
        ) : (
          <div
            className="block whitespace-nowrap font-mono text-[13px] text-gray-400"
            title={address}
          >
            {truncateAddress(address || '')}
          </div>
        )}
        {side === 'right' && icon}
      </div>
    </a>
  )
})

TokenCardEthAccount.displayName = 'TokenCardEthAccount'

export default TokenCardEthAccount
