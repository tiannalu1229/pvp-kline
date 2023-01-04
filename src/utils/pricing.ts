/* eslint-disable prefer-const */
import { BigDecimal, BigInt, Address } from '@graphprotocol/graph-ts';
import { Price } from '../types/Factory/Price';
import { Tmp } from '../types/schema';
import { Pool } from '../types/templates/Pool/Pool';
import { exponentToBigDecimal, safeDiv } from '../utils/index'

const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

let Q192BIGINT=BigInt.fromI32(2).pow(192)
export function sqrtPriceX96ToTokenPrices(sqrtPriceX96: BigInt, token0Decimals: BigInt, token1Decimals: BigInt): BigDecimal[] {
  let num = sqrtPriceX96.times(sqrtPriceX96).toBigDecimal()
  let denom = BigDecimal.fromString(Q192BIGINT.toString())
  let price1 = num
    .div(denom)
    .times(exponentToBigDecimal(token0Decimals))
    .div(exponentToBigDecimal(token1Decimals))

  let price0 = safeDiv(BigDecimal.fromString('1'), price1)
  return [price0, price1]
}

export function fetchPrice(tradePair: Address): BigInt {
  let contract = Pool.bind(tradePair)
  let price = contract.try_getPrice()
  if (!price.reverted) {
    return price.value
  }
  return BigInt.fromI32(0)
}