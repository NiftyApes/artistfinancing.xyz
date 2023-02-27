import {
  ComponentProps,
  FC
} from 'react'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { optimizeImage } from 'lib/optmizeImage'
import { Address, useSigner } from 'wagmi'
import Toast from 'components/Toast'
import CancelListing from 'components/CancelListing'
import FormatCrypto from 'components/FormatCrypto'
import useCoinConversion from 'hooks/useCoinConversion'
import { formatDollar } from 'lib/numbers'
import { useListings } from '@reservoir0x/reservoir-kit-ui'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import * as Dialog from '@radix-ui/react-dialog'
import LoadingIcon from 'components/LoadingIcon'

import { FiAlertCircle } from 'react-icons/fi'
import MakePaymentModal from 'components/niftyapes/MakePaymentModal'
import useLoans from '../../hooks/niftyapes/useLoans'
import { BigNumber } from 'ethers'

import { format } from 'date-fns'
import { processOffer } from '../../lib/niftyapes/processOffer'

const API_BASE =
  process.env.NEXT_PUBLIC_RESERVOIR_API_BASE || 'https://api.reservoir.tools'

type Props = {
  isOwner: boolean
  collectionIds?: string[]
  modal: {
    isInTheWrongNetwork: boolean | undefined
    setToast: (data: ComponentProps<typeof Toast>['data']) => any
  }
  showActive?: boolean
}

const UserUpcomingPaymentsTable: FC<Props> = ({
                                                modal,
                                                collectionIds,
                                                showActive,
                                                isOwner
                                              }) => {

  const router = useRouter()
  const { address } = router.query

  const { data: loans, isLoading } = useLoans({ owner: address as string })
  const { ref } = useInView()

  if (isLoading) {
    return (
      <div className='my-20 flex justify-center'>
        <LoadingIcon />
      </div>
    )
  }


  return (
    <div className='mb-11 overflow-x-auto'>
      {!showActive && (
        <div className='flex items-center rounded-lg bg-[#F5F5F5] p-4 text-sm dark:bg-[#262626]'>
          <FiAlertCircle className='mr-2 h-4 w-4 shrink-0 text-[#A3A3A3] dark:text-white' />
          <span>
            An inactive listing is a listing of your NFT that was never canceled
            and is still fulfillable should that item be returned to your
            wallet.
          </span>
        </div>
      )}
      {!loans || loans.data.length === 0 && (
        <div className='mt-14 flex flex-col items-center justify-center text-[#525252] dark:text-white'>
          <img
            src='/icons/listing-icon.svg'
            alt='No listings'
            className='mb-10 dark:hidden'
          />
          <img
            src='/icons/listing-icon-dark.svg'
            alt='No listings'
            className='mb-10 hidden dark:block'
          />
          No {showActive ? 'active' : 'inactive'} loans yet
        </div>
      )}
      {loans && loans.data.length > 0 && (
        <table className='min-w-full table-auto dark:divide-neutral-600'>
          <thead className='bg-white dark:bg-black'>
          <tr>
            {[
              'Item',
              'Price',
              'APR',
              'Next Payment Due',
              'Next Minimum Payment',
              'Principal Remaining'
            ].map((item) => (
              <th
                key={item}
                scope='col'
                className='px-6 py-3 text-left text-sm font-medium text-neutral-600 dark:text-white'
              >
                {item}
              </th>
            ))}
            <th scope='col' className='relative px-6 py-3'>
              <span className='sr-only'>Cancel</span>
            </th>
          </tr>
          </thead>
          <tbody>

          {loans.data.map((item: any, index: null) => {


              return <UpcomingPaymentsTableRow ref={ref} loan={item.loan} isOwner={true} offer={item.offer.offer} key={index} />
            }
          )}
          </tbody>
        </table>
      )}
    </div>
  )
}

type LoansRowProps = {
  isOwner: boolean

  loan: {
    buyerNftId: string,
    sellerNftId: string,
    remainingPrincipal: string,
    minimumPrincipalPerPeriod: string,
    periodInterestRateBps: number,
    periodDuration: number,
    periodEndTimestamp: number,
    periodBeginTimestamp: number
  },
  offer: {
    minimumPrincipalPerPeriod: string,
    periodDuration: number,
    creator: string,
    nftContractAddress: string,
    price: string,
    periodInterestRateBps: number,
    nftId: 110,
    expiration: 1676593371,
    downPaymentAmount: string,
  }

  // modal: Props['modal']
  // mutate: ReturnType<typeof useListings>['mutate']
  ref: null | ((node?: Element | null) => void)
}


type UserListingsRowProps = {
  isOwner: boolean
  listing: ReturnType<typeof useListings>['data'][0]
  modal: Props['modal']
  mutate: ReturnType<typeof useListings>['mutate']
  ref: null | ((node?: Element | null) => void)
}


const UpcomingPaymentsTableRow = ({ ref, loan, offer }: LoansRowProps) => {

  // type OfferDetails = {
  //   creator: Address
  //   downPaymentAmount: string
  //   expiration: number
  //   minimumPrincipalPerPeriod: string
  //   nftContractAddress: Address
  //   nftId: string
  //   periodDuration: number
  //   periodInterestRateBps: number
  //   price: string
  // }
  //
  //
  // const {
  //   listPrice,
  //   downPaymentAmount,
  //   expirationRelative,
  //   payPeriodDays,
  //   apr,
  //   tokenId,
  //   minPrincipalPerPeriod
  // } = processOffer(offer.offer)


  const { remainingPrincipal, minimumPrincipalPerPeriod, periodInterestRateBps, periodEndTimestamp } = loan
  const { price, nftId } = offer

  const minPayment = Number(minimumPrincipalPerPeriod) + (Number(periodInterestRateBps) * Number(remainingPrincipal))


  return (
    <tr
      ref={ref}
      className='group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white dark:border-b-neutral-600 dark:bg-black'>
      {/* ITEM */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        {nftId}
      </td>

      {/* PRICE */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        <FormatCrypto
          amount={BigNumber.from(price)}
        />
      </td>

      {/* APR */}
      <td className='px-6 py-4 font-light text-neutral-600 dark:text-neutral-300'>
        {periodInterestRateBps}
      </td>

      {/* NEXT PAYMENT DUE */}
      <td className='whitespace-nowrap px-6 py-4'>
        {format(new Date(periodEndTimestamp * 1000), 'Pp')}
      </td>

      {/* NEXT MINIMUM PAYMENT */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        <FormatCrypto
          amount={BigNumber.from(String(minPayment))}
        />
      </td>

      {/* PRINCIPAL REMAINING */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        <FormatCrypto
          amount={BigNumber.from(remainingPrincipal)}
        />
      </td>

      {/* MAKE PAYMENT */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        <MakePaymentModal data={{ loan, offer, image: '/niftyapes/banana.png' }} />
      </td>
    </tr>
  )
}

const UserUpcomingPaymentsTableMobileRow = ({
                                              isOwner,
                                              listing,
                                              modal,
                                              mutate,
                                              ref
                                            }: UserListingsRowProps) => {
  const { data: signer } = useSigner()
  const usdConversion = useCoinConversion(
    listing?.price?.currency?.symbol ? 'usd' : undefined,
    listing?.price?.currency?.symbol
  )

  const usdPrice =
    usdConversion && listing?.price?.amount?.decimal
      ? usdConversion * listing?.price?.amount?.decimal
      : null

  const {
    collectionName,
    contract,
    expiration,
    id,
    image,
    name,
    tokenHref,
    tokenId,
    price,
    source
  } = processListing(listing)

  return (
    <div
      className='border-b-[1px] border-solid border-b-neutral-300	py-[16px]'
      ref={ref}
    >
      <div className='flex items-center justify-between'>
        <Link href={tokenHref || '#'} legacyBehavior={true}>
          <a className='flex items-center gap-2'>
            <div className='relative h-14 w-14'>
              {image && (
                <div className='aspect-w-1 aspect-h-1 relative overflow-hidden rounded'>
                  <img
                    src={optimizeImage(image, 56)}
                    alt='Bid Image'
                    className='w-[56px] object-contain'
                    width='56'
                    height='56'
                  />
                </div>
              )}
            </div>
            <div>
              <div
                className='reservoir-h6 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-headings text-sm dark:text-white'>
                {name}
              </div>
              <div
                className='max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-300'>
                {collectionName}
              </div>
            </div>
          </a>
        </Link>
        <div className='flex flex-col'>
          <FormatCrypto
            amount={price?.amount?.decimal}
            address={price?.currency?.contract}
            decimals={price?.currency?.decimals}
            maximumFractionDigits={8}
          />
          {usdPrice && (
            <span className='mt-1 text-right text-xs text-neutral-600 dark:text-neutral-300'>
              {formatDollar(usdPrice)}
            </span>
          )}
        </div>
      </div>
      <div className='flex items-center justify-between pt-4'>
        <div>
          <a
            href={source.link || '#'}
            target='_blank'
            rel='noreferrer'
            className='mb-1 flex items-center gap-1 font-light text-primary-700 dark:text-primary-300'
          >
            {source.icon && (
              <img className='h-6 w-6' alt='Source Icon' src={source.icon} />
            )}
            <span className='max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-xs'>
              {source.name}
            </span>
          </a>
          <div className='text-xs font-light text-neutral-600 dark:text-neutral-300'>{`Expires ${expiration}`}</div>
        </div>
        <CancelListing
          data={{
            id,
            contract,
            tokenId
          }}
          signer={signer}
          show={isOwner}
          isInTheWrongNetwork={modal.isInTheWrongNetwork}
          setToast={modal.setToast}
          mutate={mutate}
          trigger={
            <Dialog.Trigger
              className='btn-primary-outline min-w-[120px] bg-white py-[3px] text-sm text-[#FF3B3B] dark:border-neutral-600 dark:bg-black dark:text-[#FF9A9A] dark:ring-primary-900 dark:focus:ring-4'>
              Cancel
            </Dialog.Trigger>
          }
        />
      </div>
    </div>
  )
}

export default UserUpcomingPaymentsTable

function processListing(listing: ReturnType<typeof useListings>['data'][0]) {
  const tokenId = listing?.tokenSetId?.split(':')[2]
  const contract = listing?.tokenSetId?.split(':')[1]
  const collectionRedirectUrl = `${API_BASE}/redirect/collections/${listing?.contract}/image/v1`

  const data = {
    contract,
    tokenId,
    image: listing?.criteria?.data?.token?.image || collectionRedirectUrl,
    name: listing?.criteria?.data?.token?.name,
    expiration:
      listing?.expiration === 0
        ? 'Never'
        : DateTime.fromMillis(+`${listing?.expiration}000`).toRelative(),
    id: listing?.id,
    collectionName: listing?.criteria?.data?.collection?.name,
    price: listing?.price,
    source: {
      icon: (listing?.source?.icon as string) || null,
      name: (listing?.source?.name as string) || null,
      link:
        listing?.source?.domain && tokenId
          ? `${API_BASE}/redirect/sources/${listing?.source?.domain}/tokens/${contract}:${tokenId}/link/v2`
          : `https://${listing?.source?.domain as string}` || null
    }
  }

  const tokenHref = `/${data.contract}/${data.tokenId}`

  return { ...data, tokenHref }
}
