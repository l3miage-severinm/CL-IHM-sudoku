import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateauComponent } from './plateau.component';

describe('PlateauComponent', () => {
  let component: PlateauComponent;
  let fixture: ComponentFixture<PlateauComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlateauComponent]
    });
    fixture = TestBed.createComponent(PlateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
