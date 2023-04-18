import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVmDetailsComponent } from './admin-vm-details.component';

describe('AdminVmDetailsComponent', () => {
  let component: AdminVmDetailsComponent;
  let fixture: ComponentFixture<AdminVmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVmDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
