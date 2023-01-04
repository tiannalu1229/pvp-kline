import { Open, Close, Liquidate, Rebase } from '../types/templates/Pool/Pool';
import { SetMarginRatio, SetProtocolFee, SetLiqProtocolFee, RemoveLevel, AddLevel } from '../types/templates/UniswapV3Pool/Pool';
import { Pool, Position, Setting, MergePosition, Opertion } from '../types/schema';
import { ZERO_BI, E18, pow } from '../utils/constants';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleOpen(event: Open): void {
    
    //get event data
    let poolAddress = event.address
    let index = event.params.index
    let sender = event.params.user
    let margin = event.params.margin
    let lp = event.params.lp
    let price = event.params.openPrice
    let level = event.params.level

    //create position
    let positionId = poolAddress.toHexString().concat("-").concat(index.toString())
    let position = Position.load(positionId)
    if (position != null) {
        return
    }
    position = new Position(positionId)
    position.index = index
    position.pool_address = poolAddress.toHexString()
    position.user = sender.toHexString()
    position.level = level
    position.margin = margin
    position.asset = margin.times(BigInt.fromI32(level).abs())
    position.lp = lp
    position.open_price = price
    position.type = 1
    position.close_price = ZERO_BI
    position.protocol_fee = ZERO_BI
    position.lp_pnl = ZERO_BI
    position.fact_pnl = ZERO_BI
    position.open_at = event.block.timestamp
    position.open_block = event.block.number
    position.close_at = ZERO_BI
    position.close_block = ZERO_BI
    position.save()

    //edit merge position
    if (level > 0) {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("long")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }
        
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset
            .plus(margin.times(BigInt.fromI32(level).abs()))
        mergePosition.lp = mergePosition.lp.plus(lp)
        mergePosition.open_lp = mergePosition.lp
        mergePosition.save()
    } else {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("short")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }
            
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset
            .plus(margin.times(BigInt.fromI32(level).abs()))
        mergePosition.lp = mergePosition.lp.plus(lp)
        mergePosition.fake_lp = mergePosition.fake_lp.plus(lp)
        mergePosition.open_lp = mergePosition.fake_lp
        mergePosition.save()
    }

    /**
     * edit pool :
     *  asset, lp, lpPrice, count position
     */
    let pool = Pool.load(poolAddress.toHexString())
    if (pool == null) {
        return
    }
    let longId = poolAddress.toHexString().concat("-").concat("long")
    let shortId = poolAddress.toHexString().concat("-").concat("short")
    let longMergePosition = MergePosition.load(longId)
    let shortMergePosition = MergePosition.load(shortId)
    if (longMergePosition == null || shortMergePosition == null) {
        return
    }

    
    pool.margin = pool.margin.plus(margin)
    pool.asset = pool.asset.plus((margin.times(BigInt.fromI32(level).abs())))
    pool.lp = longMergePosition.lp
        .plus((shortMergePosition.lp.times(BigInt.fromI32(2)).minus(shortMergePosition.fake_lp)))
        pool.lp_price = pool.lp.equals(BigInt.fromI32(0)) ? E18 : pool.asset.times(E18).div(pool.lp)
    pool.count_position += 1
    pool.save()

    //create opertion
    let opertionId = event.address.toHexString()
        .concat('-')
        .concat(event.params.index.toString())
        .concat('-')
        .concat("1")
    let opertion = Opertion.load(opertionId)
    if (opertion != null) {
        return
    }
    opertion = new Opertion(opertionId)
    opertion.user = sender.toHexString()
    opertion.pool_address = poolAddress.toHexString()
    opertion.type = 1
    opertion.level = level
    opertion.margin = margin
    opertion.lp = lp
    opertion.lp_price = pool.lp_price
    opertion.price = price
    opertion.protocol_fee = ZERO_BI
    opertion.pnl = ZERO_BI
    opertion.tx_hash = event.transaction.hash.toHexString()
    opertion.create_at = event.block.timestamp
    opertion.create_block = event.block.number
    opertion.save()
}

export function handleClose(event: Close): void {

    //get event data
    let poolAddress = event.address
    let index = event.params.index
    let lp = event.params.receiveLp
    let sender = event.params.user
    let asset = event.params.receivePosition
    let price = event.params.closePrice
    let protocolFee = event.params.protocolFee

    //edit position
    let positionId = poolAddress.toHexString().concat("-").concat(index.toString())
    let position = Position.load(positionId)
    if (position == null) {
        return
    }
    position.closer = sender.toHexString()
    position.type = 2
    position.close_price = price
    position.protocol_fee = protocolFee
    position.lp_pnl = lp.minus(position.lp)
    position.fact_pnl = asset.minus(position.asset).minus(protocolFee)
    position.close_at = event.block.timestamp
    position.close_block = event.block.number
    position.save()
    
    //edit merge position
    if (position.level > 0) {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("long")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }
        
        mergePosition.open_price = price
        mergePosition.lp = mergePosition.lp.gt(lp) ? mergePosition.lp.minus(lp) : ZERO_BI
        mergePosition.open_lp = mergePosition.lp
        mergePosition.asset = mergePosition.asset.gt(position.asset) ? mergePosition.asset.minus(position.asset) : ZERO_BI
        mergePosition.save()
    } else {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("short")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }

        mergePosition.open_price = price
        mergePosition.lp = mergePosition.lp.gt(position.lp) ? mergePosition.lp.minus(position.lp) : ZERO_BI
        mergePosition.fake_lp = mergePosition.fake_lp.gt(lp) ? mergePosition.fake_lp.minus(lp) : ZERO_BI
        mergePosition.open_lp = mergePosition.fake_lp
        mergePosition.asset = mergePosition.asset.gt(position.asset) ? mergePosition.asset.minus(position.asset) : ZERO_BI
        mergePosition.save()
    }

    /**
     * edit pool :
     *  asset, lp, lpPrice, count position, total position
     */
    let pool = Pool.load(poolAddress.toHexString())
    if (pool == null) {
        return
    }
    let longId = poolAddress.toHexString().concat("-").concat("long")
    let shortId = poolAddress.toHexString().concat("-").concat("short")
    let longMergePosition = MergePosition.load(longId)
    let shortMergePosition = MergePosition.load(shortId)
    if (longMergePosition == null || shortMergePosition == null) {
        return
    }
    pool.margin = pool.margin.gt(asset.plus(position.margin).minus(position.asset)) ? pool.margin.minus(asset.plus(position.margin).minus(position.asset)) : ZERO_BI
    pool.asset = pool.asset.gt(asset) ? pool.asset.minus(asset) : ZERO_BI
    pool.lp = longMergePosition.lp
        .plus(shortMergePosition.lp.times(BigInt.fromI32(2)).minus(shortMergePosition.fake_lp))
        pool.lp_price = pool.lp.equals(BigInt.fromI32(0)) ? E18 : pool.asset.times(E18).div(pool.lp)
    pool.count_position -= 1
    pool.save()
    
    //create opertion
    let openOpertionId = event.address.toHexString()
        .concat('-')
        .concat(event.params.index.toString())
        .concat('-')
        .concat("1")
    let openOpertion = Opertion.load(openOpertionId)
    if (openOpertion == null) {
        return
    }

    let closeOpertionId = event.address.toHexString()
        .concat('-')
        .concat(event.params.index.toString())
        .concat('-')
        .concat("2")
    let closeOpertion = Opertion.load(closeOpertionId)
    if (closeOpertion != null) {
        return
    }
    closeOpertion = new Opertion(closeOpertionId)
    closeOpertion.pool_address = poolAddress.toHexString()
    closeOpertion.user = sender.toHexString()
    closeOpertion.type = 2
    closeOpertion.level = openOpertion.level
    closeOpertion.margin = openOpertion.margin
    if (openOpertion.level > 0) {
        closeOpertion.lp = lp
    } else {
        closeOpertion.lp = position.lp.times(BigInt.fromI32(2)).minus(lp)
    }
    
    closeOpertion.lp_price = pool.lp_price
    closeOpertion.price = price
    closeOpertion.protocol_fee = protocolFee
    closeOpertion.pnl = asset.gt(position.asset) ? asset.minus(position.asset) : ZERO_BI
    closeOpertion.tx_hash = event.transaction.hash.toHexString()
    closeOpertion.create_at = event.block.timestamp
    closeOpertion.create_block = event.block.number
    closeOpertion.save()
}

export function handleLiquidate(event: Liquidate): void {

    //get event data
    let poolAddress = event.address
    let index = event.params.index
    let sender = event.params.liquidator
    let lp = event.params.receiveLp
    let asset = event.params.receivePosition
    let price = event.params.liqPrice
    let fee = event.params.protocolFee

    //edit position
    let positionId = poolAddress.toHexString().concat("-").concat(index.toString())
    let position = Position.load(positionId)
    if (position == null) {
        return
    }
    position.closer = sender.toHexString()
    position.type = 3
    position.close_price = price
    position.protocol_fee = fee
    position.lp_pnl = lp.minus(position.lp)
    position.fact_pnl = asset.minus(position.asset)
    position.close_at = event.block.timestamp
    position.close_block = event.block.number
    position.save()

    //edit merge position
    if (position.level > 0) {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("long")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }
        
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset.gt(position.asset) ? mergePosition.asset.minus(position.asset) : ZERO_BI
        mergePosition.lp = mergePosition.lp.gt(lp) ? mergePosition.lp.minus(lp) : ZERO_BI
        mergePosition.open_lp = mergePosition.lp
        mergePosition.save()
    } else {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("short")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }
        
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset.gt(position.asset) ? mergePosition.asset.minus(position.asset) : ZERO_BI
        mergePosition.lp = mergePosition.lp.gt(position.lp) ? mergePosition.lp.minus(position.lp) : ZERO_BI
        mergePosition.fake_lp = mergePosition.fake_lp.gt(lp) ? mergePosition.fake_lp.minus(lp) : ZERO_BI
        mergePosition.open_lp = mergePosition.fake_lp
        mergePosition.save()
    }

    /**
     * edit pool :
     *  asset, lp, lpPrice, count position, total position
     */
    let pool = Pool.load(poolAddress.toHexString())
    if (pool == null) {
        return
    }
    let longId = poolAddress.toHexString().concat("-").concat("long")
    let shortId = poolAddress.toHexString().concat("-").concat("short")
    let longMergePosition = MergePosition.load(longId)
    let shortMergePosition = MergePosition.load(shortId)
    if (longMergePosition == null || shortMergePosition == null) {
        return
    }
    pool.margin = pool.margin.gt(asset.plus(position.margin).minus(position.asset)) ? pool.margin.minus(asset.plus(position.margin).minus(position.asset)) : ZERO_BI
    pool.asset = pool.asset.gt(asset) ? pool.asset.minus(asset) : ZERO_BI
    pool.lp = longMergePosition.lp
        .plus(shortMergePosition.lp.times(BigInt.fromI32(2)).minus(shortMergePosition.fake_lp))
    pool.lp_price = pool.lp.equals(BigInt.fromI32(0)) ? E18 : pool.asset.times(E18).div(pool.lp)
    pool.count_position -= 1
    pool.save()
    
    //create opertion
    let openOpertionId = event.address.toHexString()
        .concat('-')
        .concat(event.params.index.toString())
        .concat('-')
        .concat("1")
    let openOpertion = Opertion.load(openOpertionId)
    if (openOpertion == null) {
        return
    }

    let closeOpertionId = event.address.toHexString()
        .concat('-')
        .concat(event.params.index.toString())
        .concat('-')
        .concat("3")
    let closeOpertion = Opertion.load(closeOpertionId)
    if (closeOpertion != null) {
        return
    }
    closeOpertion = new Opertion(closeOpertionId)
    closeOpertion.pool_address = poolAddress.toHexString()
    closeOpertion.user = sender.toHexString()
    closeOpertion.type = 3
    closeOpertion.level = openOpertion.level
    closeOpertion.margin = openOpertion.margin
    if (openOpertion.level > 0) {
        closeOpertion.lp = lp
    } else {
        closeOpertion.lp = position.lp.times(BigInt.fromI32(2)).minus(lp)
    }
    closeOpertion.protocol_fee = fee
    closeOpertion.pnl = ZERO_BI.minus(openOpertion.margin)
    closeOpertion.lp_price = pool.lp_price
    closeOpertion.price = price
    closeOpertion.tx_hash = event.transaction.hash.toHexString()
    closeOpertion.create_at = event.block.timestamp
    closeOpertion.create_block = event.block.number
    closeOpertion.save()
}

export function handleRebase(event: Rebase): void {

    //get event data
    let poolAddress = event.address
    let price = event.params.price
    let longLp = event.params.longLp
    let shortLp = event.params.shortLp

    //edit pool lp price
    let pool = Pool.load(poolAddress.toHexString())
    if (pool == null) {
        return
    }

    //edit merge position
    let longId = poolAddress.toHexString().concat("-").concat("long")
    let shortId = poolAddress.toHexString().concat("-").concat("short")
    let longMergePosition = MergePosition.load(longId)
    let shortMergePosition = MergePosition.load(shortId)
    if (longMergePosition == null || shortMergePosition == null) {
        return
    }

    longMergePosition.lp = longLp
    longMergePosition.save()

    shortMergePosition.fake_lp = shortLp
    if (shortLp.equals(ZERO_BI)) {
        shortMergePosition.lp = shortLp
    }
    shortMergePosition.save()

    pool.lp = longLp.plus(shortMergePosition.lp.times(BigInt.fromI32(2)).minus(shortLp))
    if (pool.lp.equals(ZERO_BI)) {
        pool.lp_price = E18
    } else {
        pool.lp_price = pool.asset.times(E18).div(pool.lp)
    }
    pool.save()
}

export function handleAddLevel(event: AddLevel): void {
    
    //get event data
    let poolAddress = event.address.toHexString()
    let level = event.params.level

    let pool = Pool.load(poolAddress)
    if (pool == null) {
        return
    }
    
    let levels = pool.level
    // if (levels.length == 0) {
    //     levels[0] == level
    //     pool.level = levels
    // } else {
    //     for (let i = 0; i < levels.length; i++) {
    //         if (levels[i] > level) {
    //             for (let j = levels.length; j > i; j--) {
    //                 levels[j] = levels[j - 1]
    //             }
    //             levels[i] = level
    //             break
    //         } else {
    //             if (i == levels.length - 1) {
    //                 levels[i + 1] = level
    //             }
    //         }
    //     }
    // }
    levels[levels.length] = level
    
    pool.level = levels
    pool.save()
}

export function handleRemoveLevel(event: RemoveLevel): void {
    
    //get event data
    let poolAddress = event.address.toHexString()
    let level = event.params.level

    let pool = Pool.load(poolAddress)
    if (pool == null) {
        return
    }
    
    let levels = pool.level
    for (let i = 0; i < levels.length; i++) {
        if (levels[i] == level) {
            for (let j = i; j < levels.length; j++) {
                if (j == levels.length - 1) {
                    levels.pop()
                    break
                }
                levels[j] = levels[j + 1]
            }
            break
        }
    }
    pool.level = levels
    pool.save()
}

export function handleSetMarginRatio(event: SetMarginRatio): void {

    //get event data
    let poolAddress = event.address.toHexString()
    let marginRatio = event.params.marginRatio

    //edit setting
    let setting = Setting.load(poolAddress)
    if (setting == null) {
        return
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
        return
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
        return
    }

    setting.liq_protocol_fee = liqProtocolFee
    setting.save()
}