import Link from 'next/link'
import { FC } from 'react'

const NAVBAR_LOGO = process.env.NEXT_PUBLIC_NAVBAR_LOGO
const SOURCE_ID = process.env.NEXT_PUBLIC_SOURCE_ID
const SOURCE_NAME = process.env.NEXT_PUBLIC_SOURCE_NAME
const NAVBAR_LOGO_LINK = process.env.NEXT_PUBLIC_NAVBAR_LOGO_LINK

type Props = {
  className?: string
}

const NavbarLogo: FC<Props> = ({ className }) => {
  const logo = NAVBAR_LOGO || '/reservoir.svg'
  let logoAlt = 'Logo'

  if (SOURCE_NAME) {
    logoAlt = SOURCE_NAME
  } else if (SOURCE_ID) {
    logoAlt = SOURCE_ID
  }

  return (
    <div
      className={`relative inline-flex flex-none items-center gap-5 ${className}`}
    >
      <Link passHref href={NAVBAR_LOGO_LINK || '/'}>
        <img
          src={logo}
          alt={logoAlt}
          className="block h-6 w-auto cursor-pointer"
        />
      </Link>
      <Link passHref href="/explore">
        <span className="text-gray-400 hover:text-white hover:underline">
          Explore
        </span>
      </Link>
    </div>
  )
}

export default NavbarLogo
