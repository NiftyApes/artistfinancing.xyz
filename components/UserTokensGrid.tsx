import { FC, useEffect } from 'react'
import LoadingCard from './LoadingCard'
import { useTokens, useUserTokens } from '@reservoir0x/reservoir-kit-ui'
import { useInView } from 'react-intersection-observer'
import TokenCard from './TokenCard'
import { paths } from '@reservoir0x/reservoir-sdk'
import { useUnderlyingNFTOwner, useOffers } from '@niftyapes/sdk'

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

  const { data: offersData, isLoading: isLoadingOffers } = useOffers({})

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

  // TODO: We do not need to fetch underlying tokens since
  // the seller financing tickets contain the token metadata.
  //
  // const { ownedNftTokens } = useUnderlyingNFTOwner()
  //
  // const {
  //   data: entitledTokens,
  //   isFetchingPage: isFetchingPageTokens,
  //   isFetchingInitialData: isFetchingInitialDataTokens,
  // } = useTokens({
  //   tokens: ownedNftTokens,
  // })

  // const isLoadingTokens = isFetchingPageTokens || isFetchingInitialDataTokens

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

  return (
    <div className="mx-auto mb-8 grid max-w-[2400px] gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
      {isFetchingInitialData || isLoadingOffers ? (
        // {isFetchingInitialData || isLoadingTokens || isLoadingOffers ? (
        Array(10)
          .fill(null)
          .map((_, index) => <LoadingCard key={`loading-card-${index}`} />)
      ) : (
        <>
          {/* {entitledTokens?.map((token) => ( */}
          {/*   <TokenCard */}
          {/*     key={`${token?.token?.contract}${token?.token?.tokenId}`} */}
          {/*     token={token} */}
          {/*     collectionImage={undefined} */}
          {/*     mutate={mutate} */}
          {/*   /> */}
          {/* ))} */}
          {tokens?.map((token) => {
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
  )
}

export default UserTokensGrid
