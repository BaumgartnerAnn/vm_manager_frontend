import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxmoxDetaisComponent } from './proxmox-detais.component';

describe('ProxmoxDetaisComponent', () => {
  let component: ProxmoxDetaisComponent;
  let fixture: ComponentFixture<ProxmoxDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProxmoxDetaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProxmoxDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
