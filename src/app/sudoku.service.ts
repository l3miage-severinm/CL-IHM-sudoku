import { Injectable, computed, signal, WritableSignal, Signal } from '@angular/core';
import { BOARD, CI, CV, GameState, columns, gameToState, initSudoku, zones, range } from './sudoku';

@Injectable({ providedIn: 'root' })
export class SudokuService {

  private _gs: WritableSignal<GameState>;
  readonly gs: Signal<GameState> = computed<GameState>(() => this._gs());

  constructor() {
    this._gs = signal<GameState>(gameToState(initSudoku()));
  }

  /** play value at line i and column j. */
  play(value: CV, i: CI, j: CI): void {

    if (!this.gs().LP[i][j].includes(value))
      return;
    
    let board = Array.from(this.gs().board) as number[][];
    board[i][j] = value;
    this._gs.set(gameToState({
      initialBoard: this.gs().initialBoard,
      board: board as BOARD<CV>,
      LC: columns(board as BOARD<CV>),
      LZ: zones(board as BOARD<CV>)
    }))
  }

  range = range;
}
