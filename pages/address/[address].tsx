import * as Tabs from '@radix-ui/react-tabs'
import { paths, setParams } from '@reservoir0x/reservoir-sdk'
import AccountWarning from 'components/AccountWarning'
import Layout from 'components/Layout'
import UserTokensGrid from 'components/UserTokensGrid'
import ManageListingsTable from 'components/tables/ManageListingsTable'
import SalesTable from 'components/tables/SalesTable'
import UpcomingPaymentsTable from 'components/tables/UpcomingPaymentsTable'
import useMounted from 'hooks/useMounted'
import { toggleOnItem } from 'lib/router'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
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

  let tabs = [{ name: 'Gallery', id: 'gallery' }]

  if (isOwner) {
    tabs = [
      { name: 'Gallery', id: 'gallery' },
      { name: 'Upcoming Payments', id: 'upcoming_payments' },
      { name: 'Manage Listings', id: 'manage_listings' },
      { name: 'Sales', id: 'sales' },
    ]
  }

  return (
    <>
      <AccountWarning id={address} />
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
                      'group reservoir-label-l relative min-w-0 shrink-0 whitespace-nowrap border-b-2 border-transparent py-4 px-8 text-center focus:z-10 radix-state-active:border-black radix-state-active:text-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:underline dark:radix-state-active:border-white dark:radix-state-active:text-white dark:radix-state-active:hover:no-underline'
                    }
                    onClick={() => toggleOnItem(router, 'tab', id)}
                  >
                    <span>{name}</span>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Tabs.Content value="gallery">
                <div className="mt-6 px-4">
                  <UserTokensGrid fallback={fallback} owner={address || ''} />
                </div>
              </Tabs.Content>
              {isOwner && (
                <Tabs.Content
                  value="upcoming_payments"
                  className="col-span-full"
                >
                  <UpcomingPaymentsTable />
                </Tabs.Content>
              )}
              {isOwner && (
                <Tabs.Content value="manage_listings" className="col-span-full">
                  <ManageListingsTable />
                </Tabs.Content>
              )}
              {isOwner && (
                <Tabs.Content value="sales" className="col-span-full">
                  <SalesTable />
                </Tabs.Content>
              )}
            </Tabs.Root>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
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
