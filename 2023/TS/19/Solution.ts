type Toys = ['🛹','🚲','🛴','🏄'];

export type Rebuild<
    T extends Array<number>,
    ToyToUse extends Array<number>= [],
    Result extends Array<Toys[number]> = [],
    AddToyCount extends number = 0,
    AddToyTotal extends Array<number> = [],
> =

    AddToyCount extends 0
        ? T extends [] ? Result
            : T extends [number, ...infer Rest]
                ? Rest extends Array<number>
                    ? Rebuild<
                        Rest,
                        ToyToUse,
                        [
                            ...Result,
                            Toys[ToyToUse["length"]]
                        ],
                        T[0],
                        [1, ...AddToyTotal]>
                    : never
                : never
        : AddToyCount extends AddToyTotal["length"]
            ? Rebuild<
                T,
                ToyToUse["length"] extends 3 ? [] : [1,...ToyToUse],
                Result,
                0,
                []>
            : Rebuild<
                T,
                ToyToUse,
                [
                    ...Result,
                    Toys[ToyToUse["length"]]
                ],
                AddToyCount,
                [1, ...AddToyTotal]>
    ;


