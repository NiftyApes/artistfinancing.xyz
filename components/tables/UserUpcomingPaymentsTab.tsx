import React, { ComponentProps } from 'react'
import { toast } from 'react-hot-toast'
import { useNetwork } from 'wagmi'
import Toast from 'components/Toast'
import UserUpcomingPaymentsTable from './UserUpcomingPaymentsTable'
import useSearchCommunity from 'hooks/useSearchCommunity'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || ''
const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID

const UserUpcomingPaymentsTab: React.FC = () => {
  const { chain: activeChain } = useNetwork()
  const isInTheWrongNetwork = activeChain?.id !== +CHAIN_ID

  const setToast: (data: ComponentProps<typeof Toast>['data']) => any = (
    data
  ) => toast.custom((t) => <Toast t={t} toast={toast} data={data} />)

  const collections = useSearchCommunity()
  let collectionIds: undefined | string[] = undefined

  if (COLLECTION && !COMMUNITY && !COLLECTION_SET_ID) {
    collectionIds = [COLLECTION]
  }

  if (COMMUNITY || COLLECTION_SET_ID) {
    collectionIds =
      (collections?.data?.collections
        ?.map(({ contract }) => contract)
        .filter((contract) => !!contract) as string[]) || []
  }


  return (
    <div className='mt-14 justify-center dark:text-white'>
      <div className='mb-6 text-center'>
        <UserUpcomingPaymentsTable
          collectionIds={collectionIds}
          isOwner
          modal={{ isInTheWrongNetwork, setToast }}
          showActive
        />
      </div>
    </div>
  )
}

export default UserUpcomingPaymentsTab
