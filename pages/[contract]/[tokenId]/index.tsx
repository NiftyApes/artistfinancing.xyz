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
import { getSocialMediaPreviewTitle } from 'lib/getSocialMediaPreviewTitle'
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
      <meta property="twitter:title" content={getSocialMediaPreviewTitle()} />
      <meta property="og:title" content={getSocialMediaPreviewTitle()} />
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

  const contract = router.query?.contract?.toString()
  const tokenId = router.query?.tokenId?.toString()

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
      'https://ipfs.pixura.io/ipfs/QmeZHFoUU4yJGfBpYK3okR3YdC92yTXCvHqkMumF2sP5sh/qVbK-ko3jiQu8Iaxx8G0zZHy_n6it_1BNzhSEY__Ggc.avif',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/36112':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F36112%252F6d40e1ec-7668-477e-a217-e1e3368a7f29%252Furi%252Fimage-2023-08-10-22-39-ctd2j?ixlib=js-3.8.0&w=3000&fit=clip&q=100&auto=format&s=889dc9911c5aa069b31a46d2a8702e5b',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/42893':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F42893%252F9833e2bf-55b9-4798-a3d3-a2538ffc1a30%252Furi%252Fimage-2023-08-17-18-58-eeh8f?ixlib=js-3.8.0&w=3000&fit=clip&q=100&auto=format&s=d6acb09e13d06720e0f83a29a11c48eb',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45501':
      'https://ipfs.pixura.io/ipfs/QmWJGkDHPgXegySwAs4EcYtu2an5GxHDHPsEJrCWTCK6L7/20230717_013315.avif',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45488':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F45488%252F52bd63ba-d1e2-4f12-9cf2-95660f9421a6%252Furi%252Fimage-2023-08-17-18-40-exl01?ixlib=js-3.8.0&w=3000&fit=clip&q=100&auto=format&s=08c24413bbe57a221d327f04f8196601',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45641':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F45641%252F25eaf1fd-c754-474f-b77e-1b7d3b0a17c1%252Furi%252Fimage-2023-08-21-17-29-mfrq4?ixlib=js-3.8.0&w=3000&fit=clip&q=100&auto=format&s=440a13095736939f30679fbad1cc07e6',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45881':
      '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45881',
    '0x9cda2e752281edb225567e11ca4b49f45d0a9b20/3':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0x9cda2e752281edb225567e11ca4b49f45d0a9b20%252F3%252F516476f2-6d8a-405d-a5fa-e975bb14ada8%252Furi%252Fimage-2023-08-27-09-58-wta38?ixlib=js-3.8.0&h=3000&fit=clip&q=100&auto=format&s=f820a923bce88e895f4765d15ccc7ee3',
    '0x625582b27a5346eae862a4c6b199d16a2f0cfe4f/2':
      'https://i.seadn.io/gcs/files/a08d736ab96d6c3c2d2e16edf0a73b7c.jpg?w=500&auto=format',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/30581':
      'https://ipfs.pixura.io/ipfs/QmZDt6bP4WgwKCSXNtUbiAnEtkq2GqCyC6QH8wUCuDJvVM/335PolishedJealousy.avif',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/35698':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F35698%252Fae4f743b-980f-43e1-8200-8a7fd043da78%252Furi%252Fimage-2023-08-10-22-37-7mjru?ixlib=js-3.8.0&h=3000&fit=clip&q=100&auto=format&s=aefd90be198fe3f57c4c9f3c433f2b17',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/42721':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F42721%252Fcf840102-204a-41ed-af41-d4b78cf60275%252Furi%252Fimage-2023-08-17-18-52-ye1sg?ixlib=js-3.8.0&h=3000&fit=clip&q=100&auto=format&s=d83b57b33de301c6beab2b6a2a93d3c5',
    '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/45615':
      'https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0%252F45615%252F04e71365-27ca-4205-bbe9-3ff1b4da22f5%252Furi%252Fimage-2023-08-21-17-44-0kox6?ixlib=js-3.8.0&w=3000&fit=clip&q=100&auto=format&s=dbb83f933130850e69f2a89c548e7120',
    '0xb628ae89d192e0bd5f15fddabdd896dfbd42f226/5':
      'https://i.seadn.io/gcs/files/6bfc31c8988a03c15a8858a94ed4da87.jpg?w=500&auto=format',
  }

  const image = cachedImagesForSocialMediaUnfurl[`${contract}/${tokenId}`]
    ? cachedImagesForSocialMediaUnfurl[`${contract}/${tokenId}`]
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
            <TokenMedia srToken={srToken} token={token.token} />
          </div>
        </div>
      </div>

      <div className="relative col-span-full flex overflow-auto lg:col-span-4 lg:h-vh-minus-6rem lg:pr-12">
        <div className="grid w-full grid-flow-col gap-4 lg:w-auto">
          <div className="resize-none lg:col-span-3">
            <div className="reservoir-h3 mb-8 text-center font-semibold lg:!text-left">
              {token?.token?.name || `#${token?.token?.tokenId}`}
            </div>

            <div className="mb-16 flex items-start justify-center space-x-[100px] lg:!justify-start">
              {srToken?.erc721_token && (
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
                    {token?.token?.description}
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
