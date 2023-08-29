import { findChain } from 'hooks/useEnvChain'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

const DARK_MODE = process.env.NEXT_PUBLIC_DARK_MODE
const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const OG_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE
const META_URL = process.env.NEXT_PUBLIC_META_URL
const FAVICON = process.env.NEXT_PUBLIC_FAVICON
const SOURCE_ID = process.env.NEXT_PUBLIC_SOURCE_ID
const META_TWITTER_USERNAME = process.env.NEXT_PUBLIC_META_TWITTER_USERNAME
const FONT_URLS = process.env.NEXT_PUBLIC_FONT_URLS
const SOURCE_ICON = process.env.NEXT_PUBLIC_SOURCE_ICON
const SOURCE_NAME = process.env.NEXT_PUBLIC_SOURCE_NAME
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const NEXT_PUBLIC_FATHOM = process.env.NEXT_PUBLIC_FATHOM

const MyDocument = function () {
  const chain = findChain(CHAIN_ID)

  return (
    <Html className={DARK_MODE ? 'dark' : ''}>
      {/* Must  */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="nft, ethereum, protocol" />
      <link rel="shortcut icon" type="image/svg" href={FAVICON} />
      <title>{META_TITLE}</title>
      <meta name="description" content={META_DESCRIPTION} />
      <meta name="keywords" content="NFT, API, Protocol" />
      {/* Twitter */}

      {/* Fathom */}
      <script
        src="https://cdn.usefathom.com/script.js"
        data-site={NEXT_PUBLIC_FATHOM}
        defer
      ></script>

      {/* Reservoir Meta Tags */}
      {SOURCE_NAME ? (
        <meta property="reservoir:title" content={SOURCE_NAME} />
      ) : (
        <meta />
      )}
      {SOURCE_ICON || FAVICON ? (
        <meta property="reservoir:icon" content={SOURCE_ICON || FAVICON} />
      ) : (
        <meta />
      )}

      {chain && chain.network ? (
        <meta
          property={`reservoir:token-url-${
            chain.network === 'homestead' ? 'mainnet' : chain.network
          }`}
          content="/${contract}/${tokenId}"
        />
      ) : (
        <meta />
      )}

      {FONT_URLS ? (
        FONT_URLS.split(',').map((link, i) => (
          <link key={i} href={link} rel="stylesheet" />
        ))
      ) : (
        <meta />
      )}

      <Head />

      <body className="bg-white text-neutral-800 dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}

export default MyDocument
