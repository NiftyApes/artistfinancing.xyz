import Link from 'next/link'

const FOOTER_ENABLED = process.env.NEXT_PUBLIC_FOOTER_ENABLED == 'true'

const Footer = () => {
  if (FOOTER_ENABLED)
    return (
      <footer className="smm:flex-row col-span-full mt-20 flex flex-col justify-between bg-white pt-20 pb-20 text-black md:px-16">
        <div className="mb-6 flex flex-row flex-wrap justify-between gap-x-6 text-xs sm:mb-0 sm:gap-x-8 sm:text-sm">
          <div>
            <div className="text-xl font-bold">
              SuperRare Underground by NiftyApes
            </div>
            <div>The future is rare bananas</div>
          </div>

          <div>
            <div className="mb-1 font-bold	uppercase">Community</div>
            <div>
              <Link href="https://twitter.com/niftyapes" legacyBehavior={true}>
                <a className="min-w-max" target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </Link>
            </div>
            <div>
              <Link
                href="https://discord.com/invite/Ge8Zwy6syQ"
                legacyBehavior={true}
              >
                <a className="min-w-max" target="_blank" rel="noreferrer">
                  Discord
                </a>
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-1 font-bold	uppercase">Products</div>
            <div>
              <Link
                href="https://www.niftyapes.money/#top"
                legacyBehavior={true}
              >
                <a className="min-w-max" target="_blank" rel="noreferrer">
                  SDK
                </a>
              </Link>
            </div>
            <div>
              <Link href="https://app.niftyapes.money/" legacyBehavior={true}>
                <a className="min-w-max" target="_blank" rel="noreferrer">
                  Lending App
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    )

  return null
}

export default Footer
