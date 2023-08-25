import { Offer, useCancelOffer, useOffers } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Button from 'components/Button'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import LoadingIcon from 'components/LoadingIcon'
import { useEtherscanUri } from 'hooks/useEtherscan'
import isEqualAddress from 'lib/isEqualAddress'
import { optimizeImage } from 'lib/optmizeImage'
import { processOffer } from 'lib/processOffer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useWaitForTransaction } from 'wagmi'

const DARK_MODE = process.env.NEXT_PUBLIC_DARK_MODE

const ManageListingsTable: FC = () => {
  const router = useRouter()
  const { address } = router.query

  const {
    data: offers = [],
    isLoading,
    refetch: refetchOffers,
  } = useOffers({
    creator: address as string,
    includeExpired: true,
  })

  const tokensQueryArr = offers?.map(
    (offer) => `${offer.offer.nftContractAddress}:${offer.offer.nftId}`
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

  // Sort so that "ACTIVE" loans are at the top.
  offers.sort((a, b) => {
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
      {offers.length === 0 && (
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
      {offers.length > 0 && (
        <table className="min-w-full table-auto dark:divide-neutral-600">
          <thead className="bg-white dark:bg-black">
            <tr className="border-b border-gray-700">
              {[
                'Item',
                'Price',
                'Down payment',
                'Min. principal payment',
                'Pay period',
                'APR',
                'Duration',
                'Expires',
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
            {offers.map((listing: Offer, index) => {
              const { offer, signature, status } = listing
              const token = tokens.data.find(
                (token) =>
                  isEqualAddress(
                    token?.token?.contract,
                    offer.nftContractAddress
                  ) && token?.token?.tokenId === offer.nftId
              )

              return (
                <ManageListingsTableRow
                  key={`${signature}-${index}`}
                  signature={signature}
                  offer={offer}
                  status={status}
                  token={token}
                  refetchOffers={refetchOffers}
                />
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

type ManageListingsRowProps = {
  offer: Offer['offer']
  signature: `0x${string}`
  status: Offer['status']
  token: ReturnType<typeof useTokens>['data'][0]
  refetchOffers: () => void
}

const ManageListingsTableRow = ({
  offer,
  status,
  signature,
  token,
  refetchOffers,
}: ManageListingsRowProps) => {
  const {
    listPrice,
    downPaymentAmount,
    expirationRelative,
    payPeriodDays,
    apr,
    minPrincipalPerPeriod,
    image,
    tokenName,
    collectionName,
  } = processOffer(offer, token)

  const {
    data,
    isLoading: isWriteLoading,
    write,
  } = useCancelOffer({
    offer,
    signature,
    enabled: status === 'ACTIVE',
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

  // Refetch offers to refresh the page after successful "Cancel Offer" call
  useEffect(() => {
    setTimeout(refetchOffers, 1000)
  }, [isTxSuccess, isTxError])

  const isLoading = isWriteLoading || isTxLoading

  let cancelOfferBtnText = 'Cancel Offer'
  if (isWriteLoading) {
    cancelOfferBtnText = 'Pending Approval'
  } else if (isTxLoading) {
    cancelOfferBtnText = 'Transaction Submitted'
  } else if (isTxSuccess) {
    cancelOfferBtnText = 'Transaction Success'
  } else if (isTxError) {
    cancelOfferBtnText = 'Transaction Error'
  }

  return (
    <tr className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white text-left dark:border-b-neutral-600 dark:bg-black">
      {/* ITEM */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <Link
          passHref
          href={`/${token?.token?.contract}/${token?.token?.tokenId}`}
        >
          <div className="flex items-center gap-2">
            <div className="relative overflow-hidden rounded">
              <img
                src={
                  image
                    ? optimizeImage(image, 64)
                    : '/niftyapes/placeholder-64x64.png'
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
        </Link>
      </td>

      {/* PRICE */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatNativeCrypto maximumFractionDigits={4} amount={listPrice} />
      </td>

      {/* DOWN PAYMENT */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatNativeCrypto
          maximumFractionDigits={4}
          amount={downPaymentAmount}
        />
      </td>

      {/* MIN. PAYMENT */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatNativeCrypto
          maximumFractionDigits={4}
          amount={minPrincipalPerPeriod}
        />
      </td>

      {/* PAY PERIOD */}
      <td className="whitespace-nowrap px-6 py-4">10 days</td>

      {/* APR */}
      <td className="px-6 py-4 font-light text-neutral-600 dark:text-neutral-300">
        {apr}%
      </td>

      {/* DURATION */}
      <td className="whitespace-nowrap px-6 py-4">{payPeriodDays} days</td>

      {/* EXPIRES */}
      <td className="whitespace-nowrap px-6 py-4">{expirationRelative}</td>

      {/* ACTION */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        {status === 'CANCELLED' && 'Cancelled'}
        {status === 'USED_TO_EXECUTE_LOAN' && 'Used to execute loan'}
        {status === 'EXPIRED' && 'Expired'}
        {status === 'ACTIVE' && (
          <div className="flex w-64 flex-col items-center space-y-2">
            <Button
              textCase="capitalize"
              variant="secondary"
              isLoading={isLoading}
              disabled={isLoading || isTxError || isTxSuccess}
              onClick={() => write?.()}
            >
              {cancelOfferBtnText}
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
        )}
      </td>
    </tr>
  )
}

export default ManageListingsTable
