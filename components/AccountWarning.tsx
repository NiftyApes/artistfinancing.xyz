import { truncateAddress } from 'lib/truncateText'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

function AccountWarning({ id }: { id: string }) {
  const accountData = useAccount()
  const router = useRouter()

  const inRelevantTab =
    router.query.tab &&
    typeof router.query.tab === 'string' &&
    ['upcoming_payments', 'manage_listings', 'sales'].includes(router.query.tab)

  if (!inRelevantTab) {
    return null
  }

  const doesUrlAddressEqualAccountAddress = id === accountData?.address

  if (doesUrlAddressEqualAccountAddress) {
    return null
  }

  // If we've made it to here, we know that the user is on a relevant tab, but
  // the address in the URL does not match the address of the connected account

  const tabDependentMsgPart =
    router.query.tab === 'upcoming_payments'
      ? 'to manage your upcoming payments'
      : router.query.tab === 'manage_listings'
      ? 'to manage your listings'
      : router.query.tab === 'sales'
      ? 'to view your past sales'
      : 'to access this page'

  // If no connected account at all
  if (id !== accountData?.address && !accountData?.address) {
    return (
      <div className="flex w-screen items-center justify-center gap-2 bg-[#FFA500] p-4 text-black">
        You must connect a wallet to {tabDependentMsgPart}
      </div>
    )
  }

  // If there is a connected account, but it doesn't match
  if (id !== accountData?.address && accountData?.address) {
    return (
      <div className="flex w-screen items-center justify-center gap-2 bg-[#FFA500] p-4 text-black">
        You are connected with {truncateAddress(accountData.address)}, but need
        to be connected with {truncateAddress(id)} to access this page
      </div>
    )
  }

  // Should never get here
  return null
}

export default AccountWarning
