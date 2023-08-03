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
import { useAccount } from 'wagmi'
import HomeGrid from '../components/HomeGrid'

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
    artist: 'XCopy',
    buyFinancingPrice: 70,
    buyNowPrice: 350,
    image:
      'https://ipfs.pixura.io/ipfs/Qmea9LPon6MkNMEmS3e2ig3LoTja92duWFpaWGvGZ5JaWe/breaker.jpg',
    rarity: '1/1',
    title: 'Breaker'
  },
  {
    artist: 'Miss AL Simpson',
    buyFinancingPrice: 4.12,
    buyNowPrice: 20.6,
    image:
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F5136%252Fk7lqfl?ixlib=js-3.8.0&w=550&h=550&fit=crop&q=75&auto=format%2Ccompress&s=81a357466eb6a7148f462b431d0349a0',
    rarity: '1/1',
    title: 'HAUNTED BRICKS'
  },
  {
    artist: 'Yigit Yerlikaya',
    buyFinancingPrice: 0.58,
    buyNowPrice: 2.9,
    image:
      'https://ipfs.pixura.io/ipfs/QmaYrjB5XrgHpVsCyLvsRN6kCKmyP6ZBbTvAM7aiK56p37/quantumania.jpg',
    rarity: '1/1',
    title: 'Quantumania'
  }
]

const FEATURED = [
  {
    artist: 'Miss AL Simpson',
    buyFinancingPrice: 4.12,
    buyNowPrice: 20.6,
    image:
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x816445f9a8359ef8405e79ad6041584a9e157d36%252F4%252F2bbf5a60-54a8-464a-8706-0fa0a6ec90d8%252Furi%252Fimage-2023-08-02-15-02-u89kmk?ixlib=js-3.8.0&h=3000&fit=clip&q=100&auto=format&s=48abab3f11655d893a43d2f960a9a6fb',
    rarity: '1/1',
    title: 'HAUNTED BRICKS'
  },
  {
    artist: 'Miss AL Simpson',
    buyFinancingPrice: 4.12,
    buyNowPrice: 20.6,
    image:
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x8a1521398214a61bef23e0a2f2909a6a152f9341%252F182%252F7da39fb1-a2ec-40b6-8c78-2dda40e3bcc7%252Furi%252Fimage-2023-08-02-10-56-vrycn?ixlib=js-3.8.0&w=3000&fit=clip&q=100&auto=format&s=eeb1097733881fd47ffb75bd9d966453',
    rarity: '1/1',
    title: 'HAUNTED BRICKS'
  },
  {
    artist: 'Miss AL Simpson',
    buyFinancingPrice: 4.12,
    buyNowPrice: 20.6,
    image:
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F45620%252F9f5cf41c-6869-40c9-b286-acf042bac3d5%252Furi%252Fimage-2023-07-27-00-44-xfyag?ixlib=js-3.8.0&w=1080&fit=clip&q=100&auto=format&s=bbe92020ff2c95e50409189908f3c10a',
    rarity: '1/1',
    title: 'HAUNTED BRICKS'
  },
  {
    artist: 'Miss AL Simpson',
    buyFinancingPrice: 4.12,
    buyNowPrice: 20.6,
    image:
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x8ab2798533803da9563bcd716e868c33cc323609%252F4%252Fc89ca6f4-cd75-4025-8a72-e315f558c35b%252Furi%252Fimage-2023-08-02-17-12-1ln7t?ixlib=js-3.8.0&w=550&h=550&fit=crop&q=75&auto=format%2Ccompress&s=fc17a92c78ca07bf8aab2fd2eb86f440',
    rarity: '1/1',
    title: 'HAUNTED BRICKS'
  }, {
    artist: 'Miss AL Simpson',
    buyFinancingPrice: 4.12,
    buyNowPrice: 20.6,
    image:
      'https://ipfs.pixura.io/ipfs/QmWF8CamCB9Ar5i8F5J7qQGa8PVF281PBo1FUgNHHHtgBY/THETHINKER.JPG',
    rarity: '1/1',
    title: 'HAUNTED BRICKS'
  }
]

const Home: NextPage<Props> = ({ fallback }) => {
  const router = useRouter()

  const { address, isConnected } = useAccount()

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

      <div className='col-span-full mt-20 mb-20 flex items-center justify-center px-4'>
        <div className='mr-[90px]'>
          <div className='mb-[24px] text-6xl text-white'>
            <div className='font-light'>What is</div>
            <div className='font-extrabold'>Artist Financing?</div>
          </div>

          <div className='text-2xl font-thin text-white'>
            Admirers <span className='text-gray-600'>become</span> collectors{' '}
            <span className='text-gray-600'>with</span> flexible
            <br /> payments options.
          </div>

          <div className='mt-10 flex'>
            <Link
              href={
                isConnected
                  ? `address/${address}?tab=gallery`
                  : 'IMPLMENT WALLET CONNECT'
              }
            >
              <div className='flex flex-row rounded-full bg-white py-5 px-14 text-center uppercase text-black'>
                <span className='mt-0.2 text-lg'>list art</span>
                <div
                  className='mt-[2px] ml-[15px] flex h-[24px] w-[24px] items-center justify-center rounded-full border border-black'>
                  <AiOutlinePlus />
                </div>
              </div>
            </Link>
            <Link href='https://niftyapes.readme.io/docs' target='_blank'>
              <div
                className='flex flex-row items-center rounded-full bg-black py-5 px-8 text-center uppercase text-white'>
                <span className='text-lg'>docs</span>
                <div
                  className="ml-[15px] h-[24px] w-[24px] rounded-full border border-white bg-[url('/icons/arrow-up-right.svg')] bg-center bg-no-repeat"></div>
              </div>
            </Link>
          </div>
        </div>

        <TermsOfServiceModal />

        <HomeCarousel cards={CAROUSEL} />
      </div>
      <div className='col-span-full mt-10 flex flex-col items-center justify-center'>
        <div className='text-5xl'>How Artist Financing Works</div>
        <div className='mt-5 text-xl font-thin text-gray-600'>
          Sell your art faster without compromising on your value
        </div>

        <div className='mt-[60px] flex items-center'>
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

        <div className='mt-[40px] flex text-center'>
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

        <div className='col-span-full mt-[90px] mb-[90px] w-full border-t border-gray-700'></div>
        <div className='text-6xl'>Everyone Benefits</div>

        <div className='mt-[60px] flex items-center'>
          <div className='mr-[32px] w-[320px] text-right'>
            <div className='text-4xl'>Artists</div>
            <div className='text-xl text-gray-600'>
              Sell art faster, receive a steady monthly income stream
            </div>
          </div>
          <div className='flex h-[180px] w-[180px] flex-col items-center justify-center'>
            <div className='absolute w-[180px] border border-gray-700'></div>
            <div
              className="absolute h-[158px] w-[158px] rounded-full border border-gray-700 bg-black bg-[url('/niftyapes/home_heart.svg')] bg-center bg-no-repeat"></div>
          </div>
          <div className='ml-[32px] w-[320px] text-left'>
            <div className='text-4xl '>Collectors</div>
            <div className='text-xl text-gray-600'>
              Collect more art while spending less ETH up-front
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ FEATURED ART ------------------ */}

      <div className='col-span-full mt-[90px] mb-[90px] w-full border-t border-gray-700'></div>

      <div className='flex col-span-full w-full items-center justify-center mb-[90px]'>
        <div className='col-span-full max-w-[1095px]'>

          <div className='flex px-[30px] mb-[48px]'>
            <div>
              <div className='text-4xl'>Featured Art</div>
              <div className='text-gray-600 flex items-center mt-[24px]'>
                <div>@xcopy</div>
                <div className='ml-[15px] mr-[15px] h-[6px] w-[6px] rounded-full bg-gray-700'></div>
                <div>@tylerxhobbs</div>
                <div className='ml-[15px] mr-[15px] h-[6px] w-[6px] rounded-full bg-gray-700'></div>
                <div>@dmitricherniak</div>
                <div className='ml-[15px] mr-[15px] h-[6px] w-[6px] rounded-full bg-gray-700'></div>
                <div>@gremplin</div>
                <div className='ml-[15px] mr-[15px] h-[6px] w-[6px] rounded-full bg-gray-700'></div>
                <div>@xboddy</div>
              </div>
            </div>
            <div className='ml-auto'>
              <Link href='https://niftyapes.readme.io/docs' target='_blank'>
                <div
                  className='flex items-center uppercase text-white'>
                  <span className='text-lg'>explore</span>
                  <div
                    className="ml-[15px] h-[24px] w-[24px] rounded-full border border-white bg-[url('/icons/arrow-up-right.svg')] bg-center bg-no-repeat"></div>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <div className='grid grid-cols-4 w-full space-x-[24px] items-end'>
              <div className="relative group">
                <div className='absolute z-50 bg-white py-[14px] px-[18px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                  <div className='mb-3'>
                    <span className='text-sm text-gray-500 mr-2'>xcopy</span>
                    <span className='text-base text-black'>artwork</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <div className='text-black text-xs'>243 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>price</div>
                    </div>
                    <div className='border-t border-r border-gray-200 ml-5 mr-5'></div>
                    <div>
                      <div className='text-black text-xs'>22 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>
                        buy with financing
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))' }} className='w-full h-full absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                </div>
                <img
                  src='https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x8a1521398214a61bef23e0a2f2909a6a152f9341%252F182%252F7da39fb1-a2ec-40b6-8c78-2dda40e3bcc7%252Furi%252Fimage-2023-08-02-10-56-vrycn?ixlib=js-3.8.0&w=3000&fit=clip&q=100&auto=format&s=eeb1097733881fd47ffb75bd9d966453' />
              </div>
              <div className="relative group">
                <div className='absolute z-50 bg-white py-[14px] px-[18px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                  <div className='mb-3'>
                    <span className='text-sm text-gray-500 mr-2'>xcopy</span>
                    <span className='text-base text-black'>artwork</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <div className='text-black text-xs'>243 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>price</div>
                    </div>
                    <div className='border-t border-r border-gray-200 ml-5 mr-5'></div>
                    <div>
                      <div className='text-black text-xs'>22 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>
                        buy with financing
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))' }} className='w-full h-full absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                </div>
                <img
                  src='https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F45620%252F9f5cf41c-6869-40c9-b286-acf042bac3d5%252Furi%252Fimage-2023-07-27-00-44-xfyag?ixlib=js-3.8.0&w=1080&fit=clip&q=100&auto=format&s=bbe92020ff2c95e50409189908f3c10a' />
              </div>
              <div className="relative group">
                <div className='absolute z-50 bg-white py-[14px] px-[18px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                  <div className='mb-3'>
                    <span className='text-sm text-gray-500 mr-2'>xcopy</span>
                    <span className='text-base text-black'>artwork</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <div className='text-black text-xs'>243 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>price</div>
                    </div>
                    <div className='border-t border-r border-gray-200 ml-5 mr-5'></div>
                    <div>
                      <div className='text-black text-xs'>22 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>
                        buy with financing
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))' }} className='w-full h-full absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                </div>
                <img
                  src='https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x72017a15cc866c82a7a3b4f147bca625a2e0a4ce%252F114%252Fdb1a8717-b4d9-4185-8ecf-0f08b5665c56%252Furi%252Fimage-2023-07-31-17-42-nzsi3?ixlib=js-3.8.0&h=1080&fit=clip&q=100&auto=format&s=7f84f0db8e1b40edb8228a011dbd2e30' />
              </div>
              <div className="relative group">
                <div className='absolute z-50 bg-white py-[14px] px-[18px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                  <div className='mb-3'>
                    <span className='text-sm text-gray-500 mr-2'>xcopy</span>
                    <span className='text-base text-black'>artwork</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <div className='text-black text-xs'>243 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>price</div>
                    </div>
                    <div className='border-t border-r border-gray-200 ml-5 mr-5'></div>
                    <div>
                      <div className='text-black text-xs'>22 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>
                        buy with financing
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))' }} className='w-full h-full absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                </div>
                <img
                  src='https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x8a1521398214a61bef23e0a2f2909a6a152f9341%252F114%252F9287e8b8-8d73-460d-b474-b32d9d6387ca%252Furi%252Fimage-2023-07-22-10-29-yyi4n?ixlib=js-3.8.0&w=1080&fit=clip&q=100&auto=format&s=938d5497f0fbf121786fc992b92dd562' />
              </div>
            </div>
            <div className='grid grid-cols-3 w-full mt-[24px] space-x-[24px] items-start'>
              <div className="relative group">
                <div className='absolute z-50 bg-white py-[14px] px-[18px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                  <div className='mb-3'>
                    <span className='text-sm text-gray-500 mr-2'>xcopy</span>
                    <span className='text-base text-black'>artwork</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <div className='text-black text-xs'>243 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>price</div>
                    </div>
                    <div className='border-t border-r border-gray-200 ml-5 mr-5'></div>
                    <div>
                      <div className='text-black text-xs'>22 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>
                        buy with financing
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))' }} className='w-full h-full absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                </div>
                <img
                src='https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x595f7f5170c16fa9812f5d067e2818cfa9042bc1%252F1%252F4409210f-a365-4a56-b2ba-46a3cbe3752e%252Furi%252Fimage-2023-08-01-11-43-l3kfr?ixlib=js-3.8.0&w=1080&fit=clip&q=100&auto=format&s=ee970a0483ce5abd4d2538609bfc499a' />
              </div>
              <div className="relative group">
                <div className='absolute z-50 bg-white py-[14px] px-[18px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                  <div className='mb-3'>
                    <span className='text-sm text-gray-500 mr-2'>xcopy</span>
                    <span className='text-base text-black'>artwork</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <div className='text-black text-xs'>243 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>price</div>
                    </div>
                    <div className='border-t border-r border-gray-200 ml-5 mr-5'></div>
                    <div>
                      <div className='text-black text-xs'>22 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>
                        buy with financing
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))' }} className='w-full h-full absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                </div>
                <img
                src='https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x96bd48df606c8a241c263c72d57244272d079b38%252F30%252F8364950b-68bf-45c6-bdb8-e6453fa18136%252Furi%252Fimage-2023-07-28-14-13-q2iv3?ixlib=js-3.8.0&w=1080&fit=clip&q=100&auto=format&s=bd8ac9fad1a6153fa2dbdf16609f0f76' />
              </div>
              <div className="relative group">
                <div className='absolute z-50 bg-white py-[14px] px-[18px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                  <div className='mb-3'>
                    <span className='text-sm text-gray-500 mr-2'>xcopy</span>
                    <span className='text-base text-black'>artwork</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <div className='text-black text-xs'>243 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>price</div>
                    </div>
                    <div className='border-t border-r border-gray-200 ml-5 mr-5'></div>
                    <div>
                      <div className='text-black text-xs'>22 ETH</div>
                      <div className='text-[10px] uppercase text-gray-500'>
                        buy with financing
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.75))' }} className='w-full h-full absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                </div>
                <img
                src='https://ipfs.pixura.io/ipfs/QmWF8CamCB9Ar5i8F5J7qQGa8PVF281PBo1FUgNHHHtgBY/THETHINKER.JPG' />
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* ------------------ GOERLI ------------------ */}

      <div className='col-span-full mt-[90px] mb-[90px] w-full'>
        <div className='ml-[30px] mr-[30px] flex items-center justify-center border border-gray-800'>
          <div className='mr-[215px] flex max-w-[565px] items-center justify-center py-[60px]'>
            <div>
              <div className='text-6xl'>Try it on Goerli</div>
              <div className='mt-[24px] mb-[48px] text-2xl text-gray-600'>
                Go to{' '}
                <span className='text-white underline'>
                    <Link href='https://goerli.niftyapes.money' target='_blank'>
                      goerli.niftyapes.money
                    </Link>
                  </span>{' '}
                and switch your wallet network to Goerli
              </div>
              <Link href='https://goerli.niftyapes.money' target='_blank'>
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

          <div>
            <img
              className='mt-[-50px] mb-[-50px] w-[500px] min-w-[450px]'
              src='https://ipfs.pixura.io/ipfs/QmaYrjB5XrgHpVsCyLvsRN6kCKmyP6ZBbTvAM7aiK56p37/quantumania.jpg'
            />
          </div>
        </div>
      </div>

      {/* ------------------ SDK ------------------ */}

      <div className='col-span-full mt-10 flex flex-col items-center justify-center'>
        <div
          className="col-span-full flex w-full flex-col items-center bg-[url('/niftyapes/home_holographic_bg.png')] bg-cover bg-no-repeat py-20 text-black">
          <div className='mb-[24px] text-6xl'>Powered by NiftyApes</div>

          <div className='mb-[48px] flex items-center text-2xl'>
            <div className='underline'>Protocol Benefits</div>
            <div className='ml-[15px] mr-[15px] h-[8px] w-[8px] rounded-full bg-black'></div>
            <div className='underline'>Artist Benefits</div>
            <div className='ml-[15px] mr-[15px] h-[8px] w-[8px] rounded-full bg-black'></div>
            <div className='underline'>Buyer Benefits</div>
          </div>

          <Link
            href={
              isConnected
                ? `address/${address}?tab=gallery`
                : 'IMPLEMENT WALLET CONNECT'
            }
          >
            <div className='mb-[35px] flex flex-row rounded-[10px] bg-black py-[24px] px-[75px] uppercase text-white'>
              <span>list with financing</span>
              <div
                className='mt-[2px] ml-[15px] flex h-[24px] w-[24px] items-center justify-center rounded-full border border-white'>
                <AiOutlinePlus />
              </div>
            </div>
          </Link>

          <div className='flex uppercase'>
            <span>build with seller financing sdk</span>
            <div
              className="ml-[10px] h-[24px] w-[24px] rounded-full border border-gray-700 bg-[url('/icons/package-plus.svg')] bg-center bg-no-repeat"></div>
          </div>
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
