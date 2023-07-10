import { Offer, useCancelOffer, useOffers } from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import Button from 'components/Button'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import LoadingIcon from 'components/LoadingIcon'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { processOffer } from 'lib/niftyapes/processOffer'
import { optimizeImage } from 'lib/optmizeImage'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useWaitForTransaction } from 'wagmi'

const UserFinancingOffersTable: FC = () => {
  const router = useRouter()
  const { address } = router.query

  const { data: offers = [], isLoading } = useOffers({
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
                <UserListingsTableRow
                  key={`${signature}-${index}`}
                  signature={signature}
                  offer={offer}
                  status={status}
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

type UserOffersRowProps = {
  offer: Offer['offer']
  signature: `0x${string}`
  status: 'ACTIVE' | 'USED_TO_EXECUTE_LOAN' | 'CANCELLED'
  token: ReturnType<typeof useTokens>['data'][0]
}

const UserListingsTableRow = ({
  offer,
  status,
  signature,
  token,
}: UserOffersRowProps) => {
  const queryClient = useQueryClient()

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

  const { data, write } = useCancelOffer({
    offer,
    signature,
  })

  const { isSuccess, isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    }, 3000)
  }, [isSuccess])

  return (
    <tr className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white text-left dark:border-b-neutral-600 dark:bg-black">
      {/* ITEM */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <div className="flex items-center gap-2">
          <div className="relative overflow-hidden rounded">
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

      {/* CANCEL OFFER */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        {status === 'CANCELLED' && 'Cancelled'}
        {status === 'USED_TO_EXECUTE_LOAN' && 'Active Loan'}
        {status === 'ACTIVE' && (
          <Button
            textCase="capitalize"
            variant="secondary"
            isLoading={isLoading}
            onClick={() => write?.()}
          >
            Cancel Offer
          </Button>
        )}
      </td>
    </tr>
  )
}

export default UserFinancingOffersTable
