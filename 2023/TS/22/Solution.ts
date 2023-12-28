/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type Section = [Reindeer,Reindeer,Reindeer];
type TRow = [Section, Section, Section];



type TBoard = [
    TRow,
    TRow,
    TRow,
    TRow,
    TRow,
    TRow,
    TRow,
    TRow,
    TRow
];
export type Validate<Board extends TBoard> = CheckRows<Board> extends true ? CheckCols<Board> extends true ? CheckRegions<Board> extends true ? true : false : false : false;

type CheckRows<Board extends TBoard, rows extends ReadonlyArray<1> = [], acc extends ReadonlyArray<Boolean> = []> =
    rows["length"] extends 9
        ? acc[number] extends true ? true : false
        : CheckRow<Board[rows["length"]]> extends infer R
            ? R extends boolean
                ? CheckRows<Board, [1, ...rows], [...acc, R]>
                : never
            : never;
type CheckRow<Row extends TRow> = Reindeer extends Row[number][number] ? true : false;

type CheckCols<Board extends TBoard, ColCount extends ReadonlyArray<1> = [], acc extends ReadonlyArray<Boolean> = []> =
    ColCount["length"] extends 9
        ? acc[number] extends true ? true : false
        : CheckCol<Board, ColCount["length"]> extends infer R
            ? R extends boolean
                ? CheckCols<Board, [1, ...ColCount], [...acc, R]>
                : never
            : never;

type ColNums =
    | {Col: 0, Cols: [0,0]}
    | {Col: 1, Cols: [0,1]}
    | {Col: 2, Cols: [0,2]}
    | {Col: 3, Cols: [1,0]}
    | {Col: 4, Cols: [1,1]}
    | {Col: 5, Cols: [1,2]}
    | {Col: 6, Cols: [2,0]}
    | {Col: 7, Cols: [2,1]}
    | {Col: 8, Cols: [2,2]}
    | {Col: 9, Cols: [2,3]};

type GetCols<Board extends TBoard, ColNum extends number, acc extends ReadonlyArray<Reindeer> = []> =
    acc["length"] extends 9
        ? acc[number]
        : Extract<ColNums, { Col: ColNum }> extends {Cols: [infer c1, infer c2]}
            ? c1 extends  number
                ? c2 extends number
                    ? GetCols<Board, ColNum, [...acc,Board[acc["length"]][c1][c2]]> : never: never: never;

type CheckCol<Board extends TBoard, ColNum extends number> = Reindeer extends GetCols<Board, ColNum> ? true : false;

type CheckRegion<Board extends TBoard, Region extends number> =  Reindeer extends GetRegion<Board, Region> ? true : false;

type CheckRegions<Board extends TBoard, RegionCount extends ReadonlyArray<1> = [], acc extends ReadonlyArray<Boolean> = []> =
    RegionCount["length"] extends 9
        ? acc[number] extends true ? true : false
        : CheckRegion<Board, RegionCount["length"]> extends infer R
            ? R extends boolean
                ? CheckRegions<Board, [1, ...RegionCount], [...acc, R]>
                : never
            : never;

type RegionNums =
    | {R: 0, Source: [[0,0],[1,0],[2,0]]}
    | {R: 1, Source: [[3,0],[4,0],[5,0]]}
    | {R: 2, Source: [[6,0],[7,0],[8,0]]}
    | {R: 3, Source: [[0,1],[1,1],[2,1]]}
    | {R: 4, Source: [[3,1],[4,1],[5,1]]}
    | {R: 5, Source: [[6,1],[7,1],[8,1]]}
    | {R: 6, Source: [[0,2],[1,2],[2,2]]}
    | {R: 7, Source: [[3,2],[4,2],[5,2]]}
    | {R: 8, Source: [[6,2],[7,2],[8,2]]}

type GetRegion<Board extends TBoard, RegionNum extends number> =
    Extract<RegionNums, { R: RegionNum }> extends { Source: [infer R1, infer R2, infer R3] }
        ? R1 extends [infer R11, infer R12]
            ? R2 extends [infer R21, infer R22]
                ? R3 extends [infer R31, infer R32]
                    ? R11 extends number ? R12 extends number
                            ? R21 extends number ? R22 extends number
                                    ? R31 extends number ? R32 extends number
                                            ? [Board[R11][R12][number], Board[R21][R22][number], Board[R31][R32][number]][number]
                                            : never
                                        : never
                                    : never
                                : never
                            : never
                        : never
                    : never
                : never
            : never
        : never;


type TestBoard = [
    [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
    [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
    [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
    [['🦌', '💨', '💃'], ['⚡', '☄️', '❤️'], ['🔴', '🌩️', '🌟']],
    [['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃'], ['⚡', '☄️', '❤️']],
    [['⚡', '☄️', '❤️'], ['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃']],
    [['💃', '🦌', '💨'], ['❤️', '🌟', '☄️'], ['🌩️', '🔴', '⚡']],
    [['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨'], ['❤️', '🌟', '☄️']],
    [['❤️', '🌟', '☄️'], ['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨']]
];
type test_sudoku_1_actualRows = CheckRows<TestBoard>;
type test_sudoku_1_actualRegion = GetRegion<TestBoard,2>;
//    ^?


