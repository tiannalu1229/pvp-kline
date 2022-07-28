import { CreatePool } from '../types/Factory/Factory';
import { MergePosition, OracleToPool, Pool, Setting } from '../types/schema';
import { Pool as PoolTemplate, UniswapV3Pool as V3Tmp } from '../types/templates'
import { ZERO_BI } from '../utils/constants';
import { BigInt } from '@graphprotocol/graph-ts';
import { SetMarginRatio } from '../types/templates/UniswapV3Pool/Pool';
import { fetchTradePair, fetchTokenSymbol, fetchTokenDecimals } from '../utils/token';

export function handleCreatePool(event: CreatePool): void {

    //get event data
    let poolAddress = event.params.pool
    let payToken = event.params.payToken
    let oracle = event.params.oracle
    let reverse = event.params.reverse

    //create new pool
    let pool = Pool.load(poolAddress.toHexString())
    if (pool != null) {
        return
    }

    let id = poolAddress.toHexString()
    pool = new Pool(id)
    //get pair info
    let tokens = fetchTradePair(oracle)
    let token0 = tokens[0]
    let token0Symbol = fetchTokenSymbol(token0)
    let token0Decimal = fetchTokenDecimals(token0)
    let token1 = tokens[1]
    let token1Symbol = fetchTokenSymbol(token1)
    let token1Decimal = fetchTokenDecimals(token1)
    pool.trade_pair = token0Symbol.concat("-").concat(token1Symbol)
    pool.token0 = token0.toHexString()
    pool.token0Symbol = token0Symbol
    pool.token0Decimal = token0Decimal
    pool.token1 = token1.toHexString()
    pool.token1Symbol = token1Symbol
    pool.token1Decimal = token1Decimal
    pool.pay_token = payToken.toHexString()
    pool.oracle = oracle.toHexString()
    pool.reverse = reverse
    pool.asset = ZERO_BI
    pool.lp = ZERO_BI
    pool.lp_price = BigInt.fromI32(1)
    pool.margin_ratio = 0
    pool.count_position = 0
    pool.create_at = event.block.timestamp
    pool.create_block = event.block.number
    pool.save()

    //init merge position for the pool, one long and one short
    let longId = poolAddress.toHexString().concat("-").concat("long")
    let shortId = poolAddress.toHexString().concat("-").concat("short")
    let longMergePosition = MergePosition.load(longId)
    let shortMergePosition = MergePosition.load(shortId)
    if (longMergePosition != null || shortMergePosition != null) {
        return
    }

    longMergePosition = new MergePosition(longId)
    longMergePosition.asset = ZERO_BI
    longMergePosition.lp = ZERO_BI
    longMergePosition.open_price = ZERO_BI
    longMergePosition.open_lp = ZERO_BI
    longMergePosition.fake_lp = ZERO_BI
    longMergePosition.create_at = event.block.timestamp
    longMergePosition.create_block = event.block.number
    longMergePosition.save()

    shortMergePosition = new MergePosition(shortId)
    shortMergePosition.asset = ZERO_BI
    shortMergePosition.lp = ZERO_BI
    shortMergePosition.open_price = ZERO_BI
    shortMergePosition.open_lp = ZERO_BI
    shortMergePosition.fake_lp = ZERO_BI
    shortMergePosition.create_at = event.block.timestamp
    shortMergePosition.create_block = event.block.number
    shortMergePosition.save()

    //qilin pool -> oracle record
    let otq = OracleToPool.load(oracle.toHexString())
    if (otq == null) {
        otq = new OracleToPool(oracle.toHexString())
        otq.pool = [poolAddress.toHexString()]
        otq.save()
    } else {
        let list = otq.pool
        list.push(event.params.pool.toHexString())
        otq.pool = list
        otq.save()
    }

    //create pool template
    PoolTemplate.create(poolAddress)
    //create price template
    V3Tmp.create(oracle)
}

export function handleSetMarginRatio(event: SetMarginRatio): void {

    //get event data
    let poolAddress = event.address.toHexString()
    let marginRatio = event.params.marginRatio

    //edit setting
    let setting = Setting.load(poolAddress)
    if (setting == null) {
        setting = new Setting(poolAddress)
    }

    setting.margin_ratio = marginRatio
    setting.save()
    
}