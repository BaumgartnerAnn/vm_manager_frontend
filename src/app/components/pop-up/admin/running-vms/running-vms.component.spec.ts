import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningVmsComponent } from './running-vms.component';

describe('RunningVmsComponent', () => {
  let component: RunningVmsComponent;
  let fixture: ComponentFixture<RunningVmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningVmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
