import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompetencesComponent } from './all-competences.component';

describe('AllCompetencesComponent', () => {
  let component: AllCompetencesComponent;
  let fixture: ComponentFixture<AllCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCompetencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
