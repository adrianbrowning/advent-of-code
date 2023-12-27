export type SantasList<
    TBads extends ReadonlyArray<unknown>,
    TGoods extends ReadonlyArray<unknown> >= [...TBads, ...TGoods];

type error_0 = SantasList<null, undefined>;
