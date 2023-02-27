import { Text } from '@chakra-ui/react'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import useOffers from 'hooks/niftyapes/useOffers'

export default function FeaturedFinancingOffers() {
  const { data: offersData, error, isLoading: isLoadingOffers } = useOffers({})
  const activeOffers = offersData?.filter((offer) => offer.status === 'ACTIVE')
  const tokensQueryArr = activeOffers?.map(
    (offer) => `${offer.offer.nftContractAddress}:${offer.offer.nftId}`
  )
  const tokens = useTokens({
    tokens: tokensQueryArr,
  })

  console.log(tokens)
  console.log(activeOffers)

  return <Text>womp</Text>
}
