export type DecipherNaughtyList<list extends string, acc extends ReadonlyArray<string> = []> =
    list extends `${infer Name}/${infer Rest}`
        ? DecipherNaughtyList<Rest, [Name, ...acc]>:
        list extends `${infer LastName}` ? [LastName, ...acc][number]
            : never
    ;
