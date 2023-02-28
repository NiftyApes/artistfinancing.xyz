import { Grid } from '@chakra-ui/react'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import TokenCard from 'components/TokenCard'
import { getAddress } from 'ethers/lib/utils.js'
import useOffers, { Offer } from 'hooks/niftyapes/useOffers'
import { useAccount } from 'wagmi'

export default function FeaturedFinancingOffers() {
  const { address } = useAccount()
  const { data: offersData, error, isLoading: isLoadingOffers } = useOffers({})
  const activeOffers = offersData?.filter(
    // Show active offers that aren't created by current account
    (offer) => offer.status === 'ACTIVE' && offer.offer.creator !== address
  )
  const tokenQueries = activeOffers?.map(
    (offer) => `${offer.offer.nftContractAddress}:${offer.offer.nftId}`
  )
  const { data: tokens, mutate: tokensMutate } = useTokens({
    tokens: tokenQueries,
  })
  const offersWithTokens = activeOffers?.map((offer) => {
    const token = tokens.find(
      (token) =>
        getAddress(token?.token?.contract || '') ===
          offer.offer.nftContractAddress &&
        token?.token?.tokenId === offer.offer.nftId
    )

    return {
      offer,
      token,
    }
  })

  return (
    <Grid templateColumns={'repeat(5, 1fr)'} gap={12}>
      {offersWithTokens?.map(({ offer, token }) => (
        <TokenCard
          token={token}
          financeOffer={offer}
          collectionImage={undefined}
          mutate={tokensMutate}
        ></TokenCard>
      ))}
    </Grid>
  )
}
