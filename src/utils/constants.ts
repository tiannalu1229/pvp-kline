/* eslint-disable prefer-const */
import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export let E18 = BigInt.fromI32(10).pow(18)

export function pow(number:BigInt):BigInt{
    let r = BigInt.fromI32(1)
    for (let i = BigInt.fromI32(0); i.lt(number); i.plus(BigInt.fromI32(1))) {
        r = r.times(BigInt.fromI32(10))
    }
    return r
}