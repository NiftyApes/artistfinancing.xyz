import {
  useCollections,
  useTokenOpenseaBanned,
  useTokens,
  useUserTokens,
} from '@reservoir0x/reservoir-kit-ui'
import Layout from 'components/Layout'
import FinancingSection from 'components/niftyapes/FinancingSection'
import TokenInfo from 'components/token/TokenInfo'
import TokenMedia from 'components/token/TokenMedia'
import TokenAttributes from 'components/TokenAttributes'
import { useNiftyApesImages } from 'hooks/niftyapes/useNiftyApesImages'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TokenDetails } from 'types/reservoir'
import { useAccount } from 'wagmi'
import EthAccount from '../../../components/niftyapes/EthAccount'
import Footer from '../../../components/Footer'

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
  const [tokenOpenSea] = useState<any>({
    animation_url: null,
    extension: null,
  })
  const account = useAccount()
  const router = useRouter()
  const bannedOnOpenSea = useTokenOpenseaBanned(
    collectionId,
    router.query?.tokenId?.toString() || ''
  )

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

      <div className="col-span-full col-start-1 px-2 pt-4 md:col-span-full lg:col-span-7 lg:col-start-2 xl:col-span-7 xl:col-start-2 2xl:col-span-7 2xl:col-start-2 3xl:col-start-4">
        <div className="mb-14">
          <TokenMedia token={token?.token} />
        </div>

        <div className="block lg:hidden">
          <div className="reservoir-h3 mb-8 font-semibold">
            {token?.token?.name || `#${token?.token?.tokenId}`}
          </div>
          <div className="mb-8 grid grid-flow-col grid-rows-1">
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

      <div className="col-span-full mb-4 hidden space-y-4 px-2 pt-2 md:col-span-3 md:col-start-8 lg:col-start-9 lg:block 2xl:col-start-9 3xl:col-start-11">
        <div className="reservoir-h3 mb-8 font-semibold">
          {token?.token?.name || `#${token?.token?.tokenId}`}
        </div>
        <div className="mb-8 grid grid-flow-col grid-rows-1">
          <EthAccount
            side="left"
            label="Artist"
            address={token?.token?.owner}
          />
          <EthAccount side="left" label="Owner" address={token?.token?.owner} />
        </div>
        <FinancingSection
          token={token}
          collection={collection}
          isOwner={isOwner}
        />
      </div>
      <Footer />
    </Layout>
  )
}

export default Index
