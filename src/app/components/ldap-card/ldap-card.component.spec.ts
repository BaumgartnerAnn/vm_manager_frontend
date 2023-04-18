import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdapCardComponent } from './ldap-card.component';

describe('LdapCardComponent', () => {
  let component: LdapCardComponent;
  let fixture: ComponentFixture<LdapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdapCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
