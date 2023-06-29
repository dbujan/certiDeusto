import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsAlumnoComponent } from './credentials-alumno.component';

describe('CredentialsAlumnoComponent', () => {
  let component: CredentialsAlumnoComponent;
  let fixture: ComponentFixture<CredentialsAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialsAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
