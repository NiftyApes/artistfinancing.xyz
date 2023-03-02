import { FC } from 'react'
import { useRouter } from 'next/router'
import { useMediaQuery } from '@react-hookz/web'

import { processLoan } from 'lib/niftyapes/processLoan'
import LoadingIcon from 'components/LoadingIcon'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import useLoans, { Loan, LoanDetails } from 'hooks/niftyapes/useLoans'
import { Address } from 'wagmi'
import { processOffer } from 'lib/niftyapes/processOffer'
import { OfferDetails } from 'hooks/niftyapes/useOffers'
import { useNiftyApesContract } from 'hooks/niftyapes/useNiftyApesContract'
import { format } from 'date-fns'
import { useSeizeAsset } from 'hooks/niftyapes/useSeizeAsset'
import { BigNumber } from 'ethers'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { optimizeImage } from 'lib/optmizeImage'

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
  const tokens = useTokens({
    tokens: tokensQueryArr,
  });

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
              token={tokens.data[index]}
            />
          ))
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
                    token={tokens.data[index]}
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

  loan: LoanDetails,
  sellerNft: {
    tokenId: string
  }
  offer: OfferDetails
  token: ReturnType<typeof useTokens>['data'][0];
}
const UserListingsTableRow = ({ loan, sellerNft, offer, token }: LoansRowProps) => {
  const { apr, listPrice, image, tokenName, collectionName } = processOffer(offer, token)

  const { address } = useNiftyApesContract()

  const { periodEndTimestamp, remainingPrincipal, isPastDue } =
    processLoan(loan)

  const {
    isLoading: isLoadingSeizeAsset,
    isError,
    write,
  } = useSeizeAsset({
    nftContractAddress: offer.nftContractAddress,
    nftId: BigNumber.from(offer.nftId),
  });

  return (
    <tr className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white text-left dark:border-b-neutral-600 dark:bg-black">
    {/* ITEM */}
    <td className="whitespace-nowrap px-6 py-4 dark:text-white">
      <div className="flex items-center gap-2">
        <div className="relative h-16 w-16">
          <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded">
            <img
              src={image ? optimizeImage(image, 64) :'/niftyapes/placeholder.png'}
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
        disabled={isLoadingSeizeAsset || isPastDue}
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

const UserActiveLoansMobileTableRow = ({ offer, token }: LoansRowProps) => {
  const { listPrice, image } = processOffer(offer, token)

  return (
    <div className="border-b-[1px] border-solid border-b-neutral-300	py-[16px]">
      <div className="flex items-center justify-between">
        <div className="relative h-14 w-14">
          <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded">
            <img
              src={image ? optimizeImage(image, 56) :'/niftyapes/placeholder.png'}
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

export default UserActiveLoansTable
