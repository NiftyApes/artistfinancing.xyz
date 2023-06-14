import {
  Address,
  BuyWithFinancingModal,
  CreateOfferModal,
  Offer,
} from '@niftyapes/sdk'
import { useMediaQuery } from '@react-hookz/web'
import { ListModal } from '@reservoir0x/reservoir-kit-ui'
import NiftyApesOfferDetails from 'components/niftyapes/TokeCardOfferDetails'
import useTokens from 'hooks/useTokens'
import { optimizeImage } from 'lib/optmizeImage'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react'
import { MutatorCallback } from 'swr'
import { Collection } from 'types/reservoir'
import { useAccount } from 'wagmi'
import TokenCardOwner from './niftyapes/TokenCardOwner'
import { useOffers } from '@niftyapes/sdk/src/hooks/useOffers'

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
}

const TokenCard: FC<Props> = ({ token, collection, collectionImage }) => {
  const account = useAccount()

  const singleColumnBreakpoint = useMediaQuery('(max-width: 640px)')

  const [activeOffers, setActiveOffers] = useState<Offer[]>([])
  const offers = useOffers({
    collection: token?.token?.contract!,
    nftId: token?.token?.tokenId!,
  })

  useEffect(() => {
    if (offers.data) {
      const activeOffers = offers.data.filter(
        (offer) => offer.status === 'ACTIVE'
      )
      setActiveOffers(activeOffers)
    }
  }, [offers])

  if (!token) return null
  if (!CHAIN_ID) return null

  const isOwner =
    token?.token?.owner?.toLowerCase() === account?.address?.toLowerCase()
  const imageSize = singleColumnBreakpoint ? 533 : 250

  const formattedToken = {
    id: token?.token?.tokenId!,
    name: token.token?.name!,
    imageSrc: token.token?.image!,
    lastSellValue: String(token.token?.lastSell?.value!),
    contractAddress: token.token?.contract! as Address,
    collectionName: token.token?.collection?.name!,
  }

  return (
    <div
      key={`${token?.token?.contract}${token?.token?.tokenId}`}
      className="group relative mb-6 grid self-start overflow-hidden border-[#D4D4D4] bg-white hover:scale-[1.01] hover:ease-out dark:border-0 dark:bg-black dark:ring-1 dark:ring-neutral-600"
    >
      <div className="absolute z-10 ml-2 mt-2 flex grid-flow-row">
        {activeOffers.length > 0 && isOwner && (
          <div className="rounded-full bg-black bg-opacity-70 pl-2 pr-2 pt-1 pb-1 text-xs">
            {`${activeOffers.length} Listing${
              activeOffers.length == 1 ? '' : 's'
            }`}
          </div>
        )}
      </div>

      <Link
        key={`${token?.token?.contract}:${token?.token?.tokenId}`}
        href={`/${token?.token?.contract}/${token?.token?.tokenId}`}
        legacyBehavior={true}
      >
        <a className="mb-[130px]">
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
                    src={
                      collectionImage
                        ? optimizeImage(collectionImage, imageSize)
                        : '/niftyapes/placeholder.png'
                    }
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
                src={
                  collectionImage
                    ? optimizeImage(collectionImage, imageSize)
                    : '/niftyapes/NA-BLACK.png'
                }
                alt={`${token?.token?.collection?.name}`}
                className="aspect-square w-full object-cover"
                width="250"
                height="250"
              />
            </div>
          )}
        </a>
      </Link>

      <div className="absolute bottom-[0px] w-full dark:bg-black">
        <div className="mb-2 ml-4 mr-4 border-b border-gray-500 pb-4">
          <div className="flex items-center justify-between">
            <div
              className="overflow-hidden truncate pt-4 text-[15px] font-semibold text-gray-300 lg:pt-3"
              title={token?.token?.name || token?.token?.tokenId}
            >
              {token?.token?.name || `#${token?.token?.tokenId}`}
            </div>
          </div>

          {activeOffers && activeOffers.length > 1 && (
            <NiftyApesOfferDetails offer={activeOffers[0]} />
          )}
        </div>

        <div className="border-1 group mb-4 ml-4 mr-4 transform-gpu overflow-hidden">
          <div
            className={
              activeOffers && activeOffers.length === 0 && !isOwner
                ? 'opacity-100'
                : 'group-hover-ease-out opacity-100 transition-all group-hover:opacity-[0]'
            }
          >
            <TokenCardOwner details={token} />
          </div>

          {activeOffers && activeOffers.length > 1 && !isOwner && (
            <div
              className={
                'absolute -bottom-[40px] w-full opacity-0 transition-all group-hover:bottom-[4px] group-hover:opacity-100 group-hover:ease-out'
              }
            >
              <BuyWithFinancingModal
                token={formattedToken}
                hideSection={true}
              />
            </div>
          )}

          {isOwner && (
            <div
              className={
                'absolute -bottom-[40px] w-full opacity-0 transition-all group-hover:bottom-[4px] group-hover:opacity-100 group-hover:ease-out'
              }
            >
              <CreateOfferModal token={formattedToken} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenCard
