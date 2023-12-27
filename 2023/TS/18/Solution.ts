export type Count<Tuple extends any[], SearchItem, Acc extends Array<1> = []> =
    Tuple["length"] extends 0 ? Acc["length"] :
        Tuple[0] extends SearchItem ?
            Tuple extends [unknown, ...infer Rest] ? Count<Rest, SearchItem, [1, ...Acc]> : never
            : Tuple extends [unknown, ...infer Rest] ? Count<Rest, SearchItem, Acc> : never
    ;

