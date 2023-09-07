import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import useSuperRareToken from 'hooks/useSuperRareToken'
import { FC } from 'react'
import TokenCardEthAccount from './TokenCardEthAccount'

type Props = {
  details: ReturnType<typeof useTokens>['data'][0]
}

const TokenCardOwner: FC<Props> = ({ details }) => {
  const token = details?.token

  const owner =
    token?.kind === 'erc1155' && details?.market?.floorAsk?.maker
      ? details?.market?.floorAsk?.maker
      : token?.owner

  const { data: srToken } = useSuperRareToken(token?.contract!, token?.tokenId!)
  const artistEns = {
    name: srToken?.erc721_token?.erc721_creator.creator.username,
    avatar: srToken?.erc721_token?.erc721_creator.creator.avatar,
  }

  return (
    <div className="flex space-x-4">
      {srToken?.erc721_token && (
        <div className="w-1/2">
          <div className="mb-2 text-[10px] text-gray-400">Artist</div>
          <TokenCardEthAccount
            address={srToken?.erc721_token?.erc721_creator.address}
            ens={artistEns}
          />
        </div>
      )}
      {owner && (
        <div className="w-1/2">
          <div className="mb-2 text-[10px] text-gray-400">Owner</div>
          <TokenCardEthAccount address={owner} />
        </div>
      )}
    </div>
  )
}

export default TokenCardOwner
