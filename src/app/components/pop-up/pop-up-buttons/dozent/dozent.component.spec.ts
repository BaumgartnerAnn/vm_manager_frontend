import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DozentPopUpButtonsComponent } from './dozent.component';

describe('DozentPopUpButtonsComponent', () => {
  let component: DozentPopUpButtonsComponent;
  let fixture: ComponentFixture<DozentPopUpButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DozentPopUpButtonsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DozentPopUpButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
