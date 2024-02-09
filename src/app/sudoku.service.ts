import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SudokuService {
  private _gs: WritableSignal<GameState>;
  readonly gs: Signal<GameState>;
  constructor() {
    this._gs = signal<GameState>(…)
    this.gs = computed<GameState>(() => this.gs())
  }
  /** play value at line i and column j. */
  play(value: CV, i: CI, j: CI): void {… }
}
