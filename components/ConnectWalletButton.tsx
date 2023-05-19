import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC, ReactElement } from 'react'
import { useAccount } from 'wagmi'

type Props = {
  className?: HTMLButtonElement['className']
  children: ReactElement
}

const ConnectWalletButton: FC<Props> = ({ className, children }) => {
  const account = useAccount()

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'

        return (
          <div
            {...((!ready || account.isConnected) && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'none',
              },
            })}
          >
            {(() => {
              return (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className={`rounded-md bg-white hover:opacity-75 transition-opacity h-full min-h-[42px] border-none px-3 dark:border-neutral-600 dark:text-white dark:ring-white ${className}`}
                >
                  {children}
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWalletButton
