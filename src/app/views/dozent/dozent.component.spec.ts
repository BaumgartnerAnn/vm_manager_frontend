import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DozentComponent } from './dozent.component';

describe('dozentComponent', () => {
  let component: DozentComponent;
  let fixture: ComponentFixture<DozentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DozentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DozentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
