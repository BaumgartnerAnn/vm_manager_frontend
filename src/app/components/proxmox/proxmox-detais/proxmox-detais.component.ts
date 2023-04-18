import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';
import { RunningVmsComponent } from '../../pop-up/admin/running-vms/running-vms.component';

@Component({
  selector: 'app-proxmox-detais',
  templateUrl: './proxmox-detais.component.html',
  styleUrls: ['./proxmox-detais.component.css']
})
export class ProxmoxDetaisComponent{
  constructor(private responseService: ResponseService) { }
  running_nodes: number=0;
  stopped_nodes: number=0;
  RunningVmsComponent = RunningVmsComponent;

  ngOnInit() {
    this.responseService.getRequest('admin/node_running_stopped').subscribe((response: any) => {
      if (response.data !== null) {
        this.running_nodes = response.running_nodes;
        this.stopped_nodes = response.stopped_nodes;
      }
    });
  }
}
