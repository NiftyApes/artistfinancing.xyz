import { FC, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { useMediaQuery } from '@react-hookz/web'
import { optimizeImage } from 'lib/optmizeImage'
import { processOffer } from 'lib/niftyapes/processOffer'
import LoadingIcon from 'components/LoadingIcon'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { useWaitForTransaction } from 'wagmi'
import { Offer, useOffers, useCancelOffer } from '@niftyapes/sdk'
import Button from 'components/Button'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'

const UserFinancingOffersTable: FC = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('only screen and (max-width : 730px)')
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
      {isMobile
        ? offers.map((offer, index) => {
            const token = tokens.data.find(
              (token) =>
                isEqualAddress(
                  token?.token?.contract,
                  offer.offer.nftContractAddress
                ) && token?.token?.tokenId === offer.offer.nftId
            )

            return (
              <UserFinancingOffersTableMobileRow
                key={`${offer?.signature}-${index}`}
                offer={offer.offer}
                token={token}
              />
            )
          })
        : offers.length > 0 && (
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

type UserOffersMobileRowProps = {
  offer: Offer['offer']
  token: ReturnType<typeof useTokens>['data'][0]
}

const UserFinancingOffersTableMobileRow = ({
  offer,
  token,
}: UserOffersMobileRowProps) => {
  const { listPrice, expirationRelative, image, tokenName, collectionName } =
    processOffer(offer, token)

  return (
    <div className="border-b-[1px] border-solid border-b-neutral-300	py-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-14 w-14">
            <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded">
              <img
                src={
                  image
                    ? optimizeImage(image, 56)
                    : '/niftyapes/placeholder.png'
                }
                alt="Bid Image"
                className="w-[56px] object-contain"
                width="56"
                height="56"
              />
            </div>
          </div>
          <div>
            <div className="reservoir-h6 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-start font-headings text-sm dark:text-white">
              {tokenName ? tokenName : collectionName}
            </div>
            {tokenName && (
              <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-300">
                {collectionName}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <FormatNativeCrypto maximumFractionDigits={4} amount={listPrice} />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="text-xs font-light text-neutral-600 dark:text-neutral-300">{`Expires ${expirationRelative}`}</div>
      </div>
    </div>
  )
}

export default UserFinancingOffersTable
