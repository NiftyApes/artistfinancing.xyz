import { useTokens, useUserTokens } from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import EthAccount from 'components/EthAccount'
import Layout from 'components/Layout'
import OfferSection from 'components/OfferSection'
import TokenInfo from 'components/token/TokenInfo'
import TokenAttributes from 'components/TokenAttributes'
import { useFinancingTicketImages } from 'hooks/useFinancingTicketImages'
import useSuperRareToken from 'hooks/useSuperRareToken'
import { optimizeImage } from 'lib/optmizeImage'
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
}

const Index: NextPage<Props> = ({ collectionId, tokenDetails }) => {
  const account = useAccount()
  const router = useRouter()

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
  console.log('srToken', srToken)

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
          <img
            alt={token?.token?.name || `#${token?.token?.tokenId}`}
            className="max-h-full object-cover lg:max-w-xl"
            src={optimizeImage(token?.token?.image, 533)}
          />
        </div>
      </div>

      <div className="relative col-span-full flex overflow-auto lg:col-span-4 lg:h-vh-minus-6rem lg:pr-12">
        <div className="grid w-full grid-flow-col gap-4 lg:w-auto">
          <div className="resize-none lg:col-span-3">
            <div className="reservoir-h3 mb-8 text-center font-semibold lg:!text-left">
              {token?.token?.name || `#${token?.token?.tokenId}`}
            </div>

            <div className="mb-16 flex items-start justify-center space-x-[100px] lg:!justify-start">
              <ConditionalWrapper
                condition={!!artistEns.name}
                wrapper={(children: ReactNode) => (
                  <a
                    href={`https://superrare.com/${artistEns.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {children}
                  </a>
                )}
              >
                <EthAccount
                  side="left"
                  label="Artist"
                  ens={artistEns}
                  address={
                    srToken?.erc721_token?.erc721_creator.address ||
                    token?.token?.owner
                  }
                />
              </ConditionalWrapper>
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
                  <div className="text-md flex text-gray-300">
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
