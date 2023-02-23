import {
  FC,
} from 'react'
import { DateTime } from 'luxon'
import FormatCrypto from 'components/FormatCrypto'
import { useRouter } from 'next/router'
import LoadingIcon from 'components/LoadingIcon'
import { useMediaQuery } from '@react-hookz/web'
import useOffers, { Offer } from 'hooks/niftyapes/useOffers'
import { format } from 'date-fns'

const UserFinancingOffersTable: FC = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('only screen and (max-width : 730px)')
  const { address } = router.query

  const { data: offers = [], isLoading } = useOffers({ creator: address as string, includeExpired: true });

  if (isLoading) {
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
        ? offers.map((offer, index) => (
            <UserFinancingOffersTableMobileRow
              key={`${offer?.signature}-${index}`}
              offer={offer.offer}
            />
          ))
        : offers.length > 0 && (
            <table className="min-w-full table-auto dark:divide-neutral-600">
              <thead className="bg-white dark:bg-black">
                <tr>
                  {[
                    'Item',
                    'Price',
                    'Down payment',
                    'Min. payment',
                    'Pay period',
                    'APR',
                    'Duration',
                    'Expires',
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
                {offers.map((listing: Offer, index) => {
                  const { offer, signature } = listing;

                  return (
                  <UserListingsTableRow
                    key={`${signature}-${index}`}
                    offer={offer}
                  />
                )})}
              </tbody>
            </table>
          )}
    </div>
  )
}

type UserOffersRowProps = {
  offer: Offer['offer'],
}

const UserListingsTableRow = ({
  offer,
}: UserOffersRowProps) => {
  const {
    price,
    downPaymentAmount,
    expiration,
    periodDuration,
    apr,
    tokenId,
    minPayment
  } = processOffer(offer)

  return (
    <tr
      className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white dark:border-b-neutral-600 dark:bg-black"
    >
      {/* ITEM */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        {tokenId}
      </td>

      {/* PRICE */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatCrypto
          amount={price}
        />
      </td>

      {/* DOWN PAYMENT */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatCrypto
          amount={downPaymentAmount}
        />
      </td>

      {/* MIN. PAYMENT */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <FormatCrypto
          amount={minPayment}
        />
      </td>

      {/* PAY PERIOD */}
      <td className="whitespace-nowrap px-6 py-4">10 days</td>

      {/* APR */}
      <td className="px-6 py-4 font-light text-neutral-600 dark:text-neutral-300">
        {apr}%
      </td>

      {/* DURATION */}
      <td className="whitespace-nowrap px-6 py-4">{periodDuration}</td>

      {/* EXPIRES */}
      <td className="whitespace-nowrap px-6 py-4">{expiration}</td>

      {/* CANCEL LOAN */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <button className="btn-primary-fill gap-2 dark:ring-primary-900 dark:focus:ring-4">
          Cancel Loan
        </button>
      </td>
    </tr>
  )
}

const UserFinancingOffersTableMobileRow = ({
  offer,
}: UserOffersRowProps) => {
  const {
    price,
    expiration,
    tokenId,
  } = processOffer(offer)

  return (
    <div
      className="border-b-[1px] border-solid border-b-neutral-300	py-[16px]"
    >
      <div className="flex items-center justify-between">
        <div className="reservoir-h6 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-headings text-sm dark:text-white">
          {tokenId}
        </div>
        <div className="flex flex-col">
          <FormatCrypto
            amount={price}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="text-xs font-light text-neutral-600 dark:text-neutral-300">{`Expires ${expiration}`}</div>
      </div>
    </div>
  )
}

export default UserFinancingOffersTable

function processOffer(listing: Offer['offer']) {
  const tokenId = listing.nftId;
  const contract = listing.nftContractAddress;

  const price = parseInt(listing?.price, 10);
  const downPaymentAmount = parseInt(listing?.downPaymentAmount, 10);

  const data = {
    contract,
    tokenId,
    expiration:
      listing?.expiration === 0
        ? 'Never'
        : DateTime.fromMillis(+`${listing?.expiration}000`).toRelative(),
    id: listing?.nftId,
    price,
    downPaymentAmount,
    periodDuration: format(new Date(listing?.periodDuration * 1000), 'Pp'),
    address: listing?.nftContractAddress,
    apr: listing?.periodInterestRateBps,
    minPayment: Number(listing?.minimumPrincipalPerPeriod) + (Number(listing?.periodInterestRateBps) * Number(price - downPaymentAmount)),
  }

  const tokenHref = `/${data.contract}/${data.tokenId}`

  return { ...data, tokenHref }
}
