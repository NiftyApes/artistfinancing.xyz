import { Address, NiftyApesProvider } from '@niftyapes/sdk'

import '@niftyapes/sdk/dist/styles.css'

import '@rainbow-me/rainbowkit/styles.css'
import {
  darkTheme,
  lightTheme,
  ReservoirKitProvider,
  ReservoirKitProviderProps,
  ReservoirKitTheme,
} from '@reservoir0x/reservoir-kit-ui'
import AnalyticsProvider from 'components/AnalyticsProvider'
import { ThemeProvider, useTheme } from 'next-themes'
import type { AppContext, AppProps } from 'next/app'
import { default as NextApp } from 'next/app'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import 'styles/chalkboard.css'
import 'styles/druk.css'
import 'styles/editorialnew.css'
import 'styles/frankruhllibre.css'
import 'styles/gazpacho.css'
import 'styles/globals.css'
import 'styles/gothicusroman.css'
import 'styles/ingrammono.css'
import 'styles/inter.css'
import 'styles/lucidagrande.css'
import 'styles/montserrat.css'
import 'styles/nunitosans.css'
import 'styles/open-sans.css'
import 'styles/playfair-display.css'
import 'styles/roboto.css'
import 'styles/rodger.css'
import 'styles/roobert.css'
import 'styles/styreneb.css'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import * as allChains from 'wagmi/chains'

import {
  getDefaultWallets,
  darkTheme as rainbowKitDarkTheme,
  lightTheme as rainbowKitLightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { useGoogleAnalytics } from 'hooks/useGoogleAnalytics'
import { getSocialMediaPreviewTitle } from 'lib/getSocialMediaPreviewTitle'
import Head from 'next/head'
import ReactGA from 'react-ga4'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import presetColors from '../colors'

const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const OG_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE
const META_URL = process.env.NEXT_PUBLIC_META_URL
const SOURCE_ID = process.env.NEXT_PUBLIC_SOURCE_ID
const SOURCE_NAME = process.env.NEXT_PUBLIC_SOURCE_NAME
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

// API key for Ethereum node
// Two popular services are Alchemy (alchemy.com) and Infura (infura.io)
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID || ''

const THEME_SWITCHING_ENABLED = process.env.NEXT_PUBLIC_THEME_SWITCHING_ENABLED
const DARK_MODE_ENABLED = process.env.NEXT_PUBLIC_DARK_MODE
const PROXY_API_BASE = process.env.NEXT_PUBLIC_PROXY_API_BASE
const RESERVOIR_API_KEY = process.env.NEXT_PUBLIC_RESERVOIR_API_KEY
const BODY_FONT_FAMILY = process.env.NEXT_PUBLIC_BODY_FONT_FAMILY || 'Mulish'
const FONT_FAMILY = process.env.NEXT_PUBLIC_FONT_FAMILY || 'Work Sans'
const PRIMARY_COLOR = process.env.NEXT_PUBLIC_PRIMARY_COLOR || 'default'
const DISABLE_POWERED_BY_RESERVOIR =
  process.env.NEXT_PUBLIC_DISABLE_POWERED_BY_RESERVOIR

const FEE_BPS = process.env.NEXT_PUBLIC_FEE_BPS
const FEE_RECIPIENT = process.env.NEXT_PUBLIC_FEE_RECIPIENT
const SOURCE_DOMAIN = process.env.NEXT_PUBLIC_SOURCE_DOMAIN
const API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE

const NIFTY_APES_API_KEY = process.env.NEXT_PUBLIC_NIFTY_APES_API_KEY

const INTEGRATION_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_INTEGRATION_CONTRACT_ADDRESS
ReactGA.initialize('G-WSYXEQ3MFP')

const envChain = Object.values(allChains).find(
  (chain) => chain.id === +(CHAIN_ID || allChains.mainnet)
)

const { chains, provider } = configureChains(
  envChain ? [envChain] : [allChains.mainnet],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()]
)

// NOTE: See https://www.rainbowkit.com/docs/migration-guide#2-supply-a-walletconnect-cloud-projectid
const { connectors } = getDefaultWallets({
  appName: SOURCE_NAME || 'ArtistFinancing.xyz',
  projectId: 'd84237a865cc3b20b1574c38459ffaad', // Required after version 0.12
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function AppWrapper(props: AppProps & { baseUrl: string }) {
  const defaultTheme = DARK_MODE_ENABLED ? 'dark' : 'light'

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      forcedTheme={!THEME_SWITCHING_ENABLED ? defaultTheme : undefined}
    >
      <App {...props} />
    </ThemeProvider>
  )
}

const App: FC<AppProps & { baseUrl: string }> = ({
  Component,
  pageProps,
  baseUrl,
}) => {
  const { theme } = useTheme()
  const router = useRouter()
  const defaultTheme = DARK_MODE_ENABLED ? 'dark' : 'light'
  const [reservoirKitTheme, setReservoirKitTheme] = useState<
    ReservoirKitTheme | undefined
  >()
  const [rainbowKitTheme, setRainbowKitTheme] = useState<
    | ReturnType<typeof rainbowKitDarkTheme>
    | ReturnType<typeof rainbowKitLightTheme>
    | undefined
  >()
  const marketplaceTheme = THEME_SWITCHING_ENABLED ? theme : defaultTheme

  const { trackView } = useGoogleAnalytics()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const primaryColor = (PRIMARY_COLOR as string) || 'default'
    const primaryColorPalette = (
      presetColors as Record<string, Record<string, string>>
    )[primaryColor]

    if (marketplaceTheme == 'dark') {
      setReservoirKitTheme(
        darkTheme({
          headlineFont: FONT_FAMILY,
          font: BODY_FONT_FAMILY,
          primaryColor: primaryColorPalette['700'],
          primaryHoverColor: primaryColorPalette['900'],
        })
      )
      setRainbowKitTheme(
        rainbowKitDarkTheme({
          borderRadius: 'small',
        })
      )
    } else {
      setReservoirKitTheme(
        lightTheme({
          headlineFont: FONT_FAMILY,
          font: BODY_FONT_FAMILY,
          primaryColor: primaryColorPalette['700'],
          primaryHoverColor: primaryColorPalette['900'],
        })
      )
      setRainbowKitTheme(
        rainbowKitLightTheme({
          borderRadius: 'small',
        })
      )
    }
  }, [defaultTheme, theme])

  let options: ReservoirKitProviderProps['options'] = {
    apiKey: RESERVOIR_API_KEY,
    apiBase:
      typeof window !== 'undefined'
        ? `${window.location.origin}${PROXY_API_BASE}`
        : `${baseUrl}${PROXY_API_BASE}`,
    disablePoweredByReservoir:
      DISABLE_POWERED_BY_RESERVOIR != undefined &&
      DISABLE_POWERED_BY_RESERVOIR != null,
    source: SOURCE_DOMAIN,
    normalizeRoyalties: true,
  }

  if (FEE_BPS && FEE_RECIPIENT) {
    options = {
      ...options,
      marketplaceFee: +FEE_BPS,
      marketplaceFeeRecipient: FEE_RECIPIENT,
    }
  }

  return (
    <NiftyApesProvider
      config={{
        chainId: envChain?.id || allChains.mainnet.id,
        integrationContractAddress: INTEGRATION_CONTRACT_ADDRESS as Address,
        apiKey: NIFTY_APES_API_KEY,
        theme: defaultTheme,
      }}
    >
      <ReservoirKitProvider options={options} theme={reservoirKitTheme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={rainbowKitTheme}
            modalSize="compact"
          >
            <Head>
              {/* OG - https://ogp.me/ */}
              {/* https://www.opengraph.xyz/ */}
              {/* should be between 30-60 characters, with a maximum of 90 */}
              <meta
                property="og:title"
                content={getSocialMediaPreviewTitle()}
              />
              <meta property="og:type" content="website" />
              <meta property="og:determiner" content="the" />
              <meta property="og:locale" content="en" />
              {/* Make sure the important part of your description is within the first 110 characters, so it doesn't get cut off on mobile. */}
              <meta property="og:description" content={META_DESCRIPTION} />
              <meta property="og:site_name" content={SOURCE_ID} />
              <meta property="og:url" content={META_URL} />
              {/* The optimal size is 1200 x 630 (1.91:1 ratio). */}
              <meta property="og:image" content={OG_IMAGE} key="og:image" />
              <meta
                property="og:image:type"
                content="image/png"
                key="og:image:type"
              />
              <meta
                property="og:image:width"
                content="1280"
                key="og:image:width"
              />
              <meta
                property="og:image:height"
                content="640"
                key="og:image:height"
              />
              <meta
                property="og:image:alt"
                content={`${SOURCE_NAME || SOURCE_ID || 'Market'} banner`}
              />
            </Head>
            <AnalyticsProvider>
              <Component {...pageProps} />
            </AnalyticsProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReservoirKitProvider>
    </NiftyApesProvider>
  )
}

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(appContext)
  let baseUrl = ''

  if (appContext.ctx.req?.headers.host) {
    baseUrl = `http://${appContext.ctx.req?.headers.host}`
  } else if (API_BASE) {
    baseUrl = API_BASE
  }

  return { ...appProps, baseUrl }
}

export default AppWrapper
