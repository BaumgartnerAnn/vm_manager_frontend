import { Component, Input } from '@angular/core';
import { VM } from 'app/models/vm';
import { ResponseService } from 'app/services/response/response.service';
import { CheckStatusService } from 'app/services/check-status/check-status.service';
import { ConfirmationPopUpComponent } from '../../pop-up/pop-up-buttons/confirmation-pop-up/confirmation-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { SnapshotPopUpComponent } from '../../pop-up/snapshot-pop-up/snapshot-pop-up/snapshot-pop-up.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-vm-detail',
  templateUrl: './vm-detail.component.html',
  styleUrls: ['./vm-detail.component.css']
})

export class VmDetailComponent {
  @Input() vm?: VM;
  @Input() vms?: VM[];
  response: any = {};
  isStopPending: any = { value: false };
  SPICE_token: any = '';

  constructor(private responseService: ResponseService,
    public dialog: MatDialog) { }

  onPanelOpen(vm: VM) {
      if (!vm.loaded) { // if the VM is not loaded, we load it
        const params = new HttpParams().set('vmid', vm.properties.get('VM ID')?.value);
        this.responseService.getRequest('handle_vm/vm_info', params).subscribe((response: any) => {
            vm.properties.get('CPU available')?.setValue(response.cpus);
            vm.properties.get('Max Storage')?.setValue(response.maxdisk);
            vm.properties.get('Max RAM')?.setValue(response.maxmem);
            vm.properties.get('OS')?.setValue(response.ostype);
            vm.properties.get('Status')?.setValue(response.status);
            vm.loaded = true;
        });
      
    }
  }

  onDeleteClick(vm: VM) {
    const confirmRef = this.dialog.open(ConfirmationPopUpComponent, {
      width: '290px',
      data: { description: "Are you sure you want to delete this VM", buttonTitle: "Delete", buttonColor: "warn" }
    });
    confirmRef.afterClosed().subscribe(result => {
      if (result) {
        if (vm.properties.get('Status')?.value === 'running') {
          this.onKillClick(vm);
        }
        this.vms!.splice(this.vms!.indexOf(vm), 1);
        const checkStatusService = new CheckStatusService(this.responseService);
        checkStatusService.checkStatus(vm).subscribe((stopped) => {
          if (stopped) {
            console.log("vm stopped");
            this.responseService.postRequest('handle_vm/delete', { vmid: vm.properties.get('VM ID')?.value }).subscribe((response: any) => {
              if (response.message === 'Success') {
                console.log("vm deleted");
              }
            });

          }
        });
      }
    });
  }

  onSnapshotclick(vm: VM){
    const params = new HttpParams().set('vmid', vm.properties.get('VM ID')?.value);
    this.responseService.getRequest('handle_vm/get_snapshots', params).subscribe((response: any) => {
      console.log(response)
    });
    this.dialog.open(SnapshotPopUpComponent, {data: {vm: vm}});
  }

  onCloneClick(vm: VM) {
    this.responseService.postRequest('handle_vm/clone', { vmid: vm.properties.get('VM ID')?.value }).subscribe(() => {
        console.log("Clone created");
    });
  }

  onRebootClick(vm: VM) {
    this.responseService.postRequest('handle_vm/reboot', { vmid: vm.properties.get('VM ID')?.value }).subscribe(() => {
        vm.properties.get('Status')?.setValue('running');
    });
  }

  onStartClick(vm: VM) {
    this.responseService.postRequest('handle_vm/start', { vmid: vm.properties.get('VM ID')?.value }).subscribe(() => {
      vm.properties.get('Status')?.setValue('running');
    });
  }

  onStopClick(vm: VM) {
    this.isStopPending = { value: true };
    const vmId = vm.properties.get('VM ID')?.value;
    // sending shutdown to the proxmox is the same as stopping the VM
    this.responseService.postRequest('handle_vm/shutdown', { vmid: vmId }).subscribe(() => {
        const checkStatusService = new CheckStatusService(this.responseService);
        checkStatusService.checkStatus(vm).subscribe((result: boolean) => {
          if (result) {
            this.isStopPending = { value: false };
          }
        });
    });
  }


  onKillClick(vm: VM) {
    // sending stop to the proxmox is the same as pulling the plug of the VM
    // If a user can't stop the VM, he can kill it
    this.responseService.postRequest('handle_vm/stop', { vmid: vm.properties.get('VM ID')?.value }).subscribe(() => {
        vm.properties.get('Status')?.setValue('stopped');
        this.isStopPending = { value: false };
    });
  }

  onConnectClick(vm: VM) {
    this.responseService.postRequest('handle_vm/connect', { vmid: vm.properties.get('VM ID')?.value }).subscribe((response: any) => {
        this.SPICE_token = response.SPICE_token;
        // download the SPICE token
        const data = new Blob([this.SPICE_token], { type: 'text/plain' });
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'virt-viewer.vv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);        
    });
  }
}




