import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployPopUpButtonsComponent } from './deploy.component';

describe('DeployPopUpButtonsComponent', () => {
  let component: DeployPopUpButtonsComponent;
  let fixture: ComponentFixture<DeployPopUpButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeployPopUpButtonsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeployPopUpButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
