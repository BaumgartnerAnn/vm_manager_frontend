import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotPopUpComponent } from './snapshot-pop-up.component';

describe('SnapshotPopUpComponent', () => {
  let component: SnapshotPopUpComponent;
  let fixture: ComponentFixture<SnapshotPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
