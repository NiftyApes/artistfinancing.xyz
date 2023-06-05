import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import { BuyWithFinancing } from 'components/BuyWithFinancing'
import CreateFinanceOfferModal from 'components/CreateFinanceOfferModal'
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

  return (
    <>
      {isOwner === true ? (
        <CreateFinanceOfferModal token={token} />
      ) : (
        <BuyWithFinancing
          collection={token?.token?.contract!}
          nftId={token.token?.tokenId!}
        />
      )}
    </>
  )
}

export default OfferSection
