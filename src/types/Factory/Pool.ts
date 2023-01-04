// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AddLevel extends ethereum.Event {
  get params(): AddLevel__Params {
    return new AddLevel__Params(this);
  }
}

export class AddLevel__Params {
  _event: AddLevel;

  constructor(event: AddLevel) {
    this._event = event;
  }

  get level(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class Close extends ethereum.Event {
  get params(): Close__Params {
    return new Close__Params(this);
  }
}

export class Close__Params {
  _event: Close;

  constructor(event: Close) {
    this._event = event;
  }

  get index(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get receiveLp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get receivePosition(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get closePrice(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get protocolFee(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class Liquidate extends ethereum.Event {
  get params(): Liquidate__Params {
    return new Liquidate__Params(this);
  }
}

export class Liquidate__Params {
  _event: Liquidate;

  constructor(event: Liquidate) {
    this._event = event;
  }

  get index(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get liquidator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get receiveLp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get receivePosition(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get liqPrice(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get protocolFee(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class Open extends ethereum.Event {
  get params(): Open__Params {
    return new Open__Params(this);
  }
}

export class Open__Params {
  _event: Open;

  constructor(event: Open) {
    this._event = event;
  }

  get index(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get margin(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get lp(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get openPrice(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get level(): i32 {
    return this._event.parameters[5].value.toI32();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Rebase extends ethereum.Event {
  get params(): Rebase__Params {
    return new Rebase__Params(this);
  }
}

export class Rebase__Params {
  _event: Rebase;

  constructor(event: Rebase) {
    this._event = event;
  }

  get price(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get longLp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get shortLp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class RemoveLevel extends ethereum.Event {
  get params(): RemoveLevel__Params {
    return new RemoveLevel__Params(this);
  }
}

export class RemoveLevel__Params {
  _event: RemoveLevel;

  constructor(event: RemoveLevel) {
    this._event = event;
  }

  get level(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class SetLiqProtocolFee extends ethereum.Event {
  get params(): SetLiqProtocolFee__Params {
    return new SetLiqProtocolFee__Params(this);
  }
}

export class SetLiqProtocolFee__Params {
  _event: SetLiqProtocolFee;

  constructor(event: SetLiqProtocolFee) {
    this._event = event;
  }

  get liqProtocolFee(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class SetMarginRatio extends ethereum.Event {
  get params(): SetMarginRatio__Params {
    return new SetMarginRatio__Params(this);
  }
}

export class SetMarginRatio__Params {
  _event: SetMarginRatio;

  constructor(event: SetMarginRatio) {
    this._event = event;
  }

  get marginRatio(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class SetProtocolFee extends ethereum.Event {
  get params(): SetProtocolFee__Params {
    return new SetProtocolFee__Params(this);
  }
}

export class SetProtocolFee__Params {
  _event: SetProtocolFee;

  constructor(event: SetProtocolFee) {
    this._event = event;
  }

  get protocolFee(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Pool__mergedLongResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class Pool__mergedShortResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class Pool__positionsResult {
  value0: Address;
  value1: Address;
  value2: i32;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;

  constructor(
    value0: Address,
    value1: Address,
    value2: i32,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromI32(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    return map;
  }
}

export class Pool extends ethereum.SmartContract {
  static bind(address: Address): Pool {
    return new Pool("Pool", address);
  }

  index(): BigInt {
    let result = super.call("index", "index():(uint32)", []);

    return result[0].toBigInt();
  }

  try_index(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("index", "index():(uint32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastPrice(): BigInt {
    let result = super.call("lastPrice", "lastPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lastPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lastPrice", "lastPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  levels(param0: i32): boolean {
    let result = super.call("levels", "levels(int16):(bool)", [
      ethereum.Value.fromI32(param0)
    ]);

    return result[0].toBoolean();
  }

  try_levels(param0: i32): ethereum.CallResult<boolean> {
    let result = super.tryCall("levels", "levels(int16):(bool)", [
      ethereum.Value.fromI32(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  liqProtocolFee(): BigInt {
    let result = super.call("liqProtocolFee", "liqProtocolFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_liqProtocolFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "liqProtocolFee",
      "liqProtocolFee():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  marginRatio(): BigInt {
    let result = super.call("marginRatio", "marginRatio():(uint256)", []);

    return result[0].toBigInt();
  }

  try_marginRatio(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("marginRatio", "marginRatio():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  mergedLong(): Pool__mergedLongResult {
    let result = super.call(
      "mergedLong",
      "mergedLong():(uint256,uint256,uint256,uint256)",
      []
    );

    return new Pool__mergedLongResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_mergedLong(): ethereum.CallResult<Pool__mergedLongResult> {
    let result = super.tryCall(
      "mergedLong",
      "mergedLong():(uint256,uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Pool__mergedLongResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  mergedShort(): Pool__mergedShortResult {
    let result = super.call(
      "mergedShort",
      "mergedShort():(uint256,uint256,uint256,uint256,uint256)",
      []
    );

    return new Pool__mergedShortResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_mergedShort(): ethereum.CallResult<Pool__mergedShortResult> {
    let result = super.tryCall(
      "mergedShort",
      "mergedShort():(uint256,uint256,uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Pool__mergedShortResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  payToken(): Address {
    let result = super.call("payToken", "payToken():(address)", []);

    return result[0].toAddress();
  }

  try_payToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("payToken", "payToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  positions(param0: BigInt): Pool__positionsResult {
    let result = super.call(
      "positions",
      "positions(uint32):(address,address,int16,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Pool__positionsResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toI32(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt()
    );
  }

  try_positions(param0: BigInt): ethereum.CallResult<Pool__positionsResult> {
    let result = super.tryCall(
      "positions",
      "positions(uint32):(address,address,int16,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Pool__positionsResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toI32(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt()
      )
    );
  }

  protocolFee(): BigInt {
    let result = super.call("protocolFee", "protocolFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_protocolFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("protocolFee", "protocolFee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  protocolReceipt(): Address {
    let result = super.call(
      "protocolReceipt",
      "protocolReceipt():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_protocolReceipt(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "protocolReceipt",
      "protocolReceipt():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalPosition(): BigInt {
    let result = super.call("totalPosition", "totalPosition():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalPosition(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalPosition",
      "totalPosition():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPrice(): BigInt {
    let result = super.call("getPrice", "getPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getPrice", "getPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lpPrice(): BigInt {
    let result = super.call("lpPrice", "lpPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lpPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lpPrice", "lpPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  open(user: Address, margin: BigInt, level: i32): BigInt {
    let result = super.call("open", "open(address,uint256,int16):(uint256)", [
      ethereum.Value.fromAddress(user),
      ethereum.Value.fromUnsignedBigInt(margin),
      ethereum.Value.fromI32(level)
    ]);

    return result[0].toBigInt();
  }

  try_open(
    user: Address,
    margin: BigInt,
    level: i32
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "open",
      "open(address,uint256,int16):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(margin),
        ethereum.Value.fromI32(level)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  liqPrice(index: BigInt): BigInt {
    let result = super.call("liqPrice", "liqPrice(uint32):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toBigInt();
  }

  try_liqPrice(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("liqPrice", "liqPrice(uint32):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get payToken_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get oracle_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get reverse_(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get typ(): i32 {
    return this._call.inputValues[3].value.toI32();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class AddLevelCall extends ethereum.Call {
  get inputs(): AddLevelCall__Inputs {
    return new AddLevelCall__Inputs(this);
  }

  get outputs(): AddLevelCall__Outputs {
    return new AddLevelCall__Outputs(this);
  }
}

export class AddLevelCall__Inputs {
  _call: AddLevelCall;

  constructor(call: AddLevelCall) {
    this._call = call;
  }

  get level(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class AddLevelCall__Outputs {
  _call: AddLevelCall;

  constructor(call: AddLevelCall) {
    this._call = call;
  }
}

export class RemoveLevelCall extends ethereum.Call {
  get inputs(): RemoveLevelCall__Inputs {
    return new RemoveLevelCall__Inputs(this);
  }

  get outputs(): RemoveLevelCall__Outputs {
    return new RemoveLevelCall__Outputs(this);
  }
}

export class RemoveLevelCall__Inputs {
  _call: RemoveLevelCall;

  constructor(call: RemoveLevelCall) {
    this._call = call;
  }

  get level(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class RemoveLevelCall__Outputs {
  _call: RemoveLevelCall;

  constructor(call: RemoveLevelCall) {
    this._call = call;
  }
}

export class OpenCall extends ethereum.Call {
  get inputs(): OpenCall__Inputs {
    return new OpenCall__Inputs(this);
  }

  get outputs(): OpenCall__Outputs {
    return new OpenCall__Outputs(this);
  }
}

export class OpenCall__Inputs {
  _call: OpenCall;

  constructor(call: OpenCall) {
    this._call = call;
  }

  get user(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get margin(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get level(): i32 {
    return this._call.inputValues[2].value.toI32();
  }
}

export class OpenCall__Outputs {
  _call: OpenCall;

  constructor(call: OpenCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CloseCall extends ethereum.Call {
  get inputs(): CloseCall__Inputs {
    return new CloseCall__Inputs(this);
  }

  get outputs(): CloseCall__Outputs {
    return new CloseCall__Outputs(this);
  }
}

export class CloseCall__Inputs {
  _call: CloseCall;

  constructor(call: CloseCall) {
    this._call = call;
  }

  get index(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get user(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get receipt(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class CloseCall__Outputs {
  _call: CloseCall;

  constructor(call: CloseCall) {
    this._call = call;
  }
}

export class LiquidateCall extends ethereum.Call {
  get inputs(): LiquidateCall__Inputs {
    return new LiquidateCall__Inputs(this);
  }

  get outputs(): LiquidateCall__Outputs {
    return new LiquidateCall__Outputs(this);
  }
}

export class LiquidateCall__Inputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }

  get index(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get receipt(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class LiquidateCall__Outputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }
}

export class SetMarginRatioCall extends ethereum.Call {
  get inputs(): SetMarginRatioCall__Inputs {
    return new SetMarginRatioCall__Inputs(this);
  }

  get outputs(): SetMarginRatioCall__Outputs {
    return new SetMarginRatioCall__Outputs(this);
  }
}

export class SetMarginRatioCall__Inputs {
  _call: SetMarginRatioCall;

  constructor(call: SetMarginRatioCall) {
    this._call = call;
  }

  get marginRatio_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetMarginRatioCall__Outputs {
  _call: SetMarginRatioCall;

  constructor(call: SetMarginRatioCall) {
    this._call = call;
  }
}

export class SetProtocolReceiptCall extends ethereum.Call {
  get inputs(): SetProtocolReceiptCall__Inputs {
    return new SetProtocolReceiptCall__Inputs(this);
  }

  get outputs(): SetProtocolReceiptCall__Outputs {
    return new SetProtocolReceiptCall__Outputs(this);
  }
}

export class SetProtocolReceiptCall__Inputs {
  _call: SetProtocolReceiptCall;

  constructor(call: SetProtocolReceiptCall) {
    this._call = call;
  }

  get protocolReceipt_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetProtocolReceiptCall__Outputs {
  _call: SetProtocolReceiptCall;

  constructor(call: SetProtocolReceiptCall) {
    this._call = call;
  }
}
