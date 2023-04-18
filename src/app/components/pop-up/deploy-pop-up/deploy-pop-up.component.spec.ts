import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployPopUpComponent } from './deploy-pop-up.component';

describe('DeployPopUpComponent', () => {
  let component: DeployPopUpComponent;
  let fixture: ComponentFixture<DeployPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeployPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});