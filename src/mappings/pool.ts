import { Open, Close, Liquidate, Rebase } from '../types/templates/Pool/Pool';
import { SetMarginRatio } from '../types/templates/UniswapV3Pool/Pool';
import { Pool, Position, Setting, MergePosition, Opertion } from '../types/schema';
import { ZERO_BI, E18 } from '../utils/constants';
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
    position.user = sender.toHexString()
    position.level = level
    position.asset = margin.times(BigInt.fromI32(level).abs())
    position.lp = lp
    position.open_price = price
    position.type = 1
    position.close_price = ZERO_BI
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
        
        if (mergePosition.open_lp.equals(ZERO_BI)) {
            mergePosition.open_lp == lp
        } else {
            mergePosition.open_lp = price.times(E18)
            .div(mergePosition.open_price)
            .times(mergePosition.open_lp).div(E18)
            .plus(lp)
        }
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset
            .plus(margin.times(BigInt.fromI32(level).abs()))
        mergePosition.lp = mergePosition.lp.plus(lp)
        mergePosition.save()
    } else {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("short")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }

        if (mergePosition.open_lp.equals(ZERO_BI)) {
            mergePosition.open_lp == lp
        } else {
            mergePosition.open_lp = price.times(E18)
            .div(mergePosition.open_price)
            .times(mergePosition.open_lp).div(E18)
            .plus(lp)
        }
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset
            .plus(margin.times(BigInt.fromI32(level).abs()))
        mergePosition.lp = mergePosition.lp.plus(lp)
        mergePosition.fake_lp = mergePosition.fake_lp.plus(lp)
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
    opertion.type = 1
    opertion.level = level
    opertion.margin = margin
    opertion.lp = lp
    opertion.lp_price = pool.lp_price
    opertion.price = price
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

    //edit position
    let positionId = poolAddress.toHexString().concat("-").concat(index.toString())
    let position = Position.load(positionId)
    if (position == null) {
        return
    }
    position.closer = sender.toHexString()
    position.type = 2
    position.close_price = price
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
        
        mergePosition.open_lp = price.times(E18)
            .div(mergePosition.open_price)
            .times(mergePosition.open_lp).div(E18)
            .minus(lp)
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset.minus(position.asset)
        mergePosition.lp = mergePosition.lp.minus(lp)
        mergePosition.save()
    } else {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("short")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }

        mergePosition.open_lp = price.times(E18)
            .div(mergePosition.open_price)
            .times(mergePosition.open_lp).div(E18)
            .minus(lp)
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset.minus(position.asset)
        mergePosition.lp = mergePosition.lp.minus(lp)
        mergePosition.fake_lp = mergePosition.fake_lp.minus(lp)
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
    pool.asset = pool.asset.minus(position.asset)
    pool.lp = longMergePosition.lp
        .minus(position.lp.times(BigInt.fromI32(2).minus(lp)))
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
    closeOpertion.user = sender.toHexString()
    closeOpertion.type = 2
    closeOpertion.level = openOpertion.level
    closeOpertion.margin = openOpertion.margin
    if (openOpertion.level > 0) {
        closeOpertion.lp = lp
    } else {
        closeOpertion.lp = position.lp.times(BigInt.fromI32(2).minus(lp))
    }
    
    closeOpertion.lp_price = pool.lp_price
    closeOpertion.price = price
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

    //edit position
    let positionId = poolAddress.toHexString().concat("-").concat(index.toString())
    let position = Position.load(positionId)
    if (position == null) {
        return
    }
    position.closer = sender.toHexString()
    position.type = 3
    position.close_price = price
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
        mergePosition.open_lp = price.times(E18)
            .div(mergePosition.open_price)
            .times(mergePosition.open_lp).div(E18)
            .minus(lp)
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset.minus(position.asset)
        mergePosition.lp = mergePosition.lp.minus(lp)
        mergePosition.save()
    } else {
        let mergePositionId = poolAddress.toHexString().concat("-").concat("short")
        let mergePosition = MergePosition.load(mergePositionId)
        if (mergePosition == null) {
            return
        }
        mergePosition.open_lp = price.times(E18)
            .div(mergePosition.open_price)
            .times(mergePosition.open_lp).div(E18)
            .minus(lp)
        mergePosition.open_price = price
        mergePosition.asset = mergePosition.asset.minus(position.asset)
        mergePosition.lp = mergePosition.lp.minus(lp)
        mergePosition.fake_lp = mergePosition.fake_lp.minus(lp)
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
    pool.asset = pool.asset.minus(position.asset)
    pool.lp = longMergePosition.lp
        .minus(position.lp.times(BigInt.fromI32(2).minus(lp)))
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
    closeOpertion.user = sender.toHexString()
    closeOpertion.type = 3
    closeOpertion.level = openOpertion.level
    closeOpertion.margin = openOpertion.margin
    if (openOpertion.level > 0) {
        closeOpertion.lp = lp
    } else {
        closeOpertion.lp = position.lp.times(BigInt.fromI32(2).minus(lp))
    }
    closeOpertion.lp_price = pool.lp_price
    closeOpertion.price = price
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
    pool.lp_price = price
    pool.save()

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
    shortMergePosition.save()
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