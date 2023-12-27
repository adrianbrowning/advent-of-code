type primitive = string | number | boolean | undefined | null

export type SantaListProtector<TOjb> =
    TOjb extends primitive ? TOjb :
        TOjb extends Array<any> ? MakeArrayReadOnly<TOjb> :
            TOjb extends (...args:any[])=>any ? TOjb :
                Prettify<DeepReadonlyObject<TOjb>>;

type MakeArrayReadOnly<N extends Array<any>, Acc extends ReadonlyArray<any> = []> =
    N['length'] extends Acc['length'] ?
        Acc :
        MakeArrayReadOnly<N, readonly [...Acc, SantaListProtector<N[Acc['length']]>]>;


type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: SantaListProtector<T[P]>
}

type Prettify<T> = {
    [k in keyof T]: T[k];
} & {};
