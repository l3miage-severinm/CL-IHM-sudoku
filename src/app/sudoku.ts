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

/**
 * Initialise un plateau de sudoku de 9x9 cases
 * @returns un plateau rempli de valeurs aléatoires [0-9]
 */
export function initSudoku(): Game {
    // Plateau de 9x9 cases vides
    let LZ: number[][] = [];
    for (let i =0; i < 9; i++)
        LZ.push([]);
    let g = {
        initialBoard: [] as BOARD<CV>,
        board: Array.from({length: 9}, () => Array.from({length: 9}, () => 0)),
        LC: Array.from({length: 9}, () => Array.from({length: 9}, () => 0)),
        LZ
    }
    console.log(g);
    // On parcourt chaque case
    for (let iL = 0; iL < 9; iL++) {
        for (let iC= 0; iC < 9; iC++) {
            // 1/2 chance de remplir la case
            if (Math.random() > 1 / 2) {
                const coup = playRandom(g as Game, iL, iC)
                console.log(`${coup}`);
                g.board[iL][iC] = coup;
                g.LC[iC][iL] = coup;
                //g.LZ[coordsToZone(iL, iC) ?? 0].push(coup);
            }
                
        }
    }
    return g as Game;
}

/**
 * Calcule un plateau de jeu organisé par colonne à partir du plateau organisé par ligne
 * @param b le plateau organisé par ligne
 * @returns le plateau organisé par colonne
 */
export function columns(b: BOARD<CV>): BOARD<CV> {
    let m = Array.from({length: 9}, () => Array.from({length: 9}, () => 0));

    // Pour la matrice organisée par colonne
    // Les lignes sont les colonnes de la matrice organisée par ligne
    // Les colonnes sont les lignes de la matrice organisée par ligne
    for (let iLigne of b.keys()) {
        for (let iCol of b[iLigne].keys()) {
            m[iCol][iLigne] = b[iLigne][iCol];
        }
    }
    return m as BOARD<CV>;
}

/**
 * Calcule un plateau de jeu organisé par zone à partir du plateau organisé par ligne
 * @param b le plateau organisé par ligne
 * @returns le plateau organisé par zone
 */
export function zones(b: BOARD<CV>): BOARD<CV> {
    let m = Array.from({length: 9}, () => Array.from({length: 9}, () => 0));

    for (let iL = 0; iL < 9; iL++) {
        
        for (let iC = 0; iC < 9; iC++) {
            //console.log(`coordsToZone(${iL}, ${iC}).push()`);
            m[coordsToZone(iL, iC) ?? 0].push(b[iL][iC]);
        }
    }
    
    return m as BOARD<CV>;
}

/**
 * Calcule la matrice des coups jouables pour chaque case d'un plateau
 * Règles :
 *  Il n’y a pas deux fois le même chiffre sur une même ligne
 *  Il n’y a pas deux fois le même chiffre sur une même colonne
 *  Il n’y a pas deux fois le même chiffre sur une même zone.
 * 
 * @param g un objet qui contient le plateau
 * @returns un objet qui contient la matrice des coups jouables
 */
export function gameToState(g: Game): GameState {
    // m est une matrice qui contient à l'origine 9x9 cases contenant []
    // càd la matrice des coups jouables où (à l'origine) aucun coup n'est jouable
    const m: CV[][][] = Array.from({length: 9}, () => Array.from({length: 9}, () => []));

    const indicesBoard = range(0, 9);
    const coups = range(1, 10) as CV[];

    // On parcourt les cases du plateau
    for (let iLigne of indicesBoard) {
        for (let iColumn of indicesBoard) {
            // Si la case est vide, on calcule les coups jouables
            if (g.board[iLigne][iColumn] === 0) {
                for (const coup of coups) {
                    if (isPlayable(coup, iLigne, iColumn, g))
                        m[iLigne][iColumn].push(coup);
                }
            }
        }
    }

    const LP = m as BOARD<readonly CV[]>;
    return {
        LP,
        ...g
    }
}

/**
   * Crée un tableau d'entiers continus
   * @param start le premier entier inclus
   * @param end le dernier entier non inclus
   * @returns un tableau d'entiers
   */
export function range(start: number, end: number): number[] {
    let array = [];
    for (let i = start; i < end; i++)
        array[i - start] = i;
    return array;
}

/**
 * Détermine si un numéro peut être joué sur une case
 * @param n le numéro à jouer
 * @param l l'indice de la ligne
 * @param c l'indice de la colonne
 * @param g le jeu
 * @returns un booléen
 */
function isPlayable(n: CV, l: number, c: number, g: Game): boolean {
    return !(
        g.board[l].includes(n)  ||  // vérification de la ligne
        g.LC[c].includes(n)     ||  // vérification de la colonne
        g.LZ[coordsToZone(l, c) ?? 0].includes(n)); // vérification de la zone
}

/**
 * Détermine la zone à laquelle appartient une case en fonction de ses coordonnées
 * @param iL l'indice de la ligne
 * @param iC l'indice de la colonne
 * @returns un nombre qui est la zone de la case ou undefined si les paramètres sont incohérents
 */
function coordsToZone(iL: number, iC: number): number | undefined {
    if (iL < 3) {
        switch(iC) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            default:
        }
    } else if (iL < 6) {
        switch(iC) {
            case 0:
                return 3;
            case 1:
                return 4;
            case 2:
                return 5;
            default:
        }
    }
    else {
        switch(iC) {
            case 0:
                return 6;
            case 1:
                return 7;
            case 2:
                return 8;
            default:
        }
    }
    return undefined;
}

/**
 * Retourne un numéro aléatoire jouable sur une case
 * @param b un plateau de jeu
 * @param iL l'indice de la ligne de la case à remplir
 * @param iC l'indice de la colonne de la case à remplir
 * @returns un numéro
 */
function playRandom(g: Game, iL: number, iC: number): CV {
    let coup: number;
    //console.log(g, iL, iC);
    do { coup = Math.ceil(10 * Math.random()) - 1; // 1 à 9
    } while (!isPlayable(coup as CV, iL, iC, g));
    return coup as CV;
}