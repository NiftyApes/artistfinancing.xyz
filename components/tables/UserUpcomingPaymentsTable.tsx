import { Loan, LoanDetails, OfferDetails, useLoans } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import LoadingIcon from 'components/LoadingIcon'
import MakePaymentModal from 'components/MakePaymentModal'
import { format } from 'date-fns'
import isEqualAddress from 'lib/isEqualAddress'
import { processLoan } from 'lib/processLoan'
import { optimizeImage } from 'lib/optmizeImage'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { processOffer } from '../../lib/processOffer'
import FormatNativeCrypto from '../FormatNativeCrypto'

const UserUpcomingPaymentsTable: FC = () => {
  const { address } = useAccount()
  const {
    data: loans,
    isLoading,
    refetch: refetchLoans,
  } = useLoans({ buyer: address })

  const activeLoans = loans?.filter((loan) => loan.status === 'ACTIVE')

  const tokensQueryArr = activeLoans?.map(
    (item) => `${item.offer.offer.nftContractAddress}:${item.offer.offer.nftId}`
  )
  const tokens = useTokens({
    tokens: tokensQueryArr,
  })

  if (isLoading || tokens.isFetchingInitialData || tokens.isFetchingPage) {
    return (
      <div className="my-20 flex justify-center">
        <LoadingIcon />
      </div>
    )
  }

  return (
    <div className="mb-11 overflow-x-auto">
      {!activeLoans ||
        (activeLoans.length === 0 && (
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
            No active loans yet
          </div>
        ))}
      {activeLoans && activeLoans.length > 0 && (
        <table className="min-w-full table-auto dark:divide-neutral-600">
          <thead className="bg-white dark:bg-black">
            <tr className="border-b border-gray-700">
              {[
                'Item',
                'Price',
                'APR',
                'Next Payment Due',
                'Next Minimum Payment',
                'Principal Remaining',
                'Make Payment',
              ].map((item) => (
                <th
                  key={item}
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-neutral-600 dark:text-gray-500"
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
            {activeLoans.map((item: Loan, index) => {
              const token = tokens.data.find(
                (token) =>
                  isEqualAddress(
                    token?.token?.contract,
                    item.offer.offer.nftContractAddress
                  ) && token?.token?.tokenId === item.offer.offer.nftId
              )

              return (
                <UpcomingPaymentsTableRow
                  isOwner={true}
                  key={index}
                  loan={item.loan}
                  offer={item.offer.offer}
                  token={token}
                  refetchLoans={refetchLoans}
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
  loan: LoanDetails
  offer: OfferDetails
  token: ReturnType<typeof useTokens>['data'][0]
  refetchLoans: () => void
}

const UpcomingPaymentsTableRow = ({
  loan,
  offer,
  token,
  refetchLoans,
}: LoansRowProps) => {
  const { apr, listPrice, image, collectionName, tokenName, tokenId } =
    processOffer(offer, token)

  const { periodEndTimestamp, remainingPrincipal, minimumPayment } =
    processLoan(loan)

  return (
    <tr className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white text-left dark:border-b-neutral-600 dark:bg-black">
      {/* ITEM */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <div className="flex items-center gap-2">
          <div className="aspect-w-1 aspect-h-1 relative h-16 w-16 overflow-hidden rounded">
            <img
              src={
                image ? optimizeImage(image, 64) : '/niftyapes/placeholder.png'
              }
              alt="Bid Image"
              className="h-16 w-16 object-contain"
            />
          </div>
          <span className="whitespace-nowrap">
            <div className="reservoir-h6 max-w-[250px] overflow-hidden text-ellipsis font-headings text-base dark:text-white">
              {tokenName ? tokenName : collectionName}
            </div>
          </span>
        </div>
      </td>

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
          image={image}
          tokenId={tokenId}
          tokenName={tokenName}
          collectionName={collectionName}
          refetchLoans={refetchLoans}
        />
      </td>
    </tr>
  )
}

export default UserUpcomingPaymentsTable
