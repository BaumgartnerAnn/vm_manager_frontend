import { Component, OnInit } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';
import { MatDialog } from '@angular/material/dialog';
import { RunningVmsComponent } from '../../pop-up/admin/running-vms/running-vms.component';

@Component({
  selector: 'app-admin-vm-details',
  templateUrl: './admin-vm-details.component.html',
  styleUrls: ['./admin-vm-details.component.css']
})
export class AdminVmDetailsComponent{
  constructor(private responseService: ResponseService,
    public dialog: MatDialog) { }
  data: any;
  running_vms: number=0;
  stopped_vms: number=0;
  RunningVmsComponent = RunningVmsComponent;
  ngOnInit() {
    this.responseService.getRequest('admin/vm_running_stopped').subscribe((response: any) => {
        this.running_vms = response.running_vms;
        this.stopped_vms = response.stopped_vms;
    });
  }
}
