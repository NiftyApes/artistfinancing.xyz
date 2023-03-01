import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMediaQuery } from '@react-hookz/web'

import useOffers, { Offer } from 'hooks/niftyapes/useOffers'
import { processOffer } from 'lib/niftyapes/processOffer'
import LoadingIcon from 'components/LoadingIcon'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { useWithdrawOfferSignature } from '../../hooks/niftyapes/useWithdrawOfferSignature'
import { useQueryClient } from 'react-query'

const UserFinancingOffersTable: FC = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('only screen and (max-width : 730px)')
  const { address } = router.query

  const { data: offers = [], isLoading } = useOffers({
    creator: address as string,
    includeExpired: true
  })

  if (isLoading) {
    return (
      <div className='my-20 flex justify-center'>
        <LoadingIcon />
      </div>
    )
  }

  return (
    <div className='mb-11 overflow-x-auto'>
      {offers.length === 0 && (
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
          No offers yet
        </div>
      )}
      {isMobile
        ? offers.map((offer, index) => (
          <UserFinancingOffersTableMobileRow
            key={`${offer?.signature}-${index}`}
            offer={offer.offer}
          />
        ))
        : offers.length > 0 && (
        <table className='min-w-full table-auto dark:divide-neutral-600'>
          <thead className='bg-white dark:bg-black'>
          <tr>
            {[
              'Item',
              'Price',
              'Down payment',
              'Min. principal payment',
              'Pay period',
              'APR',
              'Duration',
              'Expires'
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
          {offers.map((listing: Offer, index) => {
            const { offer, signature, status } = listing

            return (
              <UserListingsTableRow
                key={`${signature}-${index}`}
                signature={signature}
                offer={offer}
                status={status}
              />
            )
          })}
          </tbody>
        </table>
      )}
    </div>
  )
}

type UserOffersRowProps = {
  offer: Offer['offer'],
  signature: `0x${string}`,
  status: 'ACTIVE' | 'USED_TO_EXECUTED_LOAN' | 'CANCELLED',
}

const UserListingsTableRow = ({ offer, status, signature }: UserOffersRowProps) => {

  const queryClient = useQueryClient()

  const {
    listPrice,
    downPaymentAmount,
    expirationRelative,
    payPeriodDays,
    apr,
    tokenId,
    minPrincipalPerPeriod
  } = processOffer(offer)

  const { write, isLoading, isSuccess } = useWithdrawOfferSignature({ offer, signature })

  useEffect(() => {

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    }, 3000)
  }, [isSuccess])

  return (
    <tr
      className='group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white text-left dark:border-b-neutral-600 dark:bg-black'>
      {/* ITEM */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>{tokenId}</td>

      {/* PRICE */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        <FormatNativeCrypto maximumFractionDigits={4} amount={listPrice} />
      </td>

      {/* DOWN PAYMENT */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        <FormatNativeCrypto
          maximumFractionDigits={4}
          amount={downPaymentAmount}
        />
      </td>

      {/* MIN. PAYMENT */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        <FormatNativeCrypto
          maximumFractionDigits={4}
          amount={minPrincipalPerPeriod}
        />
      </td>

      {/* PAY PERIOD */}
      <td className='whitespace-nowrap px-6 py-4'>10 days</td>

      {/* APR */}
      <td className='px-6 py-4 font-light text-neutral-600 dark:text-neutral-300'>
        {apr}%
      </td>

      {/* DURATION */}
      <td className='whitespace-nowrap px-6 py-4'>{payPeriodDays} days</td>

      {/* EXPIRES */}
      <td className='whitespace-nowrap px-6 py-4'>{expirationRelative}</td>

      {/* CANCEL OFFER */}
      <td className='whitespace-nowrap px-6 py-4 dark:text-white'>
        {status === 'CANCELLED' && 'Cancelled'}
        {status === 'USED_TO_EXECUTED_LOAN' && 'Active Loan'}
        {status === 'ACTIVE' &&
          <button className='btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4 disabled:opacity-50'
                  disabled={isLoading}
                  onClick={() => write?.()}>
            Cancel Offer
          </button>
        }
      </td>
    </tr>
  )
}

type UserOffersMobileRowProps = {
  offer: Offer['offer'],
}


const UserFinancingOffersTableMobileRow = ({ offer }: UserOffersMobileRowProps) => {

  const { listPrice, expiration, tokenId } = processOffer(offer)

  return (
    <div className='border-b-[1px] border-solid border-b-neutral-300	py-[16px]'>
      <div className='flex items-center justify-between'>
        <div
          className='reservoir-h6 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-headings text-sm dark:text-white'>
          {tokenId}
        </div>
        <div className='flex flex-col'>
          <FormatNativeCrypto maximumFractionDigits={4} amount={listPrice} />
        </div>
      </div>
      <div className='flex items-center justify-between pt-4'>
        <div className='text-xs font-light text-neutral-600 dark:text-neutral-300'>{`Expires ${expiration}`}</div>
      </div>
    </div>
  )
}

export default UserFinancingOffersTable
