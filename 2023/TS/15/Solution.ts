export type BoxToys<Name extends string, NumBoxes extends number> = NumBoxes extends number ?
    FillTuple<Name, NumBoxes>
    : never;

type FillTuple<Name extends string, NumBoxes extends number, Acc extends ReadonlyArray<string> = []> =
    Acc['length'] extends NumBoxes ? Acc
        : FillTuple<Name, NumBoxes, [...Acc, Name]>;
