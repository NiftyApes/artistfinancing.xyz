import { useMediaQuery } from '@react-hookz/web'
import { ListModal } from '@reservoir0x/reservoir-kit-ui'
import useTokens from 'hooks/useTokens'
import { optimizeImage } from 'lib/optmizeImage'
import Image from 'next/legacy/image'
import Link from 'next/link'
import NiftyApesTokenCardSection from 'components/niftyapes/TokenCardSection'
import { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from 'react'

import { MutatorCallback } from 'swr'
import { Collection } from 'types/reservoir'
import { useAccount} from 'wagmi'
import RarityTooltip from './RarityTooltip'
import { Offer } from 'hooks/niftyapes/useOffers'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const CURRENCIES = process.env.NEXT_PUBLIC_LISTING_CURRENCIES

type ListingCurrencies = ComponentPropsWithoutRef<typeof ListModal>['currencies']
let listingCurrencies: ListingCurrencies = undefined

if (CURRENCIES) {
  listingCurrencies = JSON.parse(CURRENCIES)
}

type Props = {
  token?: ReturnType<typeof useTokens>['tokens']['data'][0]
  collection?: Collection
  collectionImage: string | undefined
  collectionSize?: number | undefined
  collectionAttributes?: Collection['attributes']
  mutate: MutatorCallback
  setClearCartOpen?: Dispatch<SetStateAction<boolean>>
  setCartToSwap?: Dispatch<SetStateAction<any | undefined>>
  financeOffer?: Offer
}

const TokenCard: FC<Props> = ({
                                token,
                                collection,
                                collectionImage,
                                collectionSize,
                                collectionAttributes,
                                financeOffer
                              }) => {
  const account = useAccount()

  const singleColumnBreakpoint = useMediaQuery('(max-width: 640px)')

  if (!token) return null
  if (!CHAIN_ID) return null

  const isOwner = token?.token?.owner?.toLowerCase() === account?.address?.toLowerCase()
  const imageSize = singleColumnBreakpoint ? 533 : 250

  return (
    <div
      key={`${token?.token?.contract}${token?.token?.tokenId}`}
      className='group relative mb-6 grid self-start border-[#D4D4D4] bg-white dark:border-0 dark:bg-neutral-800 dark:ring-1 dark:ring-neutral-600'
    >

      <Link
        key={`${token?.token?.contract}:${token?.token?.tokenId}`}
        href={`/${token?.token?.contract}/${token?.token?.tokenId}`}
        legacyBehavior={true}
      >
        <a>
          {token?.token?.image ? (
            <Image
              loader={({ src }) => src}
              src={optimizeImage(token?.token?.image, imageSize)}
              alt={`${token?.token?.name}`}
              className='w-full'
              width={imageSize}
              height={imageSize}
              objectFit='cover'
              layout='responsive'
            />
          ) : (
            <div className='relative w-full'>
              <div className='absolute inset-0 grid place-items-center backdrop-blur-lg'>
                <div>
                  <img
                    src={optimizeImage(collectionImage, imageSize)}
                    alt={`${token?.token?.collection?.name}`}
                    className='mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-white'
                    width='64'
                    height='64'
                  />
                  <div className='reservoir-h6 text-white'>
                    No Content Available
                  </div>
                </div>
              </div>
              <img
                src={optimizeImage(collectionImage, imageSize)}
                alt={`${token?.token?.collection?.name}`}
                className='aspect-square w-full object-cover'
                width='250'
                height='250'
              />
            </div>
          )}
        </a>
      </Link>
      <div className={`bottom-[0px] w-full bg-white transition-all dark:bg-neutral-800 md:-bottom-[41px]`}>
        <div className='flex items-center justify-between'>
          <div
            className='text-[15px]  font-semibold overflow-hidden truncate px-4 pt-4 text-gray-300 lg:pt-3'
            title={token?.token?.name || token?.token?.tokenId}
          >
            {token?.token?.name || `#${token?.token?.tokenId}`}
          </div>
          {collectionSize &&
            collectionAttributes &&
            collectionAttributes?.length >= 2 &&
            collectionSize >= 2 &&
            token.token?.rarityRank &&
            token.token?.kind != 'erc1155' && (
              <RarityTooltip
                rarityRank={token.token?.rarityRank}
                collectionSize={collectionSize}
              />
            )}
        </div>
        {financeOffer && (
          <NiftyApesTokenCardSection
            token={token}
            collection={collection}
            isOwner={isOwner}
            offer={financeOffer}
          />
        )}
      </div>
    </div>
  )
}

export default TokenCard
