import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsSecretaryComponent } from './credentials-secretary.component';

describe('CredentialsSecretaryComponent', () => {
  let component: CredentialsSecretaryComponent;
  let fixture: ComponentFixture<CredentialsSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialsSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
