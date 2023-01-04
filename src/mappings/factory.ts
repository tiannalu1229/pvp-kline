import { CreatePool } from '../types/Factory/Factory';
import { MergePosition, OracleToPool, Pool, Setting, Price } from '../types/schema';
import { Pool as PoolTemplate, UniswapV3Pool as V3Tmp, UniswapV2orSushi as V2Tmp } from '../types/templates'
import { ZERO_BI, E18 } from '../utils/constants';
import { SetMarginRatio, SetProtocolFee, AddLevel, RemoveLevel, SetLiqProtocolFee } from '../types/templates/UniswapV3Pool/Pool';
import { fetchTradePair, fetchTokenSymbol, fetchTokenDecimals } from '../utils/token';
import { fetchPrice } from '../utils/pricing';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleCreatePool(event: CreatePool): void {

    //get event data
    let poolAddress = event.params.pool
    let payToken = event.params.payToken
    let oracle = event.params.oracle
    let reverse = event.params.reverse
    let type = event.params.typ

    //create new pool
    let pool = Pool.load(poolAddress.toHexString())
    if (pool != null) {
        return
    }

    let id = poolAddress.toHexString()
    let tokenPrice = fetchPrice(poolAddress)
    pool = new Pool(id)
    //get pair info
    let tokens = fetchTradePair(oracle)
    let token0 = tokens[0]
    let token0Symbol = fetchTokenSymbol(token0)
    let token0Decimal = fetchTokenDecimals(token0)
    let token1 = tokens[1]
    let token1Symbol = fetchTokenSymbol(token1)
    let token1Decimal = fetchTokenDecimals(token1)
    pool.trade_pair = (token0Symbol.concat("-").concat(token1Symbol)).toUpperCase()
    pool.token0 = token0.toHexString()
    pool.token0Symbol = token0Symbol.toUpperCase()
    pool.token0Decimal = token0Decimal
    pool.token1 = token1.toHexString()
    pool.token1Symbol = token1Symbol.toUpperCase()
    pool.token1Decimal = token1Decimal
    pool.token_price = tokenPrice.toString()
    pool.pay_token = payToken.toHexString()
    pool.pay_token_symbol = fetchTokenSymbol(payToken).toUpperCase()
    pool.pay_token_decimal = fetchTokenDecimals(payToken)
    pool.oracle_type = type
    pool.oracle = oracle.toHexString()
    pool.reverse = reverse
    pool.margin = ZERO_BI
    pool.asset = ZERO_BI
    pool.lp = ZERO_BI
    pool.lp_price = E18
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
    longMergePosition.open_price = tokenPrice
    longMergePosition.open_lp = ZERO_BI
    longMergePosition.fake_lp = ZERO_BI
    longMergePosition.create_at = event.block.timestamp
    longMergePosition.create_block = event.block.number
    longMergePosition.save()

    shortMergePosition = new MergePosition(shortId)
    shortMergePosition.asset = ZERO_BI
    shortMergePosition.lp = ZERO_BI
    shortMergePosition.open_price = tokenPrice
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
    if (type == 1) {

    } 
    if (type == 2) {
        V2Tmp.create(oracle)
    } 
    if (type == 3) {
        V3Tmp.create(oracle)
    }
    if (type == 4) {
        V2Tmp.create(oracle)
    }
    let priceId = poolAddress.toHexString()
        .concat('-')
        .concat(event.block.number.toString())
        .concat('-')
        .concat(event.logIndex.toString())
    let price = new Price(priceId)
    price.pool_address = poolAddress.toHexString()
    price.create_at = event.block.timestamp
    price.create_block = event.block.number
    price.price = tokenPrice.toString()
    price.save()
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

export function handleSetProtocolFee(event: SetProtocolFee): void {

    //get event data
    let poolAddress = event.address.toHexString()
    let protocolFee = event.params.protocolFee

    //edit setting
    let setting = Setting.load(poolAddress)
    if (setting == null) {
        setting = new Setting(poolAddress)
    }

    setting.protocol_fee = protocolFee
    setting.save()
}

export function handleSetLiqProtocolFee(event: SetLiqProtocolFee): void {

    //get event data
    let poolAddress = event.address.toHexString()
    let liqProtocolFee = event.params.liqProtocolFee

    //edit setting
    let setting = Setting.load(poolAddress)
    if (setting == null) {
        setting = new Setting(poolAddress)
    }

    setting.liq_protocol_fee = liqProtocolFee
    setting.save()
}