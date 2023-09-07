import { truncateAddress, truncateEns } from 'lib/truncateText'
import { FC } from 'react'
import Avatar from '../Avatar'

type Props = {
  address: string | undefined
  ens?: {
    avatar: string | null | undefined
    name: string | null | undefined
  }
}

const TokenCardEthAccount: FC<Props> = ({ address, ens }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar address={address} avatar={ens?.avatar} />

      <div
        title={address}
        className="block whitespace-nowrap font-mono text-[13px] text-gray-400"
      >
        {ens?.name ? truncateEns(ens.name) : truncateAddress(address || '')}
      </div>
    </div>
  )
}

export default TokenCardEthAccount
