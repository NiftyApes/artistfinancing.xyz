import useEnvChain from 'hooks/useEnvChain'
import Link from 'next/link'
import { FC } from 'react'

const NAVBAR_LOGO = process.env.NEXT_PUBLIC_NAVBAR_LOGO
const SOURCE_ID = process.env.NEXT_PUBLIC_SOURCE_ID
const SOURCE_NAME = process.env.NEXT_PUBLIC_SOURCE_NAME
const NAVBAR_LOGO_LINK = process.env.NEXT_PUBLIC_NAVBAR_LOGO_LINK

type Props = {
  variant?: 'desktop' | 'mobile' | undefined
  className?: string
}

const NavbarLogo: FC<Props> = ({ variant, className }) => {
  const logo = NAVBAR_LOGO || '/reservoir.svg'
  let logoAlt = 'Logo'

  if (SOURCE_NAME) {
    logoAlt = SOURCE_NAME
  } else if (SOURCE_ID) {
    logoAlt = SOURCE_ID
  }

  const mobileVariant = variant == 'mobile'

  return (
    <Link href={NAVBAR_LOGO_LINK || '/'} legacyBehavior={true}>
      <a
        className={`relative inline-flex flex-none items-center gap-1 ${className}`}
      >
        <img src={logo} alt={logoAlt} className={`mr-5 block h-6 w-auto`} />
        <span className="text-gray-400 hover:text-white hover:underline">
          Explore
        </span>
      </a>
    </Link>
  )
}

export default NavbarLogo
