import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CI, CV, GameState } from '../sudoku';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlateauComponent {

  @Input() gs!: GameState;
  @Input() value!: CV;

  @Output() play = new EventEmitter<[line: number, column: number]>();

  classCell(line: number, column: number): string {
    let classe = '';

    if (line == 0 || line == 3 || line == 6) classe += 'top';
    else if (line == 8 || line == 5 || line == 2) classe += ' bottom';

    if (column == 0 || column == 3 || column == 6) classe += ' left';
    else if (column == 8 || column == 5 || column == 2) classe += ' right';

    // Si la valeur sélectionnée par l'utilisateur est dans les coups jouables de la case
    if (this.gs.LP[line][column].includes(this.value))
      classe += ' selected'

    return classe;
  }

}
