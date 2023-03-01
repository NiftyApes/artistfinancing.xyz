import { getAddress } from 'ethers/lib/utils.js'
import { Address } from 'wagmi'

type MaybeAddress = Address | string | undefined

export default function addressesEqual(
  addr1: MaybeAddress,
  addr2: MaybeAddress
) {
  addr1 = addr1 || ''
  addr2 = addr2 || ''

  try {
    return getAddress(addr1) === getAddress(addr2)
  } catch (err) {
    console.warn('Invalid address for compare', err)
    return addr1.toLowerCase() === addr2.toLowerCase()
  }
}
