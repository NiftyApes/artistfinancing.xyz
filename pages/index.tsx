import { paths } from '@reservoir0x/reservoir-sdk'
import Footer from 'components/Footer'
import Layout from 'components/Layout'
import TermsOfServiceModal from 'components/TermsOfServiceModal'
import setParams from 'lib/params'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import HomeCarousel from '../components/HomeCarousel'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import Link from 'next/link'
import { FeaturedArtworks, FeaturedArtists } from '../components/HomeFeatured'
import ListArtButton from '../components/ListArtButton'

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
    artist: 'AnjolaDave',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0x378598185034531cf9becdb82bbcba2a5fc2a903',
    image: 'https://i.seadn.io/gcs/files/946bc7327d7e91702cb43ae7ae67b354.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'A Message From Heaven',
    tokenId: '6'
  },
  {
    artist: 'AnjolaDave',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0x378598185034531cf9becdb82bbcba2a5fc2a903',
    image: 'https://i.seadn.io/gcs/files/946bc7327d7e91702cb43ae7ae67b354.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'A Message From Heaven',
    tokenId: '6'
  }
]
const CAROUSEL_TESTNET = [
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image: 'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image: 'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  }
]
const FEATURED = [
  {
    artist: 'AnjolaDave',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0x378598185034531cf9becdb82bbcba2a5fc2a903',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'A Message From Heaven',
    tokenId: '6'
  },
  {
    artist: 'AnjolaDave',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0x378598185034531cf9becdb82bbcba2a5fc2a903',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'A Message From Heaven',
    tokenId: '6'
  },
  {
    artist: 'AnjolaDave',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0x378598185034531cf9becdb82bbcba2a5fc2a903',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'A Message From Heaven',
    tokenId: '6'
  }
]
const FEATURED_TESTNET = [
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
  },
  {
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    contractAddress: '0xacec411dd36946bb5bec9900ef28bb58be7acbd4',
    image:
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
    rarity: '1/1',
    title: 'Breaker',
    tokenId: '275'
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

      {/* ------------------ MAIN SECTION ------------------ */}
      <div
        className='col-span-full px-4 mb-20 mt-[24px] items-center justify-center flex flex-col lg:flex-row lg:mt-20'>
        <div className='order-2 lg:order-1 lg:mr-[90px] max-w-[460px]'>
          <div className='mb-[24px] text-5xl lg:text-6xl text-white'>
            <div className='font-light'>What is</div>
            <div className='font-extrabold'>Artist Financing?</div>
          </div>

          <div className='text-2xl font-thin text-white'>
            Admirers <span className='text-gray-600'>become</span> collectors{' '}
            <span className='text-gray-600'>with</span> flexible
            <br /> payments options.
          </div>

          <div className='mt-10 flex'>
            <ListArtButton>
              <div className='flex flex-row rounded-full bg-white py-5 px-14 text-center uppercase text-black'>
                <span className='mt-0.2 text-lg'>list art</span>
                <div
                  className='mt-[2px] ml-[15px] flex h-[24px] w-[24px] items-center justify-center rounded-full border border-black'>
                  <AiOutlinePlus />
                </div>
              </div>
            </ListArtButton>

            <Link
              passHref
              href='https://niftyapes.readme.io/docs'
              target='_blank'
            >
              <div
                className='flex flex-row items-center rounded-full bg-black py-5 px-8 text-center uppercase text-white'>
                <span className='text-lg'>docs</span>
                <div
                  className="ml-[15px] h-[24px] w-[24px] rounded-full border border-white bg-[url('/icons/arrow-up-right.svg')] bg-center bg-no-repeat"></div>
              </div>
            </Link>
          </div>
        </div>

        <div className='order-1 lg:order-2 mb-[48px] lg:mb-0'>
          <HomeCarousel cards={CHAIN_ID === '1' ? CAROUSEL : CAROUSEL_TESTNET} />
        </div>
      </div>

      {/* ------------------ HOW FINANCING WORKS  ------------------ */}
      <div className='col-span-full mt-10 flex flex-col items-center justify-center'>

        <div className='text-5xl lg:text-6xl text-center w-[360px] md:w-auto'>How Artist Financing Works</div>
        <div className='mt-5 text-xl font-thin text-gray-600 text-center w-[270px] lg:w-auto'>
          Sell your art faster without compromising on your value
        </div>
      </div>

      {/* ------------------ FINANCING CARDS ------------------ */}
      <div className='col-span-full mt-10 flex flex-col px-[100px] lg:px-0 lg:items-center items-start justify-center overflow-x-auto'>

        <div className='inline-block mt-[60px] flex items-center'>

          <div
            className="h-[300px] w-[300px] rounded-[35px] border border-gray-700 bg-[url('/niftyapes/home_how_a.jpg')] bg-contain bg-center bg-no-repeat p-5"></div>
          <div className='flex w-[100px] justify-center text-gray-600'>
            <BsArrowRight />
          </div>
          <div
            className="h-[300px] w-[300px] rounded-[35px] border border-gray-700 bg-[url('/niftyapes/home_how_b.jpg')] bg-contain bg-center bg-no-repeat p-5"></div>
          <div className='flex w-[100px] justify-center text-gray-600'>
            <BsArrowRight />
          </div>
          <div
            className="h-[300px] w-[300px] rounded-[35px] border border-gray-700 bg-[url('/niftyapes/home_how_c.jpg')] bg-contain bg-center bg-no-repeat p-5"></div>
        </div>

        <div className='inline-block mt-[40px] flex text-center'>
          <div className='mr-[100px] w-[300px]'>
            <div className='text-xl uppercase'>artists</div>
            <div className='text-lg text-gray-600'>
              Create financing offers with two clicks and zero transaction
              costs.
            </div>
          </div>
          <div className='mr-[100px] w-[300px]'>
            <div className='text-xl uppercase'>collectors</div>
            <div className='text-lg text-gray-600'>
              Purchase art for a fraction of the sell price.
            </div>
          </div>
          <div className='w-[300px]'>
            <div className='text-xl uppercase'>trustless</div>
            <div className='text-lg text-gray-600'>
              Art NFTs are kept in escrow smart contracts until the final
              payments are made.
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-full mt-[90px] mb-[90px] w-full border-t border-gray-700'></div>

      {/* ------------------ EVERYONE BENEFITS ------------------ */}
      <div className='col-span-full mt-10 flex flex-col items-center justify-center'>
        <div className='text-5xl lg:text-6xl'>Everyone Benefits</div>

        <div className='mt-[60px] flex lg:flex-row flex-col items-center'>

          <div className='mr-0 mb-[32px] lg:mb-0 lg:mr-[32px] w-[320px] flex flex-col text-center lg:text-right'>
            <div className='text-4xl order-2 lg:order-1'>Artists</div>
            <div className='text-xl text-gray-600 order-1 lg:order-2'>
              Sell art faster, receive a steady monthly income stream
            </div>
          </div>

          <div className='flex h-[180px] w-[180px] flex-col items-center justify-center'>
            <div className='absolute w-0 h-[180px] lg:h-0 lg:w-[180px] border border-gray-700'></div>
            <div
              className="absolute h-[158px] w-[158px] rounded-full border border-gray-700 bg-black bg-[url('/niftyapes/home_heart.svg')] bg-center bg-no-repeat"></div>
          </div>

          <div className='ml-0 mt-[32px] mt-0 lg:ml-[32px] w-[320px] flex flex-col text-center lg:text-left'>
            <div className='text-4xl'>Collectors</div>
            <div className='text-xl text-gray-600'>
              Collect more art while spending less ETH up-front
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-full mt-[90px] mb-[90px] w-full border-t border-gray-700'></div>

      {/* ------------------ FEATURED ART ------------------ */}

      <div className='lg:px-0 px-[24px] flex flex-col col-span-full justify-center items-center mb-[90px]'>

        <div className='flex w-full max-w-[1095px]'>
          <div className='text-5xl lg:text-6xl'>Featured Art</div>
          <div className='ml-auto'>
            <Link href='/explore'>
              <div className='flex items-center uppercase text-white'>
                <span className='text-lg'>explore</span>
                <div
                  className="ml-[15px] h-[24px] w-[24px] rounded-full border border-white bg-[url('/icons/arrow-up-right.svg')] bg-center bg-no-repeat"></div>
              </div>
            </Link>
          </div>
        </div>

        <div className='mb-[48px] w-full max-w-[1095px]'>
          <FeaturedArtists cards={CHAIN_ID === '1' ? FEATURED : FEATURED_TESTNET} />
        </div>
        <div className='max-w-[1095px] min-w-[600px]'>
          <FeaturedArtworks cards={CHAIN_ID === '1' ? FEATURED : FEATURED_TESTNET} />
        </div>
      </div>

      {/* ------------------ GOERLI ------------------ */}

      <div className='col-span-full mt-[90px] mb-[90px] w-full'>
        <div className='ml-[30px] mr-[30px] flex items-center justify-center border border-gray-800'>

          <div className='lg:mr-[215px] lg:max-w-[565px] flex items-center justify-center py-[60px] px-[24px]'>
            <div>
              <div className='text-5xl lg:text-6xl'>Try it on Goerli</div>
              <div className='mt-[24px] mb-[48px] text-2xl text-gray-600'>
                Go to{' '}
                <span className='text-white underline'>
                  <Link href='https://sru.niftyapes.money' target='_blank'>
                    sru.niftyapes.money
                  </Link>
                </span>{' '}
                and switch your wallet network to Goerli
              </div>
              <Link passHref href='https://sru.niftyapes.money' target='_blank'>
                <div
                  className='flex flex-row items-center justify-center rounded-[10px] border border-gray-700 bg-black py-5 px-8'>
                  <span className='text-lg uppercase'>go to goerli</span>
                  <div
                    className="ml-[15px] h-[24px] w-[24px] rounded-full border border-white bg-[url('/icons/arrow-up-right.svg')] bg-center bg-no-repeat"></div>
                </div>
              </Link>
              <div className='mt-[24px] text-center text-lg text-gray-600'>
                Have questions? Reach out on{' '}
                <span className='text-white underline'>
                  <Link href='https://twitter.com/NiftyApes' target='_blank'>
                    Twitter
                  </Link>
                </span>{' '}
                or{' '}
                <span className='text-white underline'>
                  <Link
                    href='https://discord.com/invite/niftyapes'
                    target='_blank'
                  >
                    Discord
                  </Link>
                </span>
              </div>
            </div>
          </div>

          <div className='hidden lg:block'>
            <img
              className='mt-[-50px] mb-[-50px] w-[500px] min-w-[450px]'
              src='https://ipfs.pixura.io/ipfs/QmaYrjB5XrgHpVsCyLvsRN6kCKmyP6ZBbTvAM7aiK56p37/quantumania.jpg'
              alt='NFT Image'
            />
          </div>
        </div>
      </div>

      {/* ------------------ SDK ------------------ */}

      <div className='col-span-full mt-10 flex flex-col items-center justify-center'>
        <div
          className="col-span-full flex w-full flex-col items-center bg-[url('/niftyapes/home_holographic_bg.png')] bg-cover bg-no-repeat py-20 text-black">
          <div className='text-5xl lg:text-6xl mb-[24px] text-center'>Powered by NiftyApes</div>

          <div className='mb-[48px] lg:flex items-center text-center text-2xl'>
            <div className='underline lg:mb-0 mb-3'>Protocol Benefits</div>
            <div className='hidden lg:block ml-[15px] mr-[15px] h-[8px] w-[8px] rounded-full bg-black'></div>
            <div className='underline lg:mb-0 mb-3'>Artist Benefits</div>
            <div className='hidden lg:block ml-[15px] mr-[15px] h-[8px] w-[8px] rounded-full bg-black'></div>
            <div className='underline'>Buyer Benefits</div>
          </div>

          <ListArtButton>
            <div className='mb-[35px] flex flex-row rounded-[10px] bg-black py-[24px] px-[75px] uppercase text-white'>
              <span>list with financing</span>
              <div
                className='mt-[2px] ml-[15px] flex h-[24px] w-[24px] items-center justify-center rounded-full border border-white'>
                <AiOutlinePlus />
              </div>
            </div>
          </ListArtButton>

          <div className='flex uppercase'>
            <span>build with seller financing sdk</span>
            <div
              className="ml-[10px] h-[24px] w-[24px] rounded-full border border-gray-700 bg-[url('/icons/package-plus.svg')] bg-center bg-no-repeat"></div>
          </div>
        </div>
      </div>
      <TermsOfServiceModal />
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
