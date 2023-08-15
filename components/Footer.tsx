import Link from 'next/link'

const FOOTER_ENABLED = process.env.NEXT_PUBLIC_FOOTER_ENABLED == 'true'

const Footer = () => {
  if (FOOTER_ENABLED)
    return (
      <footer className="col-span-full bg-white p-20 text-sm text-black lg:flex">
        <div>
          <img src="/niftyapes/af-artist-financing-black.svg" />
          <div className="mt-[8px] italic">Powered by NiftyApes</div>
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

        <div className="ml-auto flex items-center justify-center space-x-[20px]">
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
          <div className="h-[16px] border-t border-r border-gray-200"></div>
          <Link href="https://app.niftyapes.money/" legacyBehavior={true}>
            <a target="_blank" rel="noreferrer">
              Lending App
            </a>
          </Link>
          <div className="h-[16px] border-t border-r border-gray-200"></div>
          <div>
            <Link href="https://blog.niftyapes.money/" legacyBehavior={true}>
              <a target="_blank" rel="noreferrer">
                Blog
              </a>
            </Link>
          </div>
          <div className="h-[16px] border-t border-r border-gray-200"></div>
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
          <div className="h-[16px] border-t border-r border-gray-200"></div>
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
          <div className="h-[16px] border-t border-r border-gray-200"></div>
          <div>
            <Link href="https://niftyapes.readme.io/docs" legacyBehavior={true}>
              <a target="_blank" rel="noreferrer">
                Docs
              </a>
            </Link>
          </div>
          <div className="h-[16px] border-t border-r border-gray-200"></div>
          <div>Terms of Service</div>
        </div>
      </footer>
    )

  return null
}

export default Footer
