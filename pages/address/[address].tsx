import * as Tabs from '@radix-ui/react-tabs'
import { paths, setParams } from '@reservoir0x/reservoir-sdk'
import Layout from 'components/Layout'
import UserActiveLoansTab from 'components/tables/UserActiveLoansTab'
import UserFinancingOffersTab from 'components/tables/UserFinancingOffersTab'
import UserUpcomingPaymentsTab from 'components/tables/UserUpcomingPaymentsTab'
import UserTokensGrid from 'components/UserTokensGrid'
import useMounted from 'hooks/useMounted'
import { toggleOnItem } from 'lib/router'
import { truncateAddress } from 'lib/truncateText'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Address, useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import Footer from '../../components/Footer'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID
const RESERVOIR_API_KEY = process.env.RESERVOIR_API_KEY
const RESERVOIR_API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const metadata = {
  title: (title: string) => <title>{title}</title>,
}

const Address: NextPage<Props> = ({ address, fallback }) => {
  const isMounted = useMounted()
  const router = useRouter()
  const accountData = useAccount()

  if (!address) {
    throw 'No address set'
  }

  if (!CHAIN_ID) {
    console.debug({ CHAIN_ID })
    return <div>There was an error</div>
  }

  if (!isMounted) {
    return null
  }

  const isOwner = address?.toLowerCase() === accountData?.address?.toLowerCase()
  const formattedAddress = truncateAddress(address as string)

  let tabs = [{ name: 'Gallery', id: 'galley' }]

  if (isOwner) {
    tabs = [
      { name: 'Gallery', id: 'gallery' },
      { name: 'Manage Listings', id: 'manage_listings' },
      { name: 'Active Loans', id: 'active_loans' },
    ]
  }

  return (
    <Layout navbar={{}}>
      <Head>{metadata.title(`${address} Profile`)}</Head>
      <div className="col-span-full min-h-screen">
        <div className="px-4 py-10 md:px-16">
          <Tabs.Root value={router.query?.tab?.toString() || 'gallery'}>
            <Tabs.List className="no-scrollbar mb-4 ml-[-15px] flex w-[calc(100%_+_30px)] overflow-y-scroll border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.2)] md:ml-0 md:w-full">
              {tabs.map(({ name, id }) => (
                <Tabs.Trigger
                  key={id}
                  id={id}
                  value={id}
                  className={
                    'group reservoir-label-l relative min-w-0 shrink-0 whitespace-nowrap border-b-2 border-transparent  py-4 px-8 text-center hover:text-gray-700 focus:z-10 radix-state-active:border-black radix-state-active:text-gray-900 dark:text-white dark:radix-state-active:border-primary-900'
                  }
                  onClick={() => toggleOnItem(router, 'tab', id)}
                >
                  <span>{name}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value="gallery">
              <div className="mt-6">
                <UserTokensGrid fallback={fallback} owner={address || ''} />
              </div>
            </Tabs.Content>
            {isOwner && (
              <Tabs.Content value="upcoming_payments" className="col-span-full">
                <UserUpcomingPaymentsTab />
              </Tabs.Content>
            )}
            {isOwner && (
              <Tabs.Content value="manage_listings" className="col-span-full">
                <UserFinancingOffersTab />
              </Tabs.Content>
            )}
            {isOwner && (
              <Tabs.Content value="active_loans" className="col-span-full">
                <UserActiveLoansTab />
              </Tabs.Content>
            )}
          </Tabs.Root>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Address

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{
  address: string | undefined
  fallback: {
    tokens: paths['/users/{user}/tokens/v6']['get']['responses']['200']['schema']
  }
}> = async ({ params }) => {
  const options: RequestInit | undefined = {}

  const address = params?.address?.toString()

  if (RESERVOIR_API_KEY) {
    options.headers = {
      'x-api-key': RESERVOIR_API_KEY,
    }
  }

  const url = new URL(`${RESERVOIR_API_BASE}/users/${address}/tokens/v6`)

  let query: paths['/users/{user}/tokens/v6']['get']['parameters']['query'] = {
    limit: 20,
    normalizeRoyalties: true,
  }

  if (COLLECTION_SET_ID) {
    query.collectionsSetId = COLLECTION_SET_ID
  } else {
    if (COMMUNITY) query.community = COMMUNITY
  }

  setParams(url, query)

  const res = await fetch(url.href, options)

  const tokens = (await res.json()) as Props['fallback']['tokens']

  return {
    props: {
      address,
      fallback: {
        tokens,
      },
    },
  }
}
