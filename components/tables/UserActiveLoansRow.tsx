import { Loan, useSeizeAsset } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { format } from 'date-fns'
import { BigNumber } from 'ethers'
import { processLoan } from 'lib/niftyapes/processLoan'
import { processOffer } from 'lib/niftyapes/processOffer'
import { optimizeImage } from 'lib/optmizeImage'
import { FC } from 'react'
import Button from '../Button'

type Props = {
  loan: Loan
  token: ReturnType<typeof useTokens>['data'][0]
}

export const UserActiveLoansRow: FC<Props> = ({ loan, token }) => {
  const { apr, listPrice, image, tokenName, collectionName } = processOffer(
    loan.offer.offer,
    token
  )

  // TODO: Change back to const
  let { periodEndTimestamp, remainingPrincipal, inDefault } = processLoan(
    loan.loan
  )

  // TODO: Change back to const
  let { isLoading: isLoadingSeizeAsset, write } = useSeizeAsset({
    nftContractAddress: loan.offer.offer.nftContractAddress,
    nftId: BigNumber.from(loan.offer.offer.nftId),
  })

  // TODO: Wait for transaction

  isLoadingSeizeAsset = true
  inDefault = true

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

      {/* PRINCIPAL REMAINING */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatNativeCrypto
          maximumFractionDigits={4}
          amount={remainingPrincipal}
        />
      </td>

      {/* STATUS */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        {loan.status === 'ACTIVE' && 'Active'}
        {loan.status === 'ASSET_SEIZED' && 'Asset Seized'}
        {loan.status === 'FULLY_REPAID' && 'Fully repaid'}
      </td>

      {/* ACTION */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        {inDefault ? (
          <Button
            textCase="capitalize"
            variant="secondary"
            isLoading={isLoadingSeizeAsset}
            onClick={() => write?.()}
          >
            {isLoadingSeizeAsset ? 'Transaction Submitted' : 'Seize Asset'}
          </Button>
        ) : (
          'None'
        )}
      </td>
    </tr>
  )
}
