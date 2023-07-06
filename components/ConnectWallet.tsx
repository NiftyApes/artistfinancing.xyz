import { FC } from 'react'
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  Address,
} from 'wagmi'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { HiOutlineLogout, HiOutlineShoppingBag } from 'react-icons/hi'
import FormatNativeCrypto from './FormatNativeCrypto'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useMounted from 'hooks/useMounted'
import Avatar from './Avatar'
import { truncateAddress, truncateEns } from 'lib/truncateText'

const ConnectWallet: FC = () => {
  const account = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address: account?.address })
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const wallet = connectors[0]
  const isMounted = useMounted()

  if (!isMounted) {
    return null
  }

  if (!account.isConnected)
    return (
      <ConnectWalletButton>
        <img src="/icons/wallet.svg" alt="Wallet Icon" />
      </ConnectWalletButton>
    )

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="btn-primary-outline ml-auto rounded-full border-transparent p-0 normal-case dark:border-neutral-600 dark:bg-neutral-900 dark:ring-gray-300 dark:focus:ring-4">
        <Avatar address={account.address} avatar={ensAvatar} size={35} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" sideOffset={6}>
        <div
          className={
            'w-48 rounded bg-white py-2 font-medium text-black shadow-md radix-side-bottom:animate-slide-down md:w-56'
          }
        >
          <div className="group flex w-full items-center py-1 px-4 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100">
            <img
              src="/icons/etherscan-logo-circle.svg"
              className="mr-2 w-[13px]"
              alt="Etherscan"
            />
            <a
              href={`https://etherscan.io/address/${account.address}`}
              target="_blank"
              rel="noreferrer"
            >
              {ensName ? (
                <span>{truncateEns(ensName)}</span>
              ) : (
                <span>{truncateAddress(account.address || '')}</span>
              )}
            </a>
          </div>
          <div className="group flex w-full items-center py-1 px-4 outline-none transition">
            <span>
              {account.address && <Balance address={account.address} />}
            </span>
          </div>
          <div className="mt-2 mb-2 border-b border-gray-300"></div>
          <Link
            href={` / address /${account.address}`}
            legacyBehavior={true}
            passHref
          >
            <DropdownMenu.Item asChild>
              <a className="group flex w-full cursor-pointer items-center gap-1 px-4 py-1 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100">
                <HiOutlineShoppingBag className="h-5" />
                <span>Portfolio</span>
              </a>
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item asChild>
            <button
              key={wallet.id}
              onClick={() => {
                disconnect()
              }}
              className="group flex w-full cursor-pointer items-center gap-1 px-4 py-1 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100"
            >
              <HiOutlineLogout className="h-5" />
              <span>Disconnect</span>
            </button>
          </DropdownMenu.Item>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default ConnectWallet

type Props = {
  address: string
}

export const Balance: FC<Props> = ({ address }) => {
  const { data: balance } = useBalance({ address: address as Address })
  return <FormatNativeCrypto amount={balance?.value} />
}
