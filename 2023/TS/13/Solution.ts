export type DayCounter<
    TStart extends number,
    TEnd extends number,
    Acc extends ReadonlyArray<number> = [],
    TNextNumber extends number = TStart> =
    TNextNumber extends TEnd ? [...Acc, TNextNumber][number] :
        DayCounter<TStart, TEnd, [...Acc,TNextNumber], AddOne<TNextNumber>>;

type AddOne<TNumber extends number, Acc extends ReadonlyArray<number> = []> =
    Acc['length'] extends TNumber ? [1, ...Acc]['length'] :
        AddOne<TNumber, [1, ...Acc]>;
