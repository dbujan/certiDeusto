import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCompetenciasComponent } from './lista-competencias.component';

describe('ListaCompetenciasComponent', () => {
  let component: ListaCompetenciasComponent;
  let fixture: ComponentFixture<ListaCompetenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCompetenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
