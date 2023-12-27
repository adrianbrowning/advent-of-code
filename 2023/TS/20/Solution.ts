type Letters = {
    A: [
        '█▀█ ',
        '█▀█ ',
        '▀ ▀ ',
    ],
    B: [
        '█▀▄ ',
        '█▀▄ ',
        '▀▀  '
    ],
    C: [
        '█▀▀ ',
        '█ ░░',
        '▀▀▀ '
    ],
    E: [
        '█▀▀ ',
        '█▀▀ ',
        '▀▀▀ '
    ],
    H: [
        '█ █ ',
        '█▀█ ',
        '▀ ▀ '
    ],
    I: [
        '█ ',
        '█ ',
        '▀ '
    ],
    M: [
        '█▄░▄█ ',
        '█ ▀ █ ',
        '▀ ░░▀ '
    ],
    N: [
        '█▄░█ ',
        '█ ▀█ ',
        '▀ ░▀ '
    ],
    P: [
        '█▀█ ',
        '█▀▀ ',
        '▀ ░░'
    ],
    R: [
        '█▀█ ',
        '██▀ ',
        '▀ ▀ '
    ],
    S: [
        '█▀▀ ',
        '▀▀█ ',
        '▀▀▀ '
    ],
    T: [
        '▀█▀ ',
        '░█ ░',
        '░▀ ░'
    ],
    Y: [
        '█ █ ',
        '▀█▀ ',
        '░▀ ░'
    ],
    W: [
        '█ ░░█ ',
        '█▄▀▄█ ',
        '▀ ░ ▀ '
    ],
    ' ': [
        '░',
        '░',
        '░'
    ],
    ':': [
        '#',
        '░',
        '#'
    ],
    '*': [
        '░',
        '#',
        '░'
    ],
};

type maybe<str extends keyof Letters> = Pick<Letters, str>[str];

export type ToAsciiArt<Str extends string,
    Result extends Array<string> = ["","",""] > =
    Str extends `${infer H}${infer Rest}`
        ? H extends "\n"
            ? [...Result,...ToAsciiArt<Rest, ["","", ""]>]  :
            Uppercase<H> extends keyof Letters
                ? Uppercase<H> extends string
                    ? maybe<Uppercase<H>> extends Array<string>
                        ? ToAsciiArt<Rest, [
                            `${Result[0]}${maybe<Uppercase<H>>[0]}`,
                            `${Result[1]}${maybe<Uppercase<H>>[1]}`,
                            `${Result[2]}${maybe<Uppercase<H>>[2]}`]>
                        : never
                    : never
                : never
        : Result;
