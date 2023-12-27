type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';


export type WhoWins<Player1 extends RockPaperScissors,Player2 extends RockPaperScissors,  > =
    Player1 extends Player2 ? "draw" :
        Player2 extends '🖐🏾' ?
            Player1 extends '👊🏻' ? "win" : "lose" :
            Player2 extends '👊🏻' ?
                Player1 extends '✌🏽' ? "win" : "lose" :
                Player2 extends '✌🏽' ?
                    Player1 extends '🖐🏾' ? "win" : "lose" :
                    "lose"
    ;
