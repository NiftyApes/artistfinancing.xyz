import { useSellerFinancingContract } from '@niftyapes/sdk'
import { useUserTokens } from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import isEqualAddress from '../lib/isEqualAddress'
import LoadingCard from './LoadingCard'
import TokenCard from './TokenCard'

const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID

type Props = {
  fallback: {
    tokens: paths['/users/{user}/tokens/v6']['get']['responses']['200']['schema']
  }
  owner: string
}

const UserTokensGrid: FC<Props> = ({ fallback, owner }) => {
  const userTokensParams: Parameters<typeof useUserTokens>['1'] = {
    limit: 20,
    normalizeRoyalties: true,
  }
  if (COLLECTION_SET_ID) {
    userTokensParams.collectionsSetId = COLLECTION_SET_ID
  } else {
    if (COMMUNITY) userTokensParams.community = COMMUNITY
  }

  if (COLLECTION && (!COMMUNITY || !COLLECTION_SET_ID)) {
    userTokensParams.collection = COLLECTION
  }

  const { address: sellerFinancingContractAddress } =
    useSellerFinancingContract()
  const [showTicketLoanNFT, setShowTicketLoanNFT] = useState(false)

  const userTokens = useUserTokens(owner, userTokensParams, {
    fallbackData: [fallback.tokens],
    revalidateOnMount: false,
  })

  useEffect(() => {
    userTokens.mutate()
    return () => {
      userTokens.setSize(1)
    }
  }, [])

  const {
    data: tokens,
    isFetchingInitialData,
    isFetchingPage,
    hasNextPage,
    fetchNextPage,
    mutate,
  } = userTokens
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  if (tokens.length === 0 && !isFetchingPage) {
    return (
      <div className="grid justify-center text-xl font-semibold">No tokens</div>
    )
  }

  // Filter out loan tickets
  const filteredTokens = tokens.filter((tkn) => {
    if (!showTicketLoanNFT && tkn?.token?.contract) {
      return !isEqualAddress(
        tkn?.token?.contract.toLowerCase(),
        sellerFinancingContractAddress
      )
    } else {
      return true
    }
  })

  return (
    <div>
      <label className="mb-5 flex items-center space-x-3">
        <input
          type="checkbox"
          onClick={() => setShowTicketLoanNFT((prevState) => !prevState)}
          className="h-6 w-6 rounded-md border border-gray-300 checked:border-transparent focus:outline-none"
        ></input>
        <span className="font-medium text-gray-900">Show loan NFTs</span>
      </label>
      <div className="mx-auto mb-8 grid max-w-[2400px] gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {isFetchingInitialData ? (
          Array(10)
            .fill(null)
            .map((_, index) => <LoadingCard key={`loading-card-${index}`} />)
        ) : (
          <>
            {filteredTokens?.map((token) => {
              return (
                <TokenCard
                  token={{
                    token: {
                      contract: token?.token?.contract || '',
                      tokenId: token?.token?.tokenId || '',
                      owner,
                      ...token?.token,
                    },
                    market: {
                      floorAsk: { ...token?.ownership?.floorAsk },
                      topBid: { ...token?.token?.topBid },
                    },
                  }}
                  key={`${token?.token?.contract}${token?.token?.tokenId}`}
                  mutate={mutate}
                  collectionImage={token?.token?.collection?.imageUrl}
                  collection={token?.token?.collection}
                />
              )
            })}
          </>
        )}
        {isFetchingPage ? (
          Array(10)
            .fill(null)
            .map((_, index) => {
              if (index === 0) {
                return <LoadingCard key={`loading-card-${index}`} />
              }
              return <LoadingCard key={`loading-card-${index}`} />
            })
        ) : (
          <span ref={ref}></span>
        )}
      </div>
    </div>
  )
}

export default UserTokensGrid
