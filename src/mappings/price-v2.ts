import { Sync } from '../types/templates/UniswapV2orSushi/UniswapV2';
import { Price, OracleToPool, Pool } from '../types/schema';
import { sqrtPriceX96ToTokenPrices } from"../utils/pricing"
import { E18 } from '../utils/constants';
import { BigDecimal } from '@graphprotocol/graph-ts';

export function handleSync(event: Sync): void {

    let reserve0 = event.params.reserve0
    let reserve1 = event.params.reserve1

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

        if (!pool.reverse) {
            pool.token_price = BigDecimal.fromString(reserve0.toString()).div(BigDecimal.fromString(reserve1.toString())).toString()
            newPrice = BigDecimal.fromString(reserve0.toString()).div(BigDecimal.fromString(reserve1.toString())).toString()
        }else{
            pool.token_price = BigDecimal.fromString(reserve1.toString()).div(BigDecimal.fromString(reserve0.toString())).toString()
            newPrice = BigDecimal.fromString(reserve1.toString()).div(BigDecimal.fromString(reserve0.toString())).toString()
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