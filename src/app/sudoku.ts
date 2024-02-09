export type CI = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Les indices de cases
export type CV = CI | 9;

// Les valeurs de cases
export type BOARD<T> = readonly (readonly T[])[];

// Un plateau (générique)
// Listes de toutes les valeurs de cases possibles
export const values: readonly CV[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface Game {
    // Le plateau de jeu initial
    readonly initialBoard: BOARD<CV>;
    // Le plateau de jeu courant
    readonly board: BOARD<CV>;
    // Les cases du plateau de jeu courant organisées par colonnes
    readonly LC: BOARD<CV>;
    // Les cases du plateau de jeu courant organisées par zones
    readonly LZ: BOARD<CV>;
}

export interface GameState extends Game {
    readonly LP: BOARD<readonly CV[]>; // Plateau des listes de valeurs possibles pour chaque case
}