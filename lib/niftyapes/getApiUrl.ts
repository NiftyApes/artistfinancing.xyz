export function getApiUrl(chainId: number, path: string) {
  const apiBaseUri =
    process.env.API_BASE_URI ||
    `https://api.niftyapes.money/${getChainName(chainId)}/`

  return `${apiBaseUri}v1/${path}`
}

function getChainName(chainId: number): string {
  switch (chainId) {
    case 5:
      return 'GOERLI'
    case 1:
      return 'MAINNET'
    case 64:
      return 'GNOSIS'
    default:
      return ''
  }
}
