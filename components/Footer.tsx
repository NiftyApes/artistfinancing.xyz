import Link from 'next/link'

const FOOTER_ENABLED = process.env.NEXT_PUBLIC_FOOTER_ENABLED == 'true'

const Footer = () => {
  if (FOOTER_ENABLED)
    return (
      <footer className="col-span-full flex flex-col bg-white p-20 text-sm text-black lg:flex-row">
        {/* ------------------ LOGO ------------------ */}
        <div className="order-2 flex flex-col items-center justify-center lg:order-1 lg:items-start">
          <img src="/niftyapes/af-artist-financing-black.svg" width="250" />
          <div className="mt-[8px] ">
            Brought to you by{' '}
            <a
              href="https://niftyapes.money"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              NiftyApes
            </a>{' '}
            and{' '}
            <a
              className="underline"
              href="https://rare.xyz"
              target="_blank"
              rel="noreferrer"
            >
              SuperRare DAO
            </a>
          </div>
          <div className="mt-[8px] flex space-x-[15px]">
            <div>
              <Link href="https://twitter.com/NiftyApes" legacyBehavior={true}>
                <a target="_blank" rel="noreferrer">
                  <img src="/icons/twitter-plain.svg" />
                </a>
              </Link>
            </div>
            <div>
              <Link
                href="https://discord.com/invite/niftyapes"
                legacyBehavior={true}
              >
                <a target="_blank" rel="noreferrer">
                  <img src="/icons/discord-plain.svg" />
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------ LINKS ------------------ */}
        <div className="order-1 mb-[48px] ml-0 flex flex-col items-center space-y-[20px] lg:order-2 lg:ml-auto lg:mb-0 lg:flex-row lg:space-x-[20px] lg:space-y-0">
          <div className="flex items-center justify-center">
            <Link
              href="https://niftyapes.readme.io/docs/introduction"
              legacyBehavior={true}
            >
              <a target="_blank" rel="noreferrer">
                SDK
              </a>
            </Link>
            <div className="ml-2 rounded-[5px] border border-black px-[5px] text-[8px] uppercase">
              new
            </div>
          </div>

          <div className="hidden h-[16px] border-t border-r border-gray-200 lg:block"></div>
          <Link href="https://app.niftyapes.money/" legacyBehavior={true}>
            <a target="_blank" rel="noreferrer">
              Lending App
            </a>
          </Link>
          <div className="hidden h-[16px] border-t border-r border-gray-200 lg:block"></div>
          <div>
            <Link href="https://blog.niftyapes.money/" legacyBehavior={true}>
              <a target="_blank" rel="noreferrer">
                Blog
              </a>
            </Link>
          </div>
          <div className="hidden h-[16px] border-t border-r border-gray-200 lg:block"></div>
          <div>
            <Link
              href="https://niftyapes.readme.io/docs/contracts"
              legacyBehavior={true}
            >
              <a target="_blank" rel="noreferrer">
                Contracts
              </a>
            </Link>
          </div>
          <div className="hidden h-[16px] border-t border-r border-gray-200 lg:block"></div>
          <div>
            <Link
              href="https://niftyapes.readme.io/docs/faq"
              legacyBehavior={true}
            >
              <a target="_blank" rel="noreferrer">
                FAQ
              </a>
            </Link>
          </div>
          <div className="hidden h-[16px] border-t border-r border-gray-200 lg:block"></div>
          <div>
            <Link href="https://niftyapes.readme.io/docs" legacyBehavior={true}>
              <a target="_blank" rel="noreferrer">
                Docs
              </a>
            </Link>
          </div>
          <div className="hidden h-[16px] border-t border-r border-gray-200 lg:block"></div>
          <div>Terms of Service</div>
        </div>
      </footer>
    )

  return null
}

export default Footer
