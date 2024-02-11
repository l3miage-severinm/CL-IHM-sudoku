import { Component } from '@angular/core';
import { SudokuService } from './sudoku.service';
import { CV } from './sudoku';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  valueSelected: CV = 0;

  constructor(public readonly sudokuService: SudokuService) {}

  asCV(n: number): CV { return n as CV }
}
