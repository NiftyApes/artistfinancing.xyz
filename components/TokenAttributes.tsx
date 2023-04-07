import { FC } from 'react'
import {
  TokenDetails,
  TokenDetailsAttribute
} from 'types/reservoir'
import useMounted from 'hooks/useMounted'

type Props = {
  token?: TokenDetails
}

const TokenAttributes: FC<Props> = ({ token }) => {
  const isMounted = useMounted()

  if (!isMounted) {
    return null
  }

  if (!token?.attributes || token?.attributes?.length === 0) return null

  return (
    <div>
      <div className='text-sm uppercase mb-6 text-gray-400'>attributes</div>
      {token?.attributes
        ?.slice()
        .sort((a, b) => (b?.floorAskPrice || 0) - (a?.floorAskPrice || 0))
        .map((attribute) => (
          <TokenAttribute
            key={attribute.key}
            attribute={attribute}
          />
        ))}
      <div className='clear-left'></div>
    </div>
  )
}

type TokenAttributeProps = {
  attribute: TokenDetailsAttribute
}

const TokenAttribute: FC<TokenAttributeProps> = ({ attribute }) => {

  return (
    <div className='float-left mr-2 px-4 py-2 rounded-full border border-gray-500 hover:border-slate-200'>
      <div className='text-sm'>
        <span className='mr-1 text-gray-600'>{attribute.key}</span><span>{attribute.value}</span>
      </div>
    </div>
  )
}

export default TokenAttributes
