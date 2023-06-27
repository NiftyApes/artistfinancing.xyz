import LoadingIcon from 'components/LoadingIcon'
import Toast from 'components/Toast'
import { ComponentProps, FC } from 'react'

import MakePaymentModal from 'components/niftyapes/MakePaymentModal'
import { FiAlertCircle } from 'react-icons/fi'

import { Loan, useLoans } from '@niftyapes/sdk'

import { OfferDetails } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { format } from 'date-fns'
import { processLoan } from 'lib/niftyapes/processLoan'
import { optimizeImage } from 'lib/optmizeImage'
import { useAccount } from 'wagmi'
import { processOffer } from '../../lib/niftyapes/processOffer'
import FormatNativeCrypto from '../FormatNativeCrypto'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'

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
            No {showActive ? 'active' : 'inactive'} loans yet
          </div>
        ))}
      {activeLoans && activeLoans.length > 0 && (
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
                  buyerNft={item.buyerNft}
                  isOwner={true}
                  key={index}
                  loan={item.loan}
                  offer={item.offer.offer}
                  token={token}
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
  token: ReturnType<typeof useTokens>['data'][0]
}

const UpcomingPaymentsTableRow = ({
  loan,
  buyerNft,
  offer,
  token,
}: LoansRowProps) => {
  const { apr, listPrice, image, collectionName, tokenName } = processOffer(
    offer,
    token
  )

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
            {tokenName && (
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                {collectionName}
              </div>
            )}
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
          data={{ image: '/niftyapes/banana.png' }}
        />
      </td>
    </tr>
  )
}

export default UserUpcomingPaymentsTable
