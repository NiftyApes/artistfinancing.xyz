import { useTokens, useUserTokens } from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import EthAccount from 'components/EthAccount'
import Layout from 'components/Layout'
import OfferSection from 'components/OfferSection'
import TokenInfo from 'components/token/TokenInfo'
import TokenMedia from 'components/token/TokenMedia'
import TokenAttributes from 'components/TokenAttributes'
import { useFinancingTicketImages } from 'hooks/useFinancingTicketImages'
import useSuperRareToken from 'hooks/useSuperRareToken'
import setParams from 'lib/params'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import { TokenDetails } from 'types/reservoir'
import { useAccount } from 'wagmi'

// Environment variables

// For more information about these variables
// refer to the README.md file on this repository
// Reference: https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
// REQUIRED
const RESERVOIR_API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE
const RESERVOIR_API_KEY = process.env.NEXT_PUBLIC_RESERVOIR_API_KEY
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

// OPTIONAL
const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const META_OG_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE

const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID
const PROXY_API_BASE = process.env.NEXT_PUBLIC_PROXY_API_BASE

type Props = {
  collectionId: string
  tokenDetails?: TokenDetails
}

const metadata = {
  title: (title: string) => (
    <>
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />
    </>
  ),
  description: (description: string) => (
    <>
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="og:description" content={description} />
    </>
  ),
  image: (image: string) => (
    <>
      <meta name="twitter:image" content={image} key="twitter:image" />
      <meta property="og:image" content={image} key="og:image" />
    </>
  ),
}

const Index: NextPage<Props> = ({ collectionId, tokenDetails }) => {
  const account = useAccount()
  const router = useRouter()

  const contract = router.query?.contract?.toString()
  const tokenId = router.query?.tokenId?.toString()

  const isLaserLewDudeFocus =
    contract?.toLowerCase() ===
      '0x69618C8afB41123514216FD7d6A654950D167c90'.toLowerCase() &&
    tokenId?.toLowerCase() === '2'

  const tokenData = useTokens({
    tokens: [
      `${router.query?.contract?.toString()}:${router.query?.tokenId?.toString()}`,
    ],
    includeTopBid: true,
    includeAttributes: true,
    includeDynamicPricing: true,
  })

  const tokens = tokenData.data
  const token = tokens?.[0] || { token: tokenDetails }

  const checkUserOwnership = token.token?.kind === 'erc1155'
  const { data: userTokens } = useUserTokens(
    checkUserOwnership ? account.address : undefined,
    {
      tokens: [
        `${router.query?.contract?.toString()}:${router.query?.tokenId?.toString()}`,
      ],
    }
  )

  const { updateTokenImages } = useFinancingTicketImages()
  updateTokenImages([token])

  const { data: srToken } = useSuperRareToken(
    token.token?.contract!,
    token.token?.tokenId!
  )

  const artistEns = {
    name: srToken?.erc721_token?.erc721_creator.creator.username,
    avatar: srToken?.erc721_token?.erc721_creator.creator.avatar,
  }

  useEffect(() => {
    if (CHAIN_ID && (+CHAIN_ID === 1 || +CHAIN_ID === 5)) {
      const baseUrl =
        +CHAIN_ID === 1
          ? 'https://api.opensea.io'
          : 'https://testnets-api.opensea.io'
      fetch(
        `${baseUrl}/api/v1/asset/${collectionId}/${router.query?.tokenId?.toString()}/offers`
      ).then(async (data) => {
        const response = await data.json()
        fetch(`${PROXY_API_BASE}/seaport/offers`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(response),
        })
      })
    }
  }, [])

  if (tokenData.error) {
    return <div>There was an error</div>
  }

  const tokenName = `${token?.token?.name || `#${token?.token?.tokenId}`}`

  // META
  const title = META_TITLE
    ? metadata.title(`${tokenName} | ${META_TITLE}`)
    : metadata.title(`${tokenName}
    ${
      token?.token?.collection?.name
        ? ` - ${token?.token?.collection?.name}`
        : ''
    }`)

  const description = token?.token?.description
    ? metadata.description(token?.token?.description)
    : META_DESCRIPTION
    ? metadata.description(META_DESCRIPTION)
    : null

  const cachedImagesForSocialMediaUnfurl: any = {
    '0x34ac25afb4721cb85b4ff35713e5aa3d9e69432d/2':
      'https://social-media-previews.s3.us-west-2.amazonaws.com/0x34ac25afb4721cb85b4ff35713e5aa3d9e69432d-2.jpg',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45501':
      'https://social-media-previews.s3.us-west-2.amazonaws.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0-45501.jpg',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45881':
      'https://social-media-previews.s3.us-west-2.amazonaws.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0-45881.jpg',
    '0x9cda2e752281edb225567e11ca4b49f45d0a9b20/3':
      'https://social-media-previews.s3.us-west-2.amazonaws.com/0x9cda2e752281edb225567e11ca4b49f45d0a9b20-3.jpg',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/30581':
      'https://social-media-previews.s3.us-west-2.amazonaws.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0-30581.jpg',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45615':
      'https://social-media-previews.s3.us-west-2.amazonaws.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0-45615.jpg',
    '0xb628ae89d192e0bd5f15fddabdd896dfbd42f226/5':
      'https://social-media-previews.s3.us-west-2.amazonaws.com/0xb628ae89d192e0bd5f15fddabdd896dfbd42f226-5.jpg',
  }

  const image = cachedImagesForSocialMediaUnfurl[`${contract}/${tokenId}`]
    ? metadata.image(cachedImagesForSocialMediaUnfurl[`${contract}/${tokenId}`])
    : token?.token?.image
    ? metadata.image(token?.token?.image)
    : META_OG_IMAGE
    ? metadata.image(META_OG_IMAGE)
    : null

  const isOwner =
    userTokens &&
    userTokens[0] &&
    userTokens[0].ownership?.tokenCount &&
    +userTokens[0].ownership.tokenCount > 0
      ? true
      : token?.token?.owner?.toLowerCase() === account?.address?.toLowerCase()

  const ConditionalWrapper: React.FC<{
    condition: boolean
    wrapper: (children: ReactNode) => ReactElement
    children: ReactNode
  }> = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : <>{children}</>

  return (
    <Layout navbar={{}}>
      <Head>
        {title}
        {description}
        {image}
      </Head>
      <div className="col-span-full lg:col-span-8 lg:pr-12 3xl:col-span-12">
        <div className="flex items-center justify-center p-4 lg:h-vh-minus-6rem">
          <div className="max-h-full object-cover lg:max-w-[533px]">
            <TokenMedia
              srToken={srToken}
              token={token.token}
              isLaserLewDudeFocus={isLaserLewDudeFocus}
            />
          </div>
        </div>
      </div>

      <div className="relative col-span-full flex overflow-auto lg:col-span-4 lg:h-vh-minus-6rem lg:pr-12">
        <div className="grid w-full grid-flow-col gap-4 lg:w-auto">
          <div className="resize-none lg:col-span-3">
            <div className="reservoir-h3 mb-8 text-center font-semibold lg:!text-left">
              {isLaserLewDudeFocus
                ? 'Focus [Interactive + Focusable]'
                : token?.token?.name || `#${token?.token?.tokenId}`}
            </div>

            <div className="mb-16 flex items-start justify-center space-x-[100px] lg:!justify-start">
              {(isLaserLewDudeFocus || srToken?.erc721_token) && (
                <ConditionalWrapper
                  condition={isLaserLewDudeFocus || !!artistEns.name}
                  wrapper={(children: ReactNode) =>
                    isLaserLewDudeFocus ? (
                      <>{children}</>
                    ) : (
                      <a
                        href={`https://superrare.com/${artistEns.name}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {children}
                      </a>
                    )
                  }
                >
                  {isLaserLewDudeFocus ? (
                    <EthAccount
                      side="left"
                      label="Artist"
                      ens={{ name: 'laserlewdude.eth', avatar: null }}
                      address={'0xd526Ebc929877963eE14e984Fdb1d63B0FC2a096'}
                    />
                  ) : (
                    <EthAccount
                      side="left"
                      label="Artist"
                      ens={artistEns}
                      address={
                        srToken?.erc721_token?.erc721_creator.address ||
                        token?.token?.owner
                      }
                    />
                  )}
                </ConditionalWrapper>
              )}
              <EthAccount
                side="left"
                label="Owner"
                address={token?.token?.owner}
              />
            </div>

            <div className="flex items-center justify-center lg:!justify-start">
              <div className="w-[460px] lg:w-auto">
                <div className="mb-10">
                  <OfferSection token={token} isOwner={isOwner} />
                </div>

                <div className="mb-10">
                  <div className="reservoir-h3 mb-1 flex font-semibold">
                    Description
                  </div>
                  <div className="text-md flex whitespace-pre-line text-gray-300">
                    {isLaserLewDudeFocus
                      ? `A set of videos taken of a physical laser install inside of LaserLewDude's closet. The physical setup consists of lasers, glass and mirrors (setup details below). This piece has an selectable focal length that can be changed by clicking on the icon in the bottom right to reveal the focus menu.  Options are then Far / Mid / Near that will reload the piece with the corresponding focal length. 

Not a render.
This is an interactive video (x3), and it is encouraged to play with the video.
GO FULL SCREEN - after choosing the focus.

Setup details:
5 1-watt Laser Cubes were used to make the beams. 2 are making fans of magenta, 2 are beams of  white, the other is making the yellow fan of beams coming toward the camera.

Single Module Lasers (mix of homemade and commercial):
488nm (pretty blue) x2

All 1st-surface mirrors salvaged from rear-projection TVs.
Custom air-trap marbles by IG @liquidphoenixglass.
Other glass used: several different sizes of crystal glass spheres, some vases, K9 glass cubes / triangular prisms.

All mirrors are 1st surface mirrors salvaged from rear projections TVs. Not all from this build can be seen in these vids.`
                      : token?.token?.description}
                  </div>
                </div>

                <div className="mb-14">
                  <TokenInfo token={token.token} srToken={srToken} />
                </div>

                <div className="mb-10">
                  <TokenAttributes token={token?.token} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{
  collectionId: string
  communityId?: string
}> = async ({ params }) => {
  const contract = params?.contract?.toString()
  const tokenId = params?.tokenId?.toString()
  const collectionAddress = COLLECTION ? COLLECTION.split(':')[0] : COLLECTION

  if (
    collectionAddress &&
    !COMMUNITY &&
    !COLLECTION_SET_ID &&
    collectionAddress.toLowerCase() !== contract?.toLowerCase()
  ) {
    return {
      notFound: true,
      revalidate: 10,
    }
  }

  const options: RequestInit | undefined = {}

  if (RESERVOIR_API_KEY) {
    options.headers = {
      'x-api-key': RESERVOIR_API_KEY,
    }
  }

  const url = new URL('/tokens/v5', RESERVOIR_API_BASE)

  const query: paths['/tokens/v5']['get']['parameters']['query'] = {
    tokens: [`${contract}:${tokenId}`],
    includeTopBid: true,
    includeAttributes: true,
    includeDynamicPricing: true,
    normalizeRoyalties: true,
  }

  const href = setParams(url, query)

  const res = await fetch(href, options)

  const data =
    (await res.json()) as paths['/tokens/v5']['get']['responses']['200']['schema']

  const collectionId = data.tokens?.[0]?.token?.collection?.id

  if (!collectionId) {
    return {
      notFound: true,
      revalidate: 10,
    }
  }

  return {
    props: { collectionId, tokenDetails: data?.tokens?.[0]?.token },
  }
}
