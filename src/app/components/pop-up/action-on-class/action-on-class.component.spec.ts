import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionOnClassComponent } from './action-on-class.component';

describe('ActionOnClassComponent', () => {
  let component: ActionOnClassComponent;
  let fixture: ComponentFixture<ActionOnClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionOnClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionOnClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
