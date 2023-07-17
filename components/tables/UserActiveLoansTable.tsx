import { Loan, useLoans, useSeizeAsset } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import LoadingIcon from 'components/LoadingIcon'
import { format } from 'date-fns'
import { BigNumber } from 'ethers'
import { useEtherscanUri } from 'hooks/useEtherscan'
import isEqualAddress from 'lib/isEqualAddress'
import { processLoan } from 'lib/processLoan'
import { processOffer } from 'lib/processOffer'
import { optimizeImage } from 'lib/optmizeImage'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { Address, useWaitForTransaction } from 'wagmi'
import Button from '../Button'

const DARK_MODE = process.env.NEXT_PUBLIC_DARK_MODE

const UserActiveLoansTable: FC = () => {
  const router = useRouter()
  const { address } = router.query

  const {
    data: loans = [],
    isLoading,
    refetch: refetchLoans,
  } = useLoans({
    seller: address as Address,
  })

  const tokensQueryArr = loans?.map(
    (item) => `${item.offer.offer.nftContractAddress}:${item.offer.offer.nftId}`
  )
  const { data, isFetchingPage, isFetchingInitialData } = useTokens({
    tokens: tokensQueryArr,
  })

  if (isLoading || isFetchingInitialData || isFetchingPage) {
    return (
      <div className="my-20 flex justify-center">
        <LoadingIcon />
      </div>
    )
  }

  // Sort so that "ACTIVE" loans are at the top.
  loans.sort((a, b) => {
    if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') {
      return -1
    } else if (b.status === 'ACTIVE' && a.status !== 'ACTIVE') {
      return 1
    } else {
      return 0
    }
  })

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
      {loans.length > 0 && (
        <table className="min-w-full table-auto dark:divide-neutral-600">
          <thead className="bg-white dark:bg-black">
            <tr className="border-b border-gray-700">
              {[
                'Item',
                'Price',
                'APR',
                'Next payment',
                'Principal Remaining',
                'Status',
                'Action',
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
            {loans.map((loan, index) => {
              const token = data.find(
                (token) =>
                  isEqualAddress(
                    token?.token?.contract,
                    loan.offer.offer.nftContractAddress
                  ) && token?.token?.tokenId === loan.offer.offer.nftId
              )

              return (
                <UserActiveLoansRow
                  key={index}
                  loan={loan}
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

type UserActiveLoansRowProps = {
  loan: Loan
  token: ReturnType<typeof useTokens>['data'][0]
  refetchLoans: () => void
}

const UserActiveLoansRow: FC<UserActiveLoansRowProps> = ({
  loan,
  token,
  refetchLoans,
}) => {
  const { apr, listPrice, image, tokenName, collectionName } = processOffer(
    loan.offer.offer,
    token
  )

  const { periodEndTimestamp, remainingPrincipal, inDefault } = processLoan(
    loan.loan
  )

  const {
    data,
    isLoading: isWriteLoading,
    write,
  } = useSeizeAsset({
    nftContractAddress: loan.offer.offer.nftContractAddress,
    nftId: BigNumber.from(loan.offer.offer.nftId),
    enabled: inDefault && loan.status === 'ACTIVE',
  })

  const {
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    isError: isTxError,
  } = useWaitForTransaction({ hash: data?.hash })

  const etherscanUri = useEtherscanUri()
  const etherscanLogo = DARK_MODE
    ? '/icons/etherscan-logo-light-circle.svg'
    : '/icons/etherscan-logo-circle.svg'

  // Refetch loans to refresh the page after successful "Seize Asset" call
  useEffect(() => {
    setTimeout(refetchLoans, 1000)
  }, [isTxSuccess, isTxError])

  const isLoading = isWriteLoading || isTxLoading

  let seizeAssetBtnText = 'Seize Asset'
  if (isWriteLoading) {
    seizeAssetBtnText = 'Pending Approval'
  } else if (isTxLoading) {
    seizeAssetBtnText = 'Transaction Submitted'
  } else if (isTxSuccess) {
    seizeAssetBtnText = 'Transaction Success'
  } else if (isTxError) {
    seizeAssetBtnText = 'Transaction Error'
  }

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
        {inDefault && loan.status === 'ACTIVE' ? (
          <div className="flex w-64 flex-col items-center space-y-2">
            <Button
              textCase="capitalize"
              variant="secondary"
              isLoading={isLoading}
              disabled={isLoading || isTxError || isTxSuccess}
              onClick={() => write?.()}
            >
              {seizeAssetBtnText}
            </Button>
            {data?.hash && (
              <div className="flex items-center space-x-2">
                <img
                  src={etherscanLogo}
                  alt="Etherscan Icon"
                  className="h-4 w-4"
                />

                <a
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  href={`${etherscanUri}/tx/${data?.hash}`}
                >
                  View Transaction
                </a>
              </div>
            )}
          </div>
        ) : (
          'None'
        )}
      </td>
    </tr>
  )
}

export default UserActiveLoansTable
