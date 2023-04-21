import { FC } from 'react'
import ConnectWallet from './ConnectWallet'
import HamburgerMenu from './HamburgerMenu'
import NavbarLogo from 'components/navbar/NavbarLogo'
import { useMediaQuery } from '@react-hookz/web'
import useMounted from 'hooks/useMounted'
import { useAccount } from 'wagmi'

const EXTERNAL_LINKS = process.env.NEXT_PUBLIC_EXTERNAL_LINKS || null

const Navbar: FC = () => {
  const isMounted = useMounted()
  const account = useAccount()
  const isMobile = useMediaQuery('(max-width: 770px)')

  const externalLinks: { name: string; url: string }[] = []

  const renderNav = () => {
    if (account.isConnected) {
      return (
        <div className="z-10 ml-auto flex gap-11">
          <div className="text-white hover:underline">
            <a href={`/`}>Explore</a>
          </div>
          <div className="text-white hover:underline">
            <a href={`/address/${account.address}?tab=gallery`}>Portfolio</a>
          </div>
          <div className="text-white hover:underline">
            <a href={`/address/${account.address}?tab=upcoming_payments`}>
              Upcoming Payments
            </a>
          </div>
        </div>
      )
    }
  }

  if (typeof EXTERNAL_LINKS === 'string') {
    const linksArray = EXTERNAL_LINKS.split(',')

    linksArray.forEach((link) => {
      let values = link.split('::')
      externalLinks.push({
        name: values[0],
        url: values[1],
      })
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <nav
      className={`sticky top-0 z-[1000] col-span-full flex ${
        !account.isConnected ? 'justify-between' : 'justify-end'
      } items-center gap-2 px-6 py-4 dark:bg-black md:gap-3 md:px-16`}
    >
      <NavbarLogo className="z-10 max-w-[300px]" />

      {renderNav()}

      {isMobile ? (
        <div className="ml-auto flex gap-x-5">
          <HamburgerMenu externalLinks={externalLinks} />
        </div>
      ) : (
        <div className="z-10 ml-6 flex shrink-0 gap-2">
          <ConnectWallet />
        </div>
      )}
    </nav>
  )
}

export default Navbar
