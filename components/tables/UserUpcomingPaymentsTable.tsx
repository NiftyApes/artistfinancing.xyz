import LoadingIcon from 'components/LoadingIcon'
import Toast from 'components/Toast'
import { ComponentProps, FC } from 'react'

import MakePaymentModal from 'components/niftyapes/MakePaymentModal'
import { FiAlertCircle } from 'react-icons/fi'
import useLoans, { Loan } from '../../hooks/niftyapes/useLoans'

import { format } from 'date-fns'
import { useAccount } from 'wagmi'
import { useNiftyApesContract } from '../../hooks/niftyapes/useNiftyApesContract'
import { OfferDetails } from '../../hooks/niftyapes/useOffers'
import { processOffer } from '../../lib/niftyapes/processOffer'
import FormatNativeCrypto from '../FormatNativeCrypto'
import { processLoan } from 'lib/niftyapes/processLoan'

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
  isOwner,
}) => {
  const { address } = useAccount()
  const { data: loans, isLoading } = useLoans({ buyer: address })

  if (isLoading) {
    return (
      <div className="my-20 flex justify-center">
        <LoadingIcon />
      </div>
    )
  }

  return (
    <div className="mb-11 overflow-x-auto">
      {!showActive && (
        <div className="flex items-center rounded-lg bg-[#F5F5F5] p-4 text-sm dark:bg-[#262626]">
          <FiAlertCircle className="mr-2 h-4 w-4 shrink-0 text-[#A3A3A3] dark:text-white" />
          <span>
            An inactive listing is a listing of your NFT that was never canceled
            and is still fulfillable should that item be returned to your
            wallet.
          </span>
        </div>
      )}
      {!loans ||
        (loans.length === 0 && (
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
            No {showActive ? 'active' : 'inactive'} loans yet
          </div>
        ))}
      {loans && loans.length > 0 && (
        <table className="min-w-full table-auto dark:divide-neutral-600">
          <thead className="bg-white dark:bg-black">
            <tr>
              {[
                'Item',
                'Price',
                'APR',
                'Next Payment Due',
                'Next Minimum Payment',
                'Principal Remaining',
                'Make Payment',
                'Sell Loan',
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
                <UpcomingPaymentsTableRow
                  buyerNft={item.buyerNft}
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
  buyerNft: {
    tokenId: string
  }
  offer: OfferDetails
}

const UpcomingPaymentsTableRow = ({ loan, buyerNft, offer }: LoansRowProps) => {
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

      {/* NEXT MINIMUM PAYMENT */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatNativeCrypto maximumFractionDigits={4} amount={minimumPayment} />
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
            window.location.href = `/${address}/${buyerNft.tokenId}`
          }}
          className="btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4"
        >
          Sell Loan
        </button>
      </td>
    </tr>
  )
}

export default UserUpcomingPaymentsTable
