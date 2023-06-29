import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRecordAlumnoComponent } from './academic-record-alumno.component';

describe('AcademicRecordAlumnoComponent', () => {
  let component: AcademicRecordAlumnoComponent;
  let fixture: ComponentFixture<AcademicRecordAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicRecordAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicRecordAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
