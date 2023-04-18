import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserPopUpComponent } from './select-user-pop-up.component';

describe('SelectUserPopUpComponent', () => {
  let component: SelectUserPopUpComponent;
  let fixture: ComponentFixture<SelectUserPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUserPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUserPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
