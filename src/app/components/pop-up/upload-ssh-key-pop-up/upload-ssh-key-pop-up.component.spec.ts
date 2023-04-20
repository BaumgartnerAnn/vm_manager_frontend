import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSshKeyPopUpComponent } from './upload-ssh-key-pop-up.component';

describe('UploadSshKeyPopUpComponent', () => {
  let component: UploadSshKeyPopUpComponent;
  let fixture: ComponentFixture<UploadSshKeyPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSshKeyPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSshKeyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
