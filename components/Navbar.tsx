import { FC, ReactElement, useEffect, useState } from 'react'
import ConnectWallet from './ConnectWallet'
import HamburgerMenu from './HamburgerMenu'
import NavbarLogo from 'components/navbar/NavbarLogo'
import ThemeSwitcher from './ThemeSwitcher'
import CartMenu from './CartMenu'
import { useMediaQuery } from '@react-hookz/web'
import useMounted from 'hooks/useMounted'

const EXTERNAL_LINKS = process.env.NEXT_PUBLIC_EXTERNAL_LINKS || null

const Navbar: FC = () => {
  const isMounted = useMounted()
  const [showLinks, setShowLinks] = useState(true)
  const [filterComponent, setFilterComponent] = useState<ReactElement | null>(
    null
  )
  const isMobile = useMediaQuery('(max-width: 770px)')
  const showDesktopSearch = useMediaQuery('(min-width: 1200px)')
  const [hasCommunityDropdown, setHasCommunityDropdown] =
    useState<boolean>(false)

  const externalLinks: { name: string; url: string }[] = []

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

  useEffect(() => {
    setShowLinks(externalLinks.length > 0)
  }, [])



  if (!isMounted) {
    return null
  }

  return (
    <nav className="sticky top-0 z-[1000] col-span-full flex items-center justify-between gap-2 border-b border-[#D4D4D4] bg-white px-6 py-4 dark:border-neutral-600 dark:bg-black md:gap-3 md:px-16">
      <NavbarLogo className="z-10 max-w-[300px]" />
      {showLinks && (
        <div className="z-10 ml-12 mr-12 hidden items-center gap-11 md:flex">
          {externalLinks.map(({ name, url }) => (
            <a
              key={url}
              href={url}
              className="text-dark reservoir-h6 hover:text-[#1F2937] dark:text-white"
            >
              {name}
            </a>
          ))}
        </div>
      )}
      {(hasCommunityDropdown || showDesktopSearch) && (
        <div className="flex h-full w-full items-center">
          {filterComponent && filterComponent}
        </div>
      )}
      {isMobile ? (
        <div className="ml-auto flex gap-x-5">
          {!hasCommunityDropdown && filterComponent && filterComponent}
          <CartMenu />
          <HamburgerMenu externalLinks={externalLinks} />
        </div>
      ) : (
        <div className="z-10 ml-auto shrink-0 gap-2 md:flex xl:gap-4">
          {!hasCommunityDropdown && !showDesktopSearch && (
            <div className="ml-auto flex">
              {filterComponent && filterComponent}
            </div>
          )}
          <ConnectWallet />
          <ThemeSwitcher />
        </div>
      )}
    </nav>
  )
}

export default Navbar
