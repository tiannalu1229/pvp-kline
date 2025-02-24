// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("trade_pair", Value.fromString(""));
    this.set("token0", Value.fromString(""));
    this.set("token0Symbol", Value.fromString(""));
    this.set("token0Decimal", Value.fromBigInt(BigInt.zero()));
    this.set("token1", Value.fromString(""));
    this.set("token1Symbol", Value.fromString(""));
    this.set("token1Decimal", Value.fromBigInt(BigInt.zero()));
    this.set("token_price", Value.fromString(""));
    this.set("oracle_type", Value.fromI32(0));
    this.set("oracle", Value.fromString(""));
    this.set("reverse", Value.fromBoolean(false));
    this.set("pay_token", Value.fromString(""));
    this.set("pay_token_symbol", Value.fromString(""));
    this.set("pay_token_decimal", Value.fromBigInt(BigInt.zero()));
    this.set("level", Value.fromI32Array(new Array(0)));
    this.set("margin", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromBigInt(BigInt.zero()));
    this.set("lp", Value.fromBigInt(BigInt.zero()));
    this.set("lp_price", Value.fromBigInt(BigInt.zero()));
    this.set("margin_ratio", Value.fromI32(0));
    this.set("count_position", Value.fromI32(0));
    this.set("create_at", Value.fromBigInt(BigInt.zero()));
    this.set("create_block", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pool entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get trade_pair(): string {
    let value = this.get("trade_pair");
    return value!.toString();
  }

  set trade_pair(value: string) {
    this.set("trade_pair", Value.fromString(value));
  }

  get token0(): string {
    let value = this.get("token0");
    return value!.toString();
  }

  set token0(value: string) {
    this.set("token0", Value.fromString(value));
  }

  get token0Symbol(): string {
    let value = this.get("token0Symbol");
    return value!.toString();
  }

  set token0Symbol(value: string) {
    this.set("token0Symbol", Value.fromString(value));
  }

  get token0Decimal(): BigInt {
    let value = this.get("token0Decimal");
    return value!.toBigInt();
  }

  set token0Decimal(value: BigInt) {
    this.set("token0Decimal", Value.fromBigInt(value));
  }

  get token1(): string {
    let value = this.get("token1");
    return value!.toString();
  }

  set token1(value: string) {
    this.set("token1", Value.fromString(value));
  }

  get token1Symbol(): string {
    let value = this.get("token1Symbol");
    return value!.toString();
  }

  set token1Symbol(value: string) {
    this.set("token1Symbol", Value.fromString(value));
  }

  get token1Decimal(): BigInt {
    let value = this.get("token1Decimal");
    return value!.toBigInt();
  }

  set token1Decimal(value: BigInt) {
    this.set("token1Decimal", Value.fromBigInt(value));
  }

  get token_price(): string {
    let value = this.get("token_price");
    return value!.toString();
  }

  set token_price(value: string) {
    this.set("token_price", Value.fromString(value));
  }

  get oracle_type(): i32 {
    let value = this.get("oracle_type");
    return value!.toI32();
  }

  set oracle_type(value: i32) {
    this.set("oracle_type", Value.fromI32(value));
  }

  get oracle(): string {
    let value = this.get("oracle");
    return value!.toString();
  }

  set oracle(value: string) {
    this.set("oracle", Value.fromString(value));
  }

  get reverse(): boolean {
    let value = this.get("reverse");
    return value!.toBoolean();
  }

  set reverse(value: boolean) {
    this.set("reverse", Value.fromBoolean(value));
  }

  get pay_token(): string {
    let value = this.get("pay_token");
    return value!.toString();
  }

  set pay_token(value: string) {
    this.set("pay_token", Value.fromString(value));
  }

  get pay_token_symbol(): string {
    let value = this.get("pay_token_symbol");
    return value!.toString();
  }

  set pay_token_symbol(value: string) {
    this.set("pay_token_symbol", Value.fromString(value));
  }

  get pay_token_decimal(): BigInt {
    let value = this.get("pay_token_decimal");
    return value!.toBigInt();
  }

  set pay_token_decimal(value: BigInt) {
    this.set("pay_token_decimal", Value.fromBigInt(value));
  }

  get level(): Array<i32> {
    let value = this.get("level");
    return value!.toI32Array();
  }

  set level(value: Array<i32>) {
    this.set("level", Value.fromI32Array(value));
  }

  get margin(): BigInt {
    let value = this.get("margin");
    return value!.toBigInt();
  }

  set margin(value: BigInt) {
    this.set("margin", Value.fromBigInt(value));
  }

  get asset(): BigInt {
    let value = this.get("asset");
    return value!.toBigInt();
  }

  set asset(value: BigInt) {
    this.set("asset", Value.fromBigInt(value));
  }

  get lp(): BigInt {
    let value = this.get("lp");
    return value!.toBigInt();
  }

  set lp(value: BigInt) {
    this.set("lp", Value.fromBigInt(value));
  }

  get lp_price(): BigInt {
    let value = this.get("lp_price");
    return value!.toBigInt();
  }

  set lp_price(value: BigInt) {
    this.set("lp_price", Value.fromBigInt(value));
  }

  get margin_ratio(): i32 {
    let value = this.get("margin_ratio");
    return value!.toI32();
  }

  set margin_ratio(value: i32) {
    this.set("margin_ratio", Value.fromI32(value));
  }

  get count_position(): i32 {
    let value = this.get("count_position");
    return value!.toI32();
  }

  set count_position(value: i32) {
    this.set("count_position", Value.fromI32(value));
  }

  get create_at(): BigInt {
    let value = this.get("create_at");
    return value!.toBigInt();
  }

  set create_at(value: BigInt) {
    this.set("create_at", Value.fromBigInt(value));
  }

  get create_block(): BigInt {
    let value = this.get("create_block");
    return value!.toBigInt();
  }

  set create_block(value: BigInt) {
    this.set("create_block", Value.fromBigInt(value));
  }
}

export class Setting extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("margin_ratio", Value.fromBigInt(BigInt.zero()));
    this.set("protocol_fee", Value.fromBigInt(BigInt.zero()));
    this.set("liq_protocol_fee", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Setting entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Setting entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Setting", id.toString(), this);
    }
  }

  static load(id: string): Setting | null {
    return changetype<Setting | null>(store.get("Setting", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get margin_ratio(): BigInt {
    let value = this.get("margin_ratio");
    return value!.toBigInt();
  }

  set margin_ratio(value: BigInt) {
    this.set("margin_ratio", Value.fromBigInt(value));
  }

  get protocol_fee(): BigInt {
    let value = this.get("protocol_fee");
    return value!.toBigInt();
  }

  set protocol_fee(value: BigInt) {
    this.set("protocol_fee", Value.fromBigInt(value));
  }

  get liq_protocol_fee(): BigInt {
    let value = this.get("liq_protocol_fee");
    return value!.toBigInt();
  }

  set liq_protocol_fee(value: BigInt) {
    this.set("liq_protocol_fee", Value.fromBigInt(value));
  }
}

export class Position extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("index", Value.fromBigInt(BigInt.zero()));
    this.set("pool_address", Value.fromString(""));
    this.set("type", Value.fromI32(0));
    this.set("user", Value.fromString(""));
    this.set("closer", Value.fromString(""));
    this.set("level", Value.fromI32(0));
    this.set("margin", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromBigInt(BigInt.zero()));
    this.set("lp", Value.fromBigInt(BigInt.zero()));
    this.set("open_price", Value.fromBigInt(BigInt.zero()));
    this.set("open_at", Value.fromBigInt(BigInt.zero()));
    this.set("open_block", Value.fromBigInt(BigInt.zero()));
    this.set("close_price", Value.fromBigInt(BigInt.zero()));
    this.set("protocol_fee", Value.fromBigInt(BigInt.zero()));
    this.set("lp_pnl", Value.fromBigInt(BigInt.zero()));
    this.set("fact_pnl", Value.fromBigInt(BigInt.zero()));
    this.set("close_at", Value.fromBigInt(BigInt.zero()));
    this.set("close_block", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Position entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Position entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Position", id.toString(), this);
    }
  }

  static load(id: string): Position | null {
    return changetype<Position | null>(store.get("Position", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get index(): BigInt {
    let value = this.get("index");
    return value!.toBigInt();
  }

  set index(value: BigInt) {
    this.set("index", Value.fromBigInt(value));
  }

  get pool_address(): string {
    let value = this.get("pool_address");
    return value!.toString();
  }

  set pool_address(value: string) {
    this.set("pool_address", Value.fromString(value));
  }

  get type(): i32 {
    let value = this.get("type");
    return value!.toI32();
  }

  set type(value: i32) {
    this.set("type", Value.fromI32(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get closer(): string {
    let value = this.get("closer");
    return value!.toString();
  }

  set closer(value: string) {
    this.set("closer", Value.fromString(value));
  }

  get level(): i32 {
    let value = this.get("level");
    return value!.toI32();
  }

  set level(value: i32) {
    this.set("level", Value.fromI32(value));
  }

  get margin(): BigInt {
    let value = this.get("margin");
    return value!.toBigInt();
  }

  set margin(value: BigInt) {
    this.set("margin", Value.fromBigInt(value));
  }

  get asset(): BigInt {
    let value = this.get("asset");
    return value!.toBigInt();
  }

  set asset(value: BigInt) {
    this.set("asset", Value.fromBigInt(value));
  }

  get lp(): BigInt {
    let value = this.get("lp");
    return value!.toBigInt();
  }

  set lp(value: BigInt) {
    this.set("lp", Value.fromBigInt(value));
  }

  get open_price(): BigInt {
    let value = this.get("open_price");
    return value!.toBigInt();
  }

  set open_price(value: BigInt) {
    this.set("open_price", Value.fromBigInt(value));
  }

  get open_at(): BigInt {
    let value = this.get("open_at");
    return value!.toBigInt();
  }

  set open_at(value: BigInt) {
    this.set("open_at", Value.fromBigInt(value));
  }

  get open_block(): BigInt {
    let value = this.get("open_block");
    return value!.toBigInt();
  }

  set open_block(value: BigInt) {
    this.set("open_block", Value.fromBigInt(value));
  }

  get close_price(): BigInt {
    let value = this.get("close_price");
    return value!.toBigInt();
  }

  set close_price(value: BigInt) {
    this.set("close_price", Value.fromBigInt(value));
  }

  get protocol_fee(): BigInt {
    let value = this.get("protocol_fee");
    return value!.toBigInt();
  }

  set protocol_fee(value: BigInt) {
    this.set("protocol_fee", Value.fromBigInt(value));
  }

  get lp_pnl(): BigInt {
    let value = this.get("lp_pnl");
    return value!.toBigInt();
  }

  set lp_pnl(value: BigInt) {
    this.set("lp_pnl", Value.fromBigInt(value));
  }

  get fact_pnl(): BigInt {
    let value = this.get("fact_pnl");
    return value!.toBigInt();
  }

  set fact_pnl(value: BigInt) {
    this.set("fact_pnl", Value.fromBigInt(value));
  }

  get close_at(): BigInt {
    let value = this.get("close_at");
    return value!.toBigInt();
  }

  set close_at(value: BigInt) {
    this.set("close_at", Value.fromBigInt(value));
  }

  get close_block(): BigInt {
    let value = this.get("close_block");
    return value!.toBigInt();
  }

  set close_block(value: BigInt) {
    this.set("close_block", Value.fromBigInt(value));
  }
}

export class Opertion extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool_address", Value.fromString(""));
    this.set("user", Value.fromString(""));
    this.set("type", Value.fromI32(0));
    this.set("level", Value.fromI32(0));
    this.set("margin", Value.fromBigInt(BigInt.zero()));
    this.set("lp", Value.fromBigInt(BigInt.zero()));
    this.set("lp_price", Value.fromBigInt(BigInt.zero()));
    this.set("price", Value.fromBigInt(BigInt.zero()));
    this.set("protocol_fee", Value.fromBigInt(BigInt.zero()));
    this.set("pnl", Value.fromBigInt(BigInt.zero()));
    this.set("tx_hash", Value.fromString(""));
    this.set("create_at", Value.fromBigInt(BigInt.zero()));
    this.set("create_block", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Opertion entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Opertion entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Opertion", id.toString(), this);
    }
  }

  static load(id: string): Opertion | null {
    return changetype<Opertion | null>(store.get("Opertion", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool_address(): string {
    let value = this.get("pool_address");
    return value!.toString();
  }

  set pool_address(value: string) {
    this.set("pool_address", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get type(): i32 {
    let value = this.get("type");
    return value!.toI32();
  }

  set type(value: i32) {
    this.set("type", Value.fromI32(value));
  }

  get level(): i32 {
    let value = this.get("level");
    return value!.toI32();
  }

  set level(value: i32) {
    this.set("level", Value.fromI32(value));
  }

  get margin(): BigInt {
    let value = this.get("margin");
    return value!.toBigInt();
  }

  set margin(value: BigInt) {
    this.set("margin", Value.fromBigInt(value));
  }

  get lp(): BigInt {
    let value = this.get("lp");
    return value!.toBigInt();
  }

  set lp(value: BigInt) {
    this.set("lp", Value.fromBigInt(value));
  }

  get lp_price(): BigInt {
    let value = this.get("lp_price");
    return value!.toBigInt();
  }

  set lp_price(value: BigInt) {
    this.set("lp_price", Value.fromBigInt(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get protocol_fee(): BigInt {
    let value = this.get("protocol_fee");
    return value!.toBigInt();
  }

  set protocol_fee(value: BigInt) {
    this.set("protocol_fee", Value.fromBigInt(value));
  }

  get pnl(): BigInt {
    let value = this.get("pnl");
    return value!.toBigInt();
  }

  set pnl(value: BigInt) {
    this.set("pnl", Value.fromBigInt(value));
  }

  get tx_hash(): string {
    let value = this.get("tx_hash");
    return value!.toString();
  }

  set tx_hash(value: string) {
    this.set("tx_hash", Value.fromString(value));
  }

  get create_at(): BigInt {
    let value = this.get("create_at");
    return value!.toBigInt();
  }

  set create_at(value: BigInt) {
    this.set("create_at", Value.fromBigInt(value));
  }

  get create_block(): BigInt {
    let value = this.get("create_block");
    return value!.toBigInt();
  }

  set create_block(value: BigInt) {
    this.set("create_block", Value.fromBigInt(value));
  }
}

export class MergePosition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("asset", Value.fromBigInt(BigInt.zero()));
    this.set("lp", Value.fromBigInt(BigInt.zero()));
    this.set("open_price", Value.fromBigInt(BigInt.zero()));
    this.set("open_lp", Value.fromBigInt(BigInt.zero()));
    this.set("fake_lp", Value.fromBigInt(BigInt.zero()));
    this.set("create_at", Value.fromBigInt(BigInt.zero()));
    this.set("create_block", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MergePosition entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save MergePosition entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("MergePosition", id.toString(), this);
    }
  }

  static load(id: string): MergePosition | null {
    return changetype<MergePosition | null>(store.get("MergePosition", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get asset(): BigInt {
    let value = this.get("asset");
    return value!.toBigInt();
  }

  set asset(value: BigInt) {
    this.set("asset", Value.fromBigInt(value));
  }

  get lp(): BigInt {
    let value = this.get("lp");
    return value!.toBigInt();
  }

  set lp(value: BigInt) {
    this.set("lp", Value.fromBigInt(value));
  }

  get open_price(): BigInt {
    let value = this.get("open_price");
    return value!.toBigInt();
  }

  set open_price(value: BigInt) {
    this.set("open_price", Value.fromBigInt(value));
  }

  get open_lp(): BigInt {
    let value = this.get("open_lp");
    return value!.toBigInt();
  }

  set open_lp(value: BigInt) {
    this.set("open_lp", Value.fromBigInt(value));
  }

  get fake_lp(): BigInt {
    let value = this.get("fake_lp");
    return value!.toBigInt();
  }

  set fake_lp(value: BigInt) {
    this.set("fake_lp", Value.fromBigInt(value));
  }

  get create_at(): BigInt {
    let value = this.get("create_at");
    return value!.toBigInt();
  }

  set create_at(value: BigInt) {
    this.set("create_at", Value.fromBigInt(value));
  }

  get create_block(): BigInt {
    let value = this.get("create_block");
    return value!.toBigInt();
  }

  set create_block(value: BigInt) {
    this.set("create_block", Value.fromBigInt(value));
  }
}

export class OracleToPool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OracleToPool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OracleToPool entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OracleToPool", id.toString(), this);
    }
  }

  static load(id: string): OracleToPool | null {
    return changetype<OracleToPool | null>(store.get("OracleToPool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): Array<string> {
    let value = this.get("pool");
    return value!.toStringArray();
  }

  set pool(value: Array<string>) {
    this.set("pool", Value.fromStringArray(value));
  }
}

export class Price extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool_address", Value.fromString(""));
    this.set("tmp_address", Value.fromString(""));
    this.set("price", Value.fromString(""));
    this.set("create_at", Value.fromBigInt(BigInt.zero()));
    this.set("create_block", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Price entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Price entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Price", id.toString(), this);
    }
  }

  static load(id: string): Price | null {
    return changetype<Price | null>(store.get("Price", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool_address(): string {
    let value = this.get("pool_address");
    return value!.toString();
  }

  set pool_address(value: string) {
    this.set("pool_address", Value.fromString(value));
  }

  get tmp_address(): string {
    let value = this.get("tmp_address");
    return value!.toString();
  }

  set tmp_address(value: string) {
    this.set("tmp_address", Value.fromString(value));
  }

  get price(): string {
    let value = this.get("price");
    return value!.toString();
  }

  set price(value: string) {
    this.set("price", Value.fromString(value));
  }

  get create_at(): BigInt {
    let value = this.get("create_at");
    return value!.toBigInt();
  }

  set create_at(value: BigInt) {
    this.set("create_at", Value.fromBigInt(value));
  }

  get create_block(): BigInt {
    let value = this.get("create_block");
    return value!.toBigInt();
  }

  set create_block(value: BigInt) {
    this.set("create_block", Value.fromBigInt(value));
  }
}

export class Tmp extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool_address", Value.fromBytes(Bytes.empty()));
    this.set("revert", Value.fromBoolean(false));
    this.set("price", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Tmp entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Tmp entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Tmp", id.toString(), this);
    }
  }

  static load(id: string): Tmp | null {
    return changetype<Tmp | null>(store.get("Tmp", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool_address(): Bytes {
    let value = this.get("pool_address");
    return value!.toBytes();
  }

  set pool_address(value: Bytes) {
    this.set("pool_address", Value.fromBytes(value));
  }

  get revert(): boolean {
    let value = this.get("revert");
    return value!.toBoolean();
  }

  set revert(value: boolean) {
    this.set("revert", Value.fromBoolean(value));
  }

  get price(): string {
    let value = this.get("price");
    return value!.toString();
  }

  set price(value: string) {
    this.set("price", Value.fromString(value));
  }
}
