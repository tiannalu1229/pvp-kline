import { Swap } from '../types/templates/UniswapV3Pool/UniswapV3Pool';
import { Price, OracleToPool, Pool } from '../types/schema';
import { sqrtPriceX96ToTokenPrices } from"../utils/pricing"
import { E18 } from '../utils/constants';
import { fetchPrice } from '../utils/pricing';
import { Address } from '@graphprotocol/graph-ts';

export function handleSwap(event: Swap): void {

    let oracleAddress = event.address
    let oracle = OracleToPool.load(oracleAddress.toHexString())

    if (oracle == null) {
        return
    }

    for (let i = 0; i < oracle.pool.length; i++) {
        let poolAddress = oracle.pool[i]
        let pool = Pool.load(poolAddress)
        if (pool == null) {
            return
        }
        let priceId = pool.id
            .concat('-')
            .concat(event.block.number.toString())
            .concat('-')
            .concat(event.logIndex.toString())
        let price = Price.load(priceId)
        if (price != null) {
            return
        }

        //get price
        let newPrice = ""

        let token0Decimal = pool.token0Decimal
        let token1Decimal = pool.token1Decimal

        // let poolPrice = fetchPrice(Address.fromString(poolAddress))
        let pairPrice = sqrtPriceX96ToTokenPrices(event.params.sqrtPriceX96,token0Decimal,token1Decimal)
        if (!pool.reverse) {
            let a = pairPrice[1].times(E18.toBigDecimal()).toString().split(".")
            pool.token_price = a[0]
            newPrice = a[0]
        }else{
            let a = pairPrice[0].times(E18.toBigDecimal()).toString().split(".")
            pool.token_price = a[0]
            newPrice = a[0]
        }
        pool.save()
        
        price = new Price(priceId)
        price.pool_address = poolAddress
        price.create_at = event.block.timestamp
        price.create_block = event.block.number
        price.price = newPrice
        price.save()
    }
}