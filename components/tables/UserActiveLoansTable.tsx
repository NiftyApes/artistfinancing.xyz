import { useLoans } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import LoadingIcon from 'components/LoadingIcon'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Address } from 'wagmi'
import { UserActiveLoansRow } from './UserActiveLoansRow'

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

export default UserActiveLoansTable
