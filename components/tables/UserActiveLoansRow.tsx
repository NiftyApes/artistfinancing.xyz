import { Loan, useSeizeAsset } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { format } from 'date-fns'
import { BigNumber } from 'ethers'
import { processLoan } from 'lib/niftyapes/processLoan'
import { processOffer } from 'lib/niftyapes/processOffer'
import { optimizeImage } from 'lib/optmizeImage'
import { FC } from 'react'

type Props = {
  loan: Loan
  token: ReturnType<typeof useTokens>['data'][0]
}

export const UserActiveLoansRow: FC<Props> = ({ loan, token }) => {
  const { apr, listPrice, image, tokenName, collectionName } = processOffer(
    loan.offer.offer,
    token
  )

  const { periodEndTimestamp, remainingPrincipal, inDefault } = processLoan(
    loan.loan
  )

  const { isLoading: isLoadingSeizeAsset, write } = useSeizeAsset({
    nftContractAddress: loan.offer.offer.nftContractAddress,
    nftId: BigNumber.from(loan.offer.offer.nftId),
  })

  return (
    <tr className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white text-left dark:border-b-neutral-600 dark:bg-black">
      {/* ITEM */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <div className="flex items-center gap-2">
          <div className="relative h-16 w-16">
            <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded">
              <img
                src={
                  image
                    ? optimizeImage(image, 64)
                    : '/niftyapes/placeholder.png'
                }
                alt="Bid Image"
                className="w-[64px] object-contain"
                width="64"
                height="64"
              />
            </div>
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

      {/* PRINCIPAL REMAINING */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatNativeCrypto
          maximumFractionDigits={4}
          amount={remainingPrincipal}
        />
      </td>

      {/* SEIZE ASSET */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <button
          disabled={isLoadingSeizeAsset || !inDefault}
          onClick={() => write?.()}
          className="btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4"
        >
          Seize Asset
        </button>
      </td>

      {/* SELL LOAN */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <button
          onClick={() => {
            // TODO: We need to add the contract address here.
            // window.location.href = `/${address}/${sellerNft.tokenId}`
          }}
          disabled={loan.status !== 'ACTIVE'}
          className="btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4"
        >
          Sell Loan
        </button>
      </td>

      {/* STATUS */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        {loan.status === 'ACTIVE' && 'Active'}
        {loan.status === 'ASSET_SEIZED' && 'Asset Seized'}
        {loan.status === 'FULLY_REPAID' && 'Fully repaid'}
      </td>
    </tr>
  )
}

export const UserActiveLoansMobileRow: FC<Props> = ({ loan, token }) => {
  const { listPrice, image } = processOffer(loan.offer.offer, token)

  return (
    <div className="border-b-[1px] border-solid border-b-neutral-300	py-[16px]">
      <div className="flex items-center justify-between">
        <div className="relative h-14 w-14">
          <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded">
            <img
              src={
                image ? optimizeImage(image, 56) : '/niftyapes/placeholder.png'
              }
              alt="Bid Image"
              className="w-[56px] object-contain"
              width="56"
              height="56"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <FormatNativeCrypto maximumFractionDigits={4} amount={listPrice} />
        </div>
      </div>
    </div>
  )
}
