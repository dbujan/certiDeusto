import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryCoursesComponent } from './secretary-courses.component';

describe('SecretaryCoursesComponent', () => {
  let component: SecretaryCoursesComponent;
  let fixture: ComponentFixture<SecretaryCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretaryCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
