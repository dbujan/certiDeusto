import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRecordSecretaryComponent } from './academic-record-secretary.component';

describe('AcademicRecordSecretaryComponent', () => {
  let component: AcademicRecordSecretaryComponent;
  let fixture: ComponentFixture<AcademicRecordSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicRecordSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicRecordSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
