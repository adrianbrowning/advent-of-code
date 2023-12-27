export type FindSanta<Tup extends Array<any>, Location extends ReadonlyArray<any> = []> =
    Tup['length'] extends 0 ? never :
        Tup['length'] extends Location['length'] ? never
            : Tup[Location["length"]] extends '🎅🏼' ? Location["length"] : FindSanta<Tup, readonly [...Location, Tup[Location["length"]]]>
    ;
