type Santa = '🎅🏼';
type Tree = '🎄';
type Wood = Array<Santa| Tree>;

type FindSantaRow<Tup extends Wood, Location extends ReadonlyArray<any> = []> =
    Tup['length'] extends 0 ? null :
        Tup['length'] extends Location['length'] ? null
            : Tup[Location["length"]] extends '🎅🏼' ? Location["length"]
                : FindSantaRow<Tup, readonly [...Location, Tup[Location["length"]]]>
    ;


export type FindSanta<Tup extends Array<Wood>, Row extends ReadonlyArray<any> = []> =
    Tup['length'] extends 0 ? never :
        [1,...Tup]['length'] extends Row['length'] ? never : FindSantaRow<Tup[Row["length"]]> extends infer R
            ? R extends number
                ? [Row["length"],R]
                : FindSanta<Tup, readonly [1, ...Row]>
            : FindSanta<Tup, readonly [1, ...Row]>
    ;

