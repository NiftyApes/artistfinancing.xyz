import {
  useCollections,
  useTokens,
  useUserTokens,
} from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import Layout from 'components/Layout'
import EthAccount from 'components/niftyapes/EthAccount'
import OfferSection from 'components/OfferSection'
import TokenInfo from 'components/token/TokenInfo'
import TokenAttributes from 'components/TokenAttributes'
import { useNiftyApesContract } from 'hooks/niftyapes/useNiftyApesContract'
import { useNiftyApesImages } from 'hooks/niftyapes/useNiftyApesImages'
import { optimizeImage } from 'lib/optmizeImage'
import setParams from 'lib/params'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
      <meta property="twitter:title" content={title} />
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
      <meta name="twitter:image" content={image} />
      <meta property="og:image" content={image} />
    </>
  ),
  tagline: (tagline: string | undefined) => (
    <>{tagline || 'Discover, buy and sell NFTs'}</>
  ),
}

const Index: NextPage<Props> = ({ collectionId, tokenDetails }) => {
  const account = useAccount()
  const router = useRouter()

  const { address: sellerFinancingContract } = useNiftyApesContract()
  const { addNiftyApesTokenImages, addNiftyApesCollectionImage } =
    useNiftyApesImages()
  const collectionResponse = useCollections({ id: collectionId })
  const collection =
    collectionResponse.data && collectionResponse.data[0]
      ? collectionResponse.data[0]
      : undefined
  addNiftyApesCollectionImage(collection)

  const tokenData = useTokens({
    tokens: [
      `${router.query?.contract?.toString()}:${router.query?.tokenId?.toString()}`,
    ],
    includeTopBid: true,
    includeAttributes: true,
    includeDynamicPricing: true,
  })

  const tokens = tokenData.data
  addNiftyApesTokenImages(tokens)
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
    ? metadata.title(`${tokenName} - ${META_TITLE}`)
    : metadata.title(`${tokenName} - 
    ${token?.token?.collection?.name}`)

  const description = META_DESCRIPTION
    ? metadata.description(META_DESCRIPTION)
    : token?.token?.description
    ? metadata.description(token?.token?.description)
    : null

  const image = META_OG_IMAGE
    ? metadata.image(META_OG_IMAGE)
    : token?.token?.image
    ? metadata.image(token?.token?.image)
    : null

  const isOwner =
    userTokens &&
    userTokens[0] &&
    userTokens[0].ownership?.tokenCount &&
    +userTokens[0].ownership.tokenCount > 0
      ? true
      : token?.token?.owner?.toLowerCase() === account?.address?.toLowerCase()

  return (
    <Layout navbar={{}}>
      <Head>
        {title}
        {description}
        {image}
      </Head>
      <div className="col-span-full lg:col-span-8 lg:pr-12 3xl:col-span-12">
        <div className="flex items-center justify-center p-4 lg:h-vh-minus-6rem">
          <img
            alt={token?.token?.name || `#${token?.token?.tokenId}`}
            className="lg:max-h-xl object-cover lg:max-w-xl"
            src={optimizeImage(token?.token?.image, 533)}
          />
        </div>
      </div>

      <div className="relative col-span-full flex overflow-auto lg:col-span-4 lg:h-vh-minus-6rem lg:pr-12">
        <div className="grid w-full grid-flow-col gap-4 text-center lg:w-auto lg:text-left">
          <div className="resize-none lg:col-span-3">
            <div className="reservoir-h3 mb-8 font-semibold">
              {token?.token?.name || `#${token?.token?.tokenId}`}
            </div>

            <div className="grid-col-2 mb-8 grid grid-flow-col">
              <EthAccount
                side="left"
                label="Artist"
                address={token?.token?.owner}
              />
              <EthAccount
                side="left"
                label="Owner"
                address={token?.token?.owner}
              />
            </div>

            <div className="mb-10">
              <OfferSection token={token} isOwner={isOwner} />
            </div>

            <div className="mb-14">
              <div className="reservoir-h3 mb-1 font-semibold">Description</div>
              <div className="text-md text-gray-300">
                {token?.token?.description}
              </div>
            </div>

            <div className="mb-14">
              <TokenInfo token={token.token} />
            </div>

            <div className="mb-10">
              <TokenAttributes token={token?.token} />
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
