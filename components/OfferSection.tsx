import {
  Address,
  BuyWithFinancingModal,
  CreateOfferModal,
  Loan,
  MakePaymentModal,
  useOffers,
  useSellerFinancingContract,
  useUnderlyingNFTOwner,
} from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import EthAccount from 'components/EthAccount'
import InfoTooltip from 'components/InfoTooltip'
import useMounted from 'hooks/useMounted'
import { formatBN } from 'lib/numbers'
import { DateTime, Duration } from 'luxon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiFillTags, AiOutlineRightCircle } from 'react-icons/ai'
import { LuCalendarX } from 'react-icons/lu'
import { ClipLoader } from 'react-spinners'
import { useAccount } from 'wagmi'
import { PaymentCalendarReminderFromToken } from './PaymentCalendarReminder'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
  isOwner: boolean
}

const OfferSection: FC<Props> = ({ token, isOwner }) => {
  // Need to check if mounted as ownership can only be determined
  // on the client side with the logged in user.
  const isMounted = useMounted()
  const account = useAccount()
  const router = useRouter()

  const { address } = useAccount()
  const {
    isEntitledToNft,
    isLoadingLoans: isLoadingOwnershipCheck,
    activeLoanForNft,
  } = useUnderlyingNFTOwner()

  const activeLoan: Loan = activeLoanForNft(
    token?.token?.contract as Address,
    token?.token?.tokenId
  )

  const isNiftyApesOwned = isEntitledToNft(
    token?.token?.contract as Address,
    token?.token?.tokenId
  )

  const { address: sellerFinancingContractAddress } =
    useSellerFinancingContract()
  const isLoanTicket: boolean =
    token?.token?.contract.toLowerCase() ===
    sellerFinancingContractAddress.toLowerCase()

  const offers = useOffers({
    collection: token?.token?.contract!,
    nftId: token?.token?.tokenId!,
    creator: account.address,
  })

  const activeOffers =
    offers.data?.filter((offer) => offer.status === 'ACTIVE') || []
  const hasActiveOffers = activeOffers && activeOffers.length > 0

  if (!isMounted || !token) {
    return null
  }

  const formattedToken = {
    id: token?.token?.tokenId!,
    name: token.token?.name!,
    imageSrc: token.token?.image!,
    lastSellValue: token.token?.lastSale?.amount
      ? String(token.token.lastSale.amount)
      : '',
    contractAddress: token.token?.contract! as Address,
    collectionName: token.token?.collection?.name!,
    owner: token.token?.owner! as Address,
  }

  /**
   * Displays listings headers
   */
  const renderActiveListingsHeader = () => {
    return (
      <div className="flex h-full items-center">
        <div className="reservoir-h3 mb-1 mr-5 flex font-semibold">
          Listings
        </div>
        <AiFillTags className="mr-2 text-xs text-gray-500" />
        <div className="text-xs text-gray-500">{`${
          activeOffers.length
        } Active Listing${activeOffers.length === 1 ? '' : 's'}`}</div>
      </div>
    )
  }

  /**
   * Displays top three listings and manage listings button
   */
  const renderActiveListings = () => {
    const subset = activeOffers.slice(0, 3)

    return (
      <div className="mt-5 text-xs text-gray-400">
        {subset.map((offer, idx) => {
          return (
            <Link
              passHref
              href={`/address/${account?.address}?tab=manage_listings`}
              key={`offer-${idx}`}
            >
              <div className="mb-4 mt-2 flex h-full items-center">
                <AiOutlineRightCircle className="mr-3 text-xl text-gray-600" />
                <div>
                  {`${
                    formatBN(BigInt(offer.offer.price), 2) as any
                  } ETH over ${Duration.fromObject({
                    seconds: offer.offer.periodDuration,
                  }).as('days')} days`}
                </div>

                <div className="ml-auto rounded-lg border border-gray-600 border-opacity-50 px-2 py-[2px]">
                  expires{' '}
                  {DateTime.fromSeconds(offer.offer.expiration).toRelative()!}
                </div>
              </div>
            </Link>
          )
        })}
        {activeOffers.length > 3 && (
          <div className="mt-10 flex items-center justify-center border-b border-gray-600 border-opacity-50">
            <Link
              href={`/address/${account?.address}?tab=manage_listings`}
              className="my-[-16px] inline-block cursor-pointer rounded-2xl border border-gray-600 border-opacity-50 bg-black px-4 py-2 hover:bg-gray-800 hover:text-gray-200"
            >
              {`View all ${activeOffers.length} Listings`}
            </Link>
          </div>
        )}
      </div>
    )
  }

  if (isLoanTicket) {
    return <>Active Loan...</>
  }

  return (
    <>
      {isLoadingOwnershipCheck ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="#36d7b7" />
        </div>
      ) : isNiftyApesOwned && activeLoan ? (
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <h3 className="reservoir-h3">Purchased with Financing</h3>
            <div className="flex space-x-2">
              <p className="text-md text-gray-300">on Artist Financing</p>
              <img
                className="h-6 w-6"
                src="/niftyapes/af+dot-white.svg"
                alt="NiftyApes banana logo"
              />
            </div>
          </div>
          <div className="flex w-full space-x-2">
            <div className="mr-2">
              <div className="flex">
                <Link passHref href={`/address/${address}`} className="mr-2">
                  <EthAccount
                    address={address}
                    side="left"
                    label="Underlying Owner"
                  />
                </Link>
                <InfoTooltip
                  side="bottom"
                  content="You are entitled to this NFT once your loan is paid in full."
                />
              </div>
            </div>
            {activeLoan &&
              activeLoan.defaultStatus !== 'IN_DEFAULT_AND_NOT_REPAYABLE' && (
                <div className="flex-grow">
                  <MakePaymentModal
                    image={token.token?.image}
                    nftId={token.token?.tokenId!}
                    contractAddress={token.token?.contract! as Address}
                    tokenName={token.token?.name}
                    collectionName={token.token?.collection?.name}
                  />
                </div>
              )}
          </div>
          {activeLoan && activeLoan.defaultStatus === 'NOT_IN_DEFAULT' ? (
            <PaymentCalendarReminderFromToken token={token} />
          ) : (
            <div className="flex items-center space-x-2 text-red-500">
              <span style={{ marginTop: '-3px' }}>
                <LuCalendarX />
              </span>
              <span
                style={{
                  marginLeft: '8px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'Inter',
                  fontSize: '14px',
                }}
              >
                {activeLoan.defaultStatus === 'IN_DEFAULT_AND_NOT_REPAYABLE'
                  ? 'In default, not repayable'
                  : 'Payment Past Due'}
              </span>
            </div>
          )}
        </div>
      ) : (
        <>
          {isOwner === true ? (
            <CreateOfferModal token={formattedToken} />
          ) : (
            <BuyWithFinancingModal
              token={formattedToken}
              redirect={() => {
                router.push(`/address/${address}?tab=upcoming_payments`)
              }}
            />
          )}
        </>
      )}
      {hasActiveOffers && isOwner && (
        <div className="mt-10">
          {renderActiveListingsHeader()}
          {renderActiveListings()}
        </div>
      )}
    </>
  )
}

export default OfferSection
