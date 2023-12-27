type TicTacToeChipX = '❌';
type TicTacToeChipO = '⭕';
type TicTacToeChip = TicTacToeChipX | TicTacToeChipO;
// type TicTacToeEndState = `${TicTacToeChipX} Won` | `${TicTacToeChipO} Won` | 'Draw';
// type TicTacToeState = TicTacToeChip | TicTacToeEndState;
// type TicTacToeEmptyCell = '  '
// type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
// type TicTactToeBoard = TicTacToeCell[][];

// type TicTacToeGame = {
//     board: TicTactToeBoard;
//     state: TicTacToeState;
// };

type EmptyBoard = [
    ['  ', '  ', '  '],
    ['  ', '  ', '  '],
    ['  ', '  ', '  ']
];

type BoardState = TicTacToeChip | '  ';

type ActiveBoard = [
    [BoardState, BoardState, BoardState],
    [BoardState, BoardState, BoardState],
    [BoardState, BoardState, BoardState]
];

export type NewGame = {
    board: EmptyBoard;
    state: TicTacToeChipX;
};

type InProgressGame = {
    board: ActiveBoard;
    state: TicTacToeChip;
};


export type TicTacToe<
    GameState extends NewGame | InProgressGame,
    Position extends TicTacToePositions,
    NewBoard extends NewGame | InProgressGame = UpdateBoard<GameState, Position>
> =
    IsValidMove<GameState,Position> extends false ? GameState :
        CheckIfRowWon<NewBoard> extends  {state: infer R, board: infer B}
            ? R extends `${string} Won` ? {state: R, board: B}
                : CheckIfColWon<NewBoard> extends  {state: infer R, board: infer B}
                    ? R extends `${string} Won` ? {state: R, board: B}
                        : IsDraw<NewBoard> extends true ? {state: "Draw", board: NewBoard["board"]} : NewBoard
                    : NewBoard
            : NewBoard;

type IsDraw<GameState extends InProgressGame, Board extends ActiveBoard = GameState["board"]> =
    Board[0][0] extends "  " ? false
        : Board[0][1] extends "  " ? false
            : Board[0][2] extends "  " ? false
                : Board[1][0] extends "  " ? false
                    : Board[1][1] extends "  " ? false
                        : Board[1][2] extends "  " ? false
                            : Board[2][0] extends "  " ? false
                                : Board[2][1] extends "  " ? false
                                    : Board[2][2] extends "  " ? false
                                        : true;
type Positions =
    | { position: "top-left" , reference: {x: 0, y: 0} }
    | { position: "top-center" , reference: {x: 0, y: 1}}
    | { position: "top-right" , reference: {x: 0, y: 2}}
    | { position: "middle-left" , reference: {x: 1, y: 0}}
    | { position:  "middle-center" , reference: {x: 1, y: 1}}
    | { position: "middle-right" , reference: {x: 1, y: 2}}
    | { position: "bottom-left" , reference: {x: 2, y: 0}}
    | { position: "bottom-center" , reference: {x: 2, y: 1}}
    | { position: "bottom-right" , reference: {x: 2, y: 2}};



type IsValidMove<GameState extends InProgressGame, Position extends TicTacToePositions, Board extends ActiveBoard = GameState["board"]> =
    Extract<Positions,{position:Position}> extends {reference : {x: infer X, y: infer Y}} ?
        X extends number ?
            Y extends number ?
                Board[X][Y] extends "  " ? true : false
                : never
            : never
            : never;


type CheckIfColWon<GameState extends NewGame | InProgressGame> =
    CheckRowWon<[GameState["board"][0][0],GameState["board"][1][0],GameState["board"][2][0]],"❌"> extends `${infer Result}`
        ? Result extends `${string} Won`
            ? {state: Result, board: GameState["board"] }
            : CheckRowWon<[GameState["board"][0][1],GameState["board"][1][1],GameState["board"][2][1]],"❌"> extends `${infer Result}`
                ? Result extends `${string} Won`
                    ? {state: Result, board: GameState["board"] }
                    : CheckRowWon<[GameState["board"][0][2],GameState["board"][1][2],GameState["board"][2][2]],"❌"> extends `${infer Result}`
                        ? Result extends `${string} Won`
                            ? {state: Result, board: GameState["board"] }
                            : CheckRowWon<[GameState["board"][0][0],GameState["board"][1][0],GameState["board"][2][0]],"⭕"> extends `${infer Result}`
                                ? Result extends `${string} Won`
                                    ? {state: Result, board: GameState["board"] }
                                    : CheckRowWon<[GameState["board"][0][1],GameState["board"][1][1],GameState["board"][2][1]],"⭕"> extends `${infer Result}`
                                        ? Result extends `${string} Won`
                                            ? {state: Result, board: GameState["board"] }
                                            : CheckRowWon<[GameState["board"][0][2],GameState["board"][1][2],GameState["board"][2][2]],"⭕"> extends `${infer Result}`
                                                ? Result extends `${string} Won`
                                                    ? {state: Result, board: GameState["board"] }
                                                    : GameState
                                                : GameState
                                        : GameState
                                : GameState
                        : GameState
                : GameState
        : GameState;

type CheckIfRowWon<GameState extends NewGame | InProgressGame> = CheckRowWon<
    GameState["board"][0],
    "❌"
> extends `${infer Result}`
    ? Result extends `${string} Won`
        ? {state: Result, board: GameState["board"] }
        : CheckRowWon<GameState["board"][1], "❌"> extends `${infer Result}`
            ? Result extends `${string} Won`
                ? {state: Result, board: GameState["board"] }
                : CheckRowWon<GameState["board"][2], "❌"> extends `${infer Result}`
                    ? Result extends `${string} Won`
                        ? {state: Result, board: GameState["board"] }
                        : CheckRowWon<GameState["board"][0], "⭕"> extends `${infer Result}`
                            ? Result extends `${string} Won`
                                ? {state: Result, board: GameState["board"] }
                                : CheckRowWon<
                                    GameState["board"][1],
                                    "⭕"
                                > extends `${infer Result}`
                                    ? Result extends `${string} Won`
                                        ? {state: Result, board: GameState["board"] }
                                        : CheckRowWon<
                                            GameState["board"][2],
                                            "⭕"
                                        > extends `${infer Result}`
                                            ? Result extends `${string} Won`
                                                ? {state: Result, board: GameState["board"] }
                                                : GameState
                                            : GameState
                                    : GameState
                            : GameState
                    : GameState
            : GameState
    : GameState;

type CheckRowWon<Row extends Array<BoardState>, ToCheck extends TicTacToeChip> =  Row extends [ToCheck, ToCheck, ToCheck] ? `${ToCheck} Won` : "false";

type UpdateBoard<GameState extends NewGame | InProgressGame,
    Position extends TicTacToePositions,
    NEWBOARD extends InProgressGame["board"] = GameState["board"],
    NextChip extends TicTacToeChip = GameState["state"] extends  '❌' ?'⭕' : '❌'   > =
    Position extends `${infer Row}-${infer Col}`
        ? Col extends TicTacToeXPositions
            ? Row extends "top"
                ? {state: NextChip, board: [ChangeRow<Col,GameState["state"],NEWBOARD[0]>,NEWBOARD[1], NEWBOARD[2]]}
                : Row extends "middle"
                    ? {state: NextChip, board: [NEWBOARD[0],ChangeRow<Col,GameState["state"],NEWBOARD[1]>, NEWBOARD[2]]}
                    : Row extends "bottom"
                        ? {state: NextChip, board:[NEWBOARD[0], NEWBOARD[1],ChangeRow<Col,GameState["state"],NEWBOARD[2]>]}
                        : never
            : never
        : never

type ChangeRow<Position extends TicTacToeXPositions, State extends TicTacToeChip, NEWBOARD extends InProgressGame["board"][number]> =
    Position extends `left` ? [State,NEWBOARD[1],NEWBOARD[2]] :
        Position extends `center` ? [NEWBOARD[0],State,NEWBOARD[2]] :
            Position extends `right` ? [NEWBOARD[0],NEWBOARD[1],State] : "Change Row Never";

