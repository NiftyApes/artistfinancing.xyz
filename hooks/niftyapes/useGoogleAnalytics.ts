import ReactGA from 'react-ga4'

export const useGoogleAnalytics = () => {
  const trackEvent = (category: string, action: string, label: string) => {
    ReactGA.event({ category, action, label })
  }

  const trackView = (path: string) => {
    ReactGA.send({ hitType: 'pageview', page: path })
  }

  return { trackEvent, trackView }
}
