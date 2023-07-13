import { Link } from '@chakra-ui/react'
import { paths } from '@reservoir0x/reservoir-sdk'
import Footer from 'components/Footer'
import Layout from 'components/Layout'
import FeaturedFinancingOffers from 'components/FeaturedFinancingOffers'
import GlobalModal from 'components/niftyapes/GlobalModal'
import setParams from 'lib/params'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Environment variables
// For more information about these variables
// refer to the README.md file on this repository
// Reference: https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
// REQUIRED
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const RESERVOIR_API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE

// OPTIONAL
const RESERVOIR_API_KEY = process.env.NEXT_PUBLIC_RESERVOIR_API_KEY
const REDIRECT_HOMEPAGE = process.env.NEXT_PUBLIC_REDIRECT_HOMEPAGE
const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const META_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE
const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID

type Props = InferGetStaticPropsType<typeof getStaticProps>

const metadata = {
  title: (title: string) => <title>{title}</title>,
  description: (description: string) => (
    <meta name="description" content={description} />
  ),
  tagline: (tagline: string | undefined) => (
    <>{tagline || 'Discover, buy and sell NFTs'}</>
  ),
  image: (image?: string) => {
    if (image) {
      return (
        <>
          <meta name="twitter:image" content={image} />
          <meta name="og:image" content={image} />
        </>
      )
    }
    return null
  },
}

const Home: NextPage<Props> = ({ fallback }) => {
  const router = useRouter()

  const title = META_TITLE && metadata.title(META_TITLE)
  const description = META_DESCRIPTION && metadata.description(META_DESCRIPTION)
  const image = metadata.image(META_IMAGE)

  useEffect(() => {
    if (REDIRECT_HOMEPAGE && COLLECTION) {
      router.push(`/collections/${COLLECTION}`)
    }
  }, [COLLECTION, REDIRECT_HOMEPAGE])

  // Return error page if the API base url or the environment's
  // chain ID are missing
  if (!CHAIN_ID) {
    console.debug({ CHAIN_ID })
    return <div>There was an error</div>
  }

  if (REDIRECT_HOMEPAGE && COLLECTION) return null

  return (
    <Layout navbar={{}}>
      <Head>
        {title}
        {description}
        {image}
      </Head>
      <header className="col-span-full mt-20 mb-20 px-4">
        <h1 className="mb-4 text-center text-4xl font-semibold text-white">
          Buy <span className="font-light">with</span> Financing
        </h1>
        <h3 className="text-center text-white">
          Collect art <span className="text-gray-500">with</span> flexible
          payment options
        </h3>
      </header>
      <GlobalModal
        storageKey="TOS_marketplace"
        actionText="Accept"
        title="Terms of Services"
        description={
          <div>
            Your use of the NiftyApes App is expressly conditioned on your
            acceptance of NiftyApes’
            <Link
              color="purple.400"
              target="_blank"
              href="https://blog.niftyapes.money/legal-privacy-tos/"
            >
              &nbsp;Terms of Service&nbsp;
            </Link>
            and
            <Link
              color="purple.400"
              target="_blank"
              href="https://blog.niftyapes.money/legal-privacy-tos/"
            >
              &nbsp;Privacy Policy&nbsp;
            </Link>
            . By clicking accept and close, you indicate that you have read and
            agree to the NiftyApes Terms of Service and Privacy Policy, and that
            you consent to collection, storage and use of your personal
            information for the purposes set forth in the Privacy Policy.
          </div>
        }
      />
      <div className="col-span-full px-6 md:px-16">
        <FeaturedFinancingOffers />
      </div>
      <Footer />
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{
  fallback: {
    collections: paths['/collections/v5']['get']['responses']['200']['schema']
  }
}> = async () => {
  const options: RequestInit | undefined = {}

  if (RESERVOIR_API_KEY) {
    options.headers = {
      'x-api-key': RESERVOIR_API_KEY,
    }
  }

  const url = new URL('/collections/v5', RESERVOIR_API_BASE)

  let query: paths['/collections/v5']['get']['parameters']['query'] = {
    limit: 20,
    sortBy: '1DayVolume',
    normalizeRoyalties: true,
  }

  if (COLLECTION && !COMMUNITY) query.contract = [COLLECTION]
  if (COMMUNITY) query.community = COMMUNITY
  if (COLLECTION_SET_ID) query.collectionsSetId = COLLECTION_SET_ID

  const href = setParams(url, query)
  const res = await fetch(href, options)

  const collections = (await res.json()) as Props['fallback']['collections']

  return {
    props: {
      fallback: {
        collections,
      },
    },
  }
}
