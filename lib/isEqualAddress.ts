import { getAddress } from 'ethers/lib/utils.js'
import { Address } from 'wagmi'

type MaybeAddress = Address | string | undefined

export default function isEqualAddress(
  addr1: MaybeAddress,
  addr2: MaybeAddress
) {
  try {
    return getAddress(addr1 || '') === getAddress(addr2 || '')
  } catch (err) {
    return false
  }
}
