import EthAccount from 'components/EthAccount'
import Link from 'next/link'
import { FC } from 'react'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Collection } from 'types/reservoir'

type Props = {
  details: ReturnType<typeof useTokens>['data'][0]
  bannedOnOpenSea: boolean
  collection?: Collection
}

const Owner: FC<Props> = ({ details, bannedOnOpenSea, collection }) => {
  const token = details?.token

  const owner =
    token?.kind === 'erc1155' && details?.market?.floorAsk?.maker
      ? details?.market?.floorAsk?.maker
      : token?.owner

  return (
    <div className='col-span-full md:col-span-4 lg:col-span-5 lg:col-start-2'>
      <article className='col-span-full bg-white dark:border-neutral-600 dark:bg-black'>

        <div className='reservoir-h3 mb-3 flex items-center gap-4 overflow-hidden font-headings dark:text-white'>
          <div>{token?.name || `#${token?.tokenId}`}</div>
        </div>

        {owner && (
          <Link href={`/address/${owner}`} legacyBehavior={true}>
            <a className='inline-block'>
              <div className='text-white'>
                Owner
              </div>
              <EthAccount address={owner} side='left' />
            </a>
          </Link>
        )}
      </article>
    </div>
  )
}

export default Owner
