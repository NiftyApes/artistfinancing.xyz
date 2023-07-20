import { paths } from '@reservoir0x/reservoir-sdk'
import FeaturedFinancingOffers from 'components/FeaturedFinancingOffers'
import Footer from 'components/Footer'
import Layout from 'components/Layout'
import TermsOfServiceModal from 'components/TermsOfServiceModal'
import setParams from 'lib/params'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import HomeCarousel from '../components/HomeCarousel'
import { AiOutlineArrowRight, AiOutlinePlusCircle, AiOutlineUpCircle } from 'react-icons/ai'

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
    <meta name='description' content={description} />
  ),
  tagline: (tagline: string | undefined) => (
    <>{tagline || 'Discover, buy and sell NFTs'}</>
  ),
  image: (image?: string) => {
    if (image) {
      return (
        <>
          <meta name='twitter:image' content={image} />
          <meta name='og:image' content={image} />
        </>
      )
    }
    return null
  }
}

const CAROUSEL = [

  {
    artist: 'Tyler Hobbs',
    buyFinancingPrice: 23,
    buyNowPrice: 122,
    image: 'https://i.seadn.io/gcs/files/a3b27c1b14dcd4948b5e444cde1f3644.png?auto=format&dpr=1&w=1000',
    rarity: '1/1',
    title: 'Fidenza'
  },
  {
    artist: 'Gremplin',
    buyFinancingPrice: 0.5,
    buyNowPrice: 1.2,
    image: 'https://i.seadn.io/gcs/files/82b442194b45749ae1ec7d9572dd6431.png?auto=format&dpr=1&w=2048',
    rarity: '1/6900',
    title: 'Cryptoadz'
  },
  {
    artist: 'sdfd',
    buyFinancingPrice: 19,
    buyNowPrice: 142,
    image: 'https://i.seadn.io/gcs/files/e4f8c7574bf861c8e5e7d387d618d72e.png?auto=format&dpr=1&w=1000',
    rarity: '1/10000',
    title: 'CryptoPunks'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 22,
    buyNowPrice: 123,
    image: 'https://i.seadn.io/gcs/files/6ceed67665dad2b17d2bdf99d48055a4.png?auto=format&dpr=1&w=3840',
    rarity: '1/42',
    title: 'God is typing'
  }
]

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


      <div className='flex justify-center items-center col-span-full mt-20 mb-20 px-4'>

        <div>
          <div className='mb-4 text-4xl text-white'>
            <div className='font-[100]'>What is</div>
            <div className='font-semibold'>Artist Financing?</div>
          </div>

          <h3 className='text-white'>
            Admirers become collectors with flexible payments options.
          </h3>
          <div className='flex mt-10'>
            <div className='bg-white text-black text-center py-3 px-8 rounded-full uppercase flex flex-row'><span className="text-xs mt-0.5">list art</span><AiOutlinePlusCircle className="ml-2 mt-0.5"/></div>
            <div className='bg-black text-white text-center py-3 px-8 rounded-full uppercase flex flex-row'><span className="text-xs mt-0.5">docs</span><AiOutlineUpCircle className="ml-2 mt-0.5"/></div>
          </div>
        </div>

        <div className='ml-10'>
          <HomeCarousel cards={CAROUSEL} />
        </div>
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
      'x-api-key': RESERVOIR_API_KEY
    }
  }

  const url = new URL('/collections/v5', RESERVOIR_API_BASE)

  let query: paths['/collections/v5']['get']['parameters']['query'] = {
    limit: 20,
    sortBy: '1DayVolume',
    normalizeRoyalties: true
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
        collections
      }
    }
  }
}
