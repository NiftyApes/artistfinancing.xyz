import { useOffers } from '@niftyapes/sdk'
import isEqualAddress from 'lib/niftyapes/isEqualAddress'
import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import { Collection } from 'types/reservoir'
import useTokens from '../hooks/useTokens'
import LoadingCard from './LoadingCard'
import { setToast } from './token/setToast'
import TokenCard from './TokenCard'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

type Props = {
  collectionId: string
  collection?: Collection
  tokens: ReturnType<typeof useTokens>['tokens']
  collectionImage: string | undefined
  viewRef: ReturnType<typeof useInView>['ref']
  isLoading: boolean
}

const TokensGrid: FC<Props> = ({
  collectionId,
  collection,
  tokens,
  viewRef,
  collectionImage,
  isLoading,
}) => {
  const { data, mutate } = tokens
  const didReachEnd = tokens.isFetchingInitialData || !tokens.hasNextPage
  const {
    data: offersData,
    error,
    isLoading: isLoadingOffers,
  } = useOffers({ collection: collectionId })

  if (!CHAIN_ID) return null

  if (error) {
    setToast({
      kind: 'error',
      message: 'Please retry by reloading this page.',
      title: 'Failed to load financing offers',
    })
  }

  return (
    <Masonry
      key="tokensGridMasonry"
      breakpointCols={{
        default: 4,
        1900: 4,
        1536: 4,
        1280: 3,
        1024: 2,
        768: 2,
        640: 2,
        500: 1,
      }}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {tokens.isFetchingInitialData || isLoading || isLoadingOffers
        ? Array(20)
            .fill(null)
            .map((_, index) => <LoadingCard key={`loading-card-${index}`} />)
        : data?.map((token) => {

            return (
              <TokenCard
                token={token}
                collection={collection}
                collectionImage={collectionImage}
                mutate={mutate}
                key={`${token?.token?.contract}:${token?.token?.tokenId}`}
              />
            )
          })}
      {!didReachEnd &&
        Array(10)
          .fill(null)
          .map((_, index) => {
            if (index === 0) {
              return (
                <LoadingCard viewRef={viewRef} key={`loading-card-${index}`} />
              )
            }
            return <LoadingCard key={`loading-card-${index}`} />
          })}
    </Masonry>
  )
}

export default TokensGrid
