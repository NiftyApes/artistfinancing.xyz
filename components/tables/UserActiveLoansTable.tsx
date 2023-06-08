import { useLoans } from '@niftyapes/sdk'
import { useMediaQuery } from '@react-hookz/web'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import LoadingIcon from 'components/LoadingIcon'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Address } from 'wagmi'
import {
  UserActiveLoansMobileRow,
  UserActiveLoansRow,
} from './UserActiveLoansRow'

const UserActiveLoansTable: FC = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('only screen and (max-width : 730px)')
  const { address } = router.query

  const { data: loans = [], isLoading } = useLoans({
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
      {isMobile
        ? loans.map((loan, index) => {
            const token = data.find(
              (token) =>
                isEqualAddress(
                  token?.token?.contract,
                  loan.offer.offer.nftContractAddress
                ) && token?.token?.tokenId === loan.offer.offer.nftId
            )

            return (
              <UserActiveLoansMobileRow key={index} loan={loan} token={token} />
            )
          })
        : loans.length > 0 && (
            <table className="min-w-full table-auto dark:divide-neutral-600">
              <thead className="bg-white dark:bg-black">
                <tr>
                  {[
                    'Item',
                    'Price',
                    'APR',
                    'Next payment',
                    'Principal Remaining',
                    'Seize Asset',
                    'Sell Loan',
                    'Status',
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
                {loans.map((loan, index) => {
                  const token = data.find(
                    (token) =>
                      isEqualAddress(
                        token?.token?.contract,
                        loan.offer.offer.nftContractAddress
                      ) && token?.token?.tokenId === loan.offer.offer.nftId
                  )

                  return (
                    <UserActiveLoansRow key={index} loan={loan} token={token} />
                  )
                })}
              </tbody>
            </table>
          )}
    </div>
  )
}

export default UserActiveLoansTable
