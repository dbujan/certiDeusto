import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsignaturasProfesorComponent } from './lista-asignaturas-profesor.component';

describe('ListaAsignaturasProfesorComponent', () => {
  let component: ListaAsignaturasProfesorComponent;
  let fixture: ComponentFixture<ListaAsignaturasProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAsignaturasProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAsignaturasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
