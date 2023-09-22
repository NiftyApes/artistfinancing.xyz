import {
  Address,
  BuyWithFinancingModal,
  CreateOfferModal,
  Offer,
  useOffers,
  useSellerFinancingContract,
} from '@niftyapes/sdk'
import { useMediaQuery } from '@react-hookz/web'
import { useFinancingTicketImages } from 'hooks/useFinancingTicketImages'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import isEqualAddress from 'lib/isEqualAddress'
import { optimizeImage } from 'lib/optmizeImage'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { MutatorCallback } from 'swr'
import { Collection } from 'types/reservoir'
import { useAccount } from 'wagmi'
import NiftyApesOfferDetails from './TokenCardOfferDetails'
import TokenCardOwner from './TokenCardOwner'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

type Props = {
  token?: ReturnType<typeof useTokens>['data'][0]
  collection?: Collection
  collectionImage: string | undefined
  collectionSize?: number | undefined
  collectionAttributes?: Collection['attributes']
  mutate: MutatorCallback
}

const TokenCard: FC<Props> = ({ token, collectionImage }) => {
  const account = useAccount()

  const router = useRouter()

  const { address: sellerFinancingContractAddress } =
    useSellerFinancingContract()

  const singleColumnBreakpoint = useMediaQuery('(max-width: 640px)')
  const imageSize = singleColumnBreakpoint ? 533 : 250

  const offers = useOffers({
    collection: token?.token?.contract!,
    nftId: token?.token?.tokenId!,
  })

  const { updateTokenImages } = useFinancingTicketImages()
  updateTokenImages([token])

  if (!token) return null
  if (!CHAIN_ID) return null

  const isLoanTicket: boolean =
    token?.token?.contract.toLowerCase() ===
    sellerFinancingContractAddress.toLowerCase()
  const isOwner = isEqualAddress(token?.token?.owner, account.address)

  const formattedToken = {
    id: token?.token?.tokenId!,
    name: token.token?.name!,
    imageSrc: token.token?.image!,
    lastSellValue: String(token.token?.lastSell?.value!),
    contractAddress: token.token?.contract! as Address,
    collectionName: token.token?.collection?.name!,
    owner: token.token?.owner! as Address,
  }

  const isLaserLewDudeFocus =
    token.token?.contract!?.toLowerCase() ===
      '0x69618C8afB41123514216FD7d6A654950D167c90'.toLowerCase() &&
    token?.token?.tokenId!?.toLowerCase() === '2'

  // Filter out offers where creator is not the current NFT owner
  const activeOffers =
    offers.data?.filter(
      (offer: Offer) =>
        offer.status === 'ACTIVE' &&
        isEqualAddress(offer.offer.creator, token?.token?.owner)
    ) || []
  const hasActiveOffers = activeOffers && activeOffers.length > 0

  return (
    <div
      key={`${token?.token?.contract}${token?.token?.tokenId}`}
      className="group relative grid self-start overflow-hidden border-[#D4D4D4] bg-white hover:scale-[1.01] hover:ease-out dark:border-0 dark:bg-black dark:ring-1 dark:ring-neutral-600"
    >
      <div className="absolute z-10 mt-2 ml-2 flex grid-flow-row">
        {hasActiveOffers && isOwner && (
          <div className="rounded-full bg-black bg-opacity-70 pt-1 pb-1 pl-2 pr-2 text-xs">
            {`${activeOffers.length} Listing${
              activeOffers.length === 1 ? '' : 's'
            }`}
          </div>
        )}
      </div>

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
              <img
                src={
                  isLaserLewDudeFocus
                    ? '/art/Focus.webp'
                    : collectionImage
                    ? optimizeImage(collectionImage, imageSize)
                    : '/niftyapes/placeholder.png'
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

      <div className="w-full dark:bg-black">
        <div className="mb-4 ml-4 mr-4 border-b border-gray-500 pb-4">
          <div className="flex items-center justify-between">
            <div
              className="overflow-hidden truncate pt-4 text-[15px] font-semibold text-gray-300"
              title={
                isLaserLewDudeFocus
                  ? 'Focus [Interactive + Focusable]'
                  : token?.token?.name || token?.token?.tokenId
              }
            >
              {isLaserLewDudeFocus
                ? 'Focus [Interactive + Focusable]'
                : token?.token?.name || `#${token?.token?.tokenId}`}
            </div>
          </div>

          {hasActiveOffers && <NiftyApesOfferDetails offers={activeOffers} />}
        </div>

        <div className="border-1 group mb-4 ml-4 mr-4 transform-gpu overflow-hidden">
          <div
            className={
              (!hasActiveOffers && !isOwner) || isLoanTicket
                ? 'opacity-100'
                : 'group-hover-ease-out opacity-100 transition-all group-hover:opacity-[0]'
            }
          >
            <TokenCardOwner details={token} />
          </div>

          {hasActiveOffers && !isOwner && !isLoanTicket && (
            <div
              className={
                'absolute -bottom-[40px] w-full opacity-0 transition-all group-hover:bottom-[0px] group-hover:opacity-100 group-hover:ease-out'
              }
            >
              <BuyWithFinancingModal
                token={formattedToken}
                hideSection={true}
                redirect={() => {
                  router.push(
                    `/address/${account.address}?tab=upcoming_payments`
                  )
                }}
              />
            </div>
          )}

          {isOwner && !isLoanTicket && (
            <div
              className={
                'absolute -bottom-[40px] w-full opacity-0 transition-all group-hover:bottom-[0px] group-hover:opacity-100 group-hover:ease-out'
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
