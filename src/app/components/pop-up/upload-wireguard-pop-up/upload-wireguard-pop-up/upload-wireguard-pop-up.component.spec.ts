import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWireguardPopUpComponent } from './upload-wireguard-pop-up.component';

describe('UploadWireguardPopUpComponent', () => {
  let component: UploadWireguardPopUpComponent;
  let fixture: ComponentFixture<UploadWireguardPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadWireguardPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadWireguardPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
