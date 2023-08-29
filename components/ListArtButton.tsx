import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC, ReactElement, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  children: ReactElement
}
const ListArtButton: FC<Props> = ({ children }) => {
  const account = useAccount()
  const router = useRouter()
  const [isConnectClicked, setConnectClick] = useState(false)

  useEffect(() => {
    if (isConnectClicked && account.isConnected) {
      router.push(`/address/${account.address}?tab=gallery`)
    }
  }, [account, isConnectClicked])

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'

        return (
          <div>
            {ready && account.isConnected ? (
              <Link href={`/address/${account.address}?tab=gallery`}>
                {children}
              </Link>
            ) : (
              <button
                onClick={() => {
                  setConnectClick(true)
                  openConnectModal()
                }}
                type="button"
              >
                {children}
              </button>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ListArtButton
