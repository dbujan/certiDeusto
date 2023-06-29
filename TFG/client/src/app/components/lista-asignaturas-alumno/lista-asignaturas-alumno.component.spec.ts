import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsignaturasAlumnoComponent } from './lista-asignaturas-alumno.component';

describe('ListaAsignaturasAlumnoComponent', () => {
  let component: ListaAsignaturasAlumnoComponent;
  let fixture: ComponentFixture<ListaAsignaturasAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAsignaturasAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAsignaturasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
