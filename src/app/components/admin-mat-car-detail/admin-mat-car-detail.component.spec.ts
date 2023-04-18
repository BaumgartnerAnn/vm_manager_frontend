import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatCarDetailComponent } from './admin-mat-car-detail.component';

describe('AdminMatCarDetailComponent', () => {
  let component: AdminMatCarDetailComponent;
  let fixture: ComponentFixture<AdminMatCarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMatCarDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMatCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
