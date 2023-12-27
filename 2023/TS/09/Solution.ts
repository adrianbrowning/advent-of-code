export type Reverse<TString, Result extends string = ""> =
    TString extends `${infer Head}${infer Rest}`
        ? Reverse<Rest, `${Head}${Result}`>
        : Result;
