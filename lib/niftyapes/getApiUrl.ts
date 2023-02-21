export function getBaseApiUrl(chainId: string) {
  const apiBaseUri =
    process.env.API_BASE_URI ||
    `https://api.niftyapes.money/${getChainName(parseInt(chainId, 10))}`

    console.log({ apiBaseUri, chainId })

  return `${apiBaseUri}/v1`;
}

export function getApiUrl(chainId: string, path: string) {

  return `${getBaseApiUrl(chainId)}/v1/${path}`;
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
