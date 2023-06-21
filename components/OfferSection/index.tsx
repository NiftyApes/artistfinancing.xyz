import {
  Address,
  BuyWithFinancingModal,
  CreateOfferModal,
  useUnderlyingNFTOwner,
} from '@niftyapes/sdk'
import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import InfoTooltip from 'components/InfoTooltip'
import EthAccount from 'components/niftyapes/EthAccount'
import useMounted from 'hooks/useMounted'
import Link from 'next/link'
import { FC } from 'react'
import { ClipLoader } from 'react-spinners'
import { useAccount } from 'wagmi'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0]
  isOwner: boolean
}

const OfferSection: FC<Props> = ({ token, isOwner }) => {
  // Need to check if mounted as ownership can only be determined
  // on the client side with the logged in user.
  const isMounted = useMounted()

  const { address } = useAccount()
  const { isEntitledToNft, isLoadingLoans: isLoadingOwnershipCheck } =
    useUnderlyingNFTOwner()
  const isNiftyApesOwned = isEntitledToNft(
    token?.token?.contract as Address,
    token?.token?.tokenId
  )

  if (!isMounted || !token) {
    return null
  }

  const formattedToken = {
    id: token?.token?.tokenId!,
    name: token.token?.name!,
    imageSrc: token.token?.image!,
    lastSellValue: token.token?.lastSell?.value
      ? String(token.token.lastSell.value)
      : '',
    contractAddress: token.token?.contract! as Address,
    collectionName: token.token?.collection?.name!,
  }

  return (
    <div>
      {isLoadingOwnershipCheck ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="#36d7b7" />
        </div>
      ) : isNiftyApesOwned ? (
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <h3 className="reservoir-h3">Purchased with Financing</h3>
            <div className="flex space-x-2">
              <p>on NiftyApes</p>
              <img
                className="h-6 w-6"
                src="/niftyapes/banana.png"
                alt="NiftyApes banana logo"
              />
            </div>
          </div>
          <div className="flex w-full space-x-2">
            <Link href={`/address/${address}`} legacyBehavior={true}>
              <a>
                <EthAccount
                  address={address}
                  side="left"
                  label="Underlying Owner"
                />
              </a>
            </Link>
            <InfoTooltip
              side="bottom"
              content="You are entitled to this NFT once your loan is paid in full."
            />
          </div>
        </div>
      ) : (
        <>
          {isOwner === true ? (
            <CreateOfferModal token={formattedToken} />
          ) : (
            <BuyWithFinancingModal token={formattedToken} />
          )}
        </>
      )}
    </div>
  )
}

export default OfferSection
