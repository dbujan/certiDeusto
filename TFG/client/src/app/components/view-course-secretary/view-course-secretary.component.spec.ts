import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseSecretaryComponent } from './view-course-secretary.component';

describe('ViewCourseSecretaryComponent', () => {
  let component: ViewCourseSecretaryComponent;
  let fixture: ComponentFixture<ViewCourseSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourseSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
