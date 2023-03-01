import { FC } from 'react'
import { useRouter } from 'next/router'
import { useMediaQuery } from '@react-hookz/web'

import { processLoan } from 'lib/niftyapes/processLoan'
import LoadingIcon from 'components/LoadingIcon'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import useLoans, { Loan } from 'hooks/niftyapes/useLoans'
import { Address } from 'wagmi'
import { processOffer } from 'lib/niftyapes/processOffer'
import { OfferDetails } from 'hooks/niftyapes/useOffers'
import { useNiftyApesContract } from 'hooks/niftyapes/useNiftyApesContract'
import { format } from 'date-fns'
import MakePaymentModal from 'components/niftyapes/MakePaymentModal'

const UserActiveLoansTable: FC = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('only screen and (max-width : 730px)')
  const { address } = router.query

  const { data: loans = [], isLoading } = useLoans({
    seller: address as Address,
  })

  if (isLoading) {
    return (
      <div className="my-20 flex justify-center">
        <LoadingIcon />
      </div>
    )
  }

  return (
    <div className="mb-11 overflow-x-auto">
      {loans.length === 0 && (
        <div className="mt-14 flex flex-col items-center justify-center text-[#525252] dark:text-white">
          <img
            src="/icons/listing-icon.svg"
            alt="No listings"
            className="mb-10 dark:hidden"
          />
          <img
            src="/icons/listing-icon-dark.svg"
            alt="No listings"
            className="mb-10 hidden dark:block"
          />
          No offers yet
        </div>
      )}
      {isMobile
        ? loans.map((item, index) => (
            <UserActiveLoansMobileTableRow
              sellerNft={item.sellerNft}
              isOwner={true}
              key={index}
              loan={item.loan}
              offer={item.offer.offer}
            />
          ))
        : loans.length > 0 && (
            <table className="min-w-full table-auto dark:divide-neutral-600">
              <thead className="bg-white dark:bg-black">
                <tr>
                  {[
                    'Item',
                    'Price',
                    'Down payment',
                    'Min. principal payment',
                    'Pay period',
                    'APR',
                    'Duration',
                    'Expires',
                  ].map((item) => (
                    <th
                      key={item}
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-neutral-600 dark:text-white"
                    >
                      {item}
                    </th>
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Cancel</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((item: Loan, index) => {
                  return (
                    <UserListingsTableRow
                    sellerNft={item.sellerNft}
                    isOwner={true}
                    key={index}
                    loan={item.loan}
                    offer={item.offer.offer}
                    />
                  )
                })}
              </tbody>
            </table>
          )}
    </div>
  )
}

type LoansRowProps = {
  isOwner: boolean

  loan: {
    buyerNftId: string
    sellerNftId: string
    remainingPrincipal: string
    minimumPrincipalPerPeriod: string
    periodInterestRateBps: number
    periodDuration: number
    periodEndTimestamp: number
    periodBeginTimestamp: number
  }
  sellerNft: {
    tokenId: string
  }
  offer: OfferDetails
}
const UserListingsTableRow = ({ loan, sellerNft, offer }: LoansRowProps) => {
  const { apr, listPrice, minPrincipalPerPeriod, tokenId } = processOffer(offer)

  const { address } = useNiftyApesContract()

  const { periodEndTimestamp, remainingPrincipal, minimumPayment } =
    processLoan(loan)

  return (
    <tr className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white text-left dark:border-b-neutral-600 dark:bg-black">
    {/* ITEM */}
    <td className="whitespace-nowrap px-6 py-4 dark:text-white">{tokenId}</td>

    {/* PRICE */}
    <td className="whitespace-nowrap px-6 py-4 dark:text-white">
      <FormatNativeCrypto maximumFractionDigits={4} amount={listPrice} />
    </td>

    {/* APR */}
    <td className="px-6 py-4 font-light text-neutral-600 dark:text-neutral-300">
      {apr}%
    </td>

    {/* NEXT PAYMENT DUE */}
    <td className="whitespace-nowrap px-6 py-4">
      {format(new Date(periodEndTimestamp * 1000), 'Pp')}
    </td>

    {/* PRINCIPAL REMAINING */}
    <td className="whitespace-nowrap px-6 py-4 dark:text-white">
      <FormatNativeCrypto
        maximumFractionDigits={4}
        amount={remainingPrincipal}
      />
    </td>

    {/* MAKE PAYMENT */}
    <td className="whitespace-nowrap px-6 py-4 dark:text-white">
      <MakePaymentModal
        offer={offer}
        loan={loan}
        data={{ image: '/niftyapes/banana.png' }}
      />
    </td>

    {/* SELL LOAN */}
    <td className="whitespace-nowrap px-6 py-4 dark:text-white">
      <button
        onClick={() => {
          window.location.href = `/${address}/${sellerNft.tokenId}`
        }}
        className="btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4"
      >
        Sell Loan
      </button>
    </td>
  </tr>
  )
}

const UserActiveLoansMobileTableRow = ({ offer }: LoansRowProps) => {
  const { listPrice, expiration, tokenId } = processOffer(offer)

  return (
    <div className="border-b-[1px] border-solid border-b-neutral-300	py-[16px]">
      <div className="flex items-center justify-between">
        <div className="reservoir-h6 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-headings text-sm dark:text-white">
          {tokenId}
        </div>
        <div className="flex flex-col">
          <FormatNativeCrypto maximumFractionDigits={4} amount={listPrice} />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="text-xs font-light text-neutral-600 dark:text-neutral-300">{`Expires ${expiration}`}</div>
      </div>
    </div>
  )
}

export default UserActiveLoansTable
