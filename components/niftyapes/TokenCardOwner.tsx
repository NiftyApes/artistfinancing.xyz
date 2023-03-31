import TokenCardEthAccount from './TokenCardEthAccount'
import Link from 'next/link'
import { FC } from 'react'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'

type Props = {
  details: ReturnType<typeof useTokens>['data'][0]
}

const TokenCardOwner: FC<Props> = ({ details }) => {
  const token = details?.token

  const owner =
    token?.kind === 'erc1155' && details?.market?.floorAsk?.maker
      ? details?.market?.floorAsk?.maker
      : token?.owner

  return (
    <div>
      <div className="my-2 text-[10px] text-gray-400">Owner</div>
      {owner && (
        <Link href={`/address/${owner}`} legacyBehavior={true}>
          <TokenCardEthAccount address={owner} side="left" />
        </Link>
      )}
    </div>
  )
}

export default TokenCardOwner
