import { useMediaQuery } from '@react-hookz/web'
import { ListModal } from '@reservoir0x/reservoir-kit-ui'
import useTokens from 'hooks/useTokens'
import { optimizeImage } from 'lib/optmizeImage'
import Image from 'next/legacy/image'
import Link from 'next/link'
import NiftyApesOfferDetails from 'components/niftyapes/TokeCardOfferDetails'
import { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from 'react'

import { MutatorCallback } from 'swr'
import { Collection } from 'types/reservoir'
import { useAccount } from 'wagmi'
import { Offer } from 'hooks/niftyapes/useOffers'
import TokenCardOwner from './niftyapes/TokenCardOwner'
import BuyNowPayLaterModal from './niftyapes/bnpl/BuyNowPayLaterModal'
import ListFinancingModal from './niftyapes/list-financing/ListFinancingModal'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const CURRENCIES = process.env.NEXT_PUBLIC_LISTING_CURRENCIES

type ListingCurrencies = ComponentPropsWithoutRef<
  typeof ListModal
>['currencies']
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
  financeOffer?: Offer
}

const TokenCard: FC<Props> = ({
  token,
  collection,
  collectionImage,
  financeOffer,
}) => {
  const account = useAccount()

  const singleColumnBreakpoint = useMediaQuery('(max-width: 640px)')

  if (!token) return null
  if (!CHAIN_ID) return null

  const isOwner =
    token?.token?.owner?.toLowerCase() === account?.address?.toLowerCase()
  const imageSize = singleColumnBreakpoint ? 533 : 250

  return (
    <div
      key={`${token?.token?.contract}${token?.token?.tokenId}`}
      className="group relative mb-6 grid self-start border-[#D4D4D4] bg-white dark:border-0 dark:bg-neutral-800 dark:ring-1 dark:ring-neutral-600"
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
              className="w-full"
              width={imageSize}
              height={imageSize}
              objectFit="cover"
              layout="responsive"
            />
          ) : (
            <div className="relative w-full">
              <div className="absolute inset-0 grid place-items-center backdrop-blur-lg">
                <div>
                  <img
                    src={optimizeImage(collectionImage, imageSize)}
                    alt={`${token?.token?.collection?.name}`}
                    className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-white"
                    width="64"
                    height="64"
                  />
                  <div className="reservoir-h6 text-white">
                    No Content Available
                  </div>
                </div>
              </div>
              <img
                src={optimizeImage(collectionImage, imageSize)}
                alt={`${token?.token?.collection?.name}`}
                className="aspect-square w-full object-cover"
                width="250"
                height="250"
              />
            </div>
          )}
        </a>
      </Link>

      <div className="dark-bg-neutral-800 md-bottom-[41px] bottom-[0px] w-full">
        <div className="mb-2 ml-4 mr-4 border-b border-gray-500 pb-4">
          <div className="flex items-center justify-between">
            <div
              className="overflow-hidden truncate pt-4 text-[15px] font-semibold text-gray-300 lg:pt-3"
              title={token?.token?.name || token?.token?.tokenId}
            >
              {token?.token?.name || `#${token?.token?.tokenId}`}
            </div>
          </div>

          {financeOffer && <NiftyApesOfferDetails offer={financeOffer} />}
        </div>

        <div className="border-1 group mb-4 ml-4 mr-4 transform-gpu overflow-hidden overflow-hidden">
          <div
            className={
              !financeOffer && !isOwner
                ? 'opacity-100'
                : 'group-hover-ease-out opacity-100 transition-all group-hover:opacity-[0]'
            }
          >
            <TokenCardOwner details={token} />
          </div>

          {financeOffer && (
            <div
              className={
                'absolute bottom-[-40px] w-full opacity-0 transition-all group-hover:bottom-[4px] group-hover:opacity-100 group-hover:ease-out'
              }
            >
              <BuyNowPayLaterModal
                token={token}
                roundedButton={true}
                offer={financeOffer}
              />
            </div>
          )}

          {!financeOffer && isOwner && (
            <div
              className={
                'absolute bottom-[-40px] w-full opacity-0 transition-all group-hover:bottom-[4px] group-hover:opacity-100 group-hover:ease-out'
              }
            >
              <ListFinancingModal
                token={token}
                collection={collection}
                roundedButton={true}
                currListingExists={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenCard
