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

export class CreatePool extends ethereum.Event {
  get params(): CreatePool__Params {
    return new CreatePool__Params(this);
  }
}

export class CreatePool__Params {
  _event: CreatePool;

  constructor(event: CreatePool) {
    this._event = event;
  }

  get pool(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get payToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get oracle(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get reverse(): boolean {
    return this._event.parameters[3].value.toBoolean();
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

export class Factory extends ethereum.SmartContract {
  static bind(address: Address): Factory {
    return new Factory("Factory", address);
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

  get marginRatio_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
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

export class CreatePoolCall extends ethereum.Call {
  get inputs(): CreatePoolCall__Inputs {
    return new CreatePoolCall__Inputs(this);
  }

  get outputs(): CreatePoolCall__Outputs {
    return new CreatePoolCall__Outputs(this);
  }
}

export class CreatePoolCall__Inputs {
  _call: CreatePoolCall;

  constructor(call: CreatePoolCall) {
    this._call = call;
  }

  get payToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get oracle(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get reverse(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class CreatePoolCall__Outputs {
  _call: CreatePoolCall;

  constructor(call: CreatePoolCall) {
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