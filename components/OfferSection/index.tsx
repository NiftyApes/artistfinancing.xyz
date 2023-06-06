import {
  Address,
  BuyWithFinancingModal,
  CreateOfferModal,
} from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import useMounted from 'hooks/useMounted'
import { FC } from 'react'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
  isOwner: boolean
}

const OfferSection: FC<Props> = ({ token, isOwner }) => {
  // Need to check if mounted as ownership can only be determined
  // on the client side with the logged in user.
  const isMounted = useMounted()

  if (!isMounted || !token) {
    return null
  }

  const formattedToken = {
    id: token?.token?.tokenId!,
    name: token.token?.name!,
    imageSrc: token.token?.image!,
    lastSellValue: String(token.token?.lastSell?.value!),
    contractAddress: token.token?.contract! as Address,
    collectionName: token.token?.collection?.name!,
  }

  return (
    <>
      {isOwner === true ? (
        <CreateOfferModal token={formattedToken} />
      ) : (
        <BuyWithFinancingModal token={formattedToken} />
      )}
    </>
  )
}

export default OfferSection
