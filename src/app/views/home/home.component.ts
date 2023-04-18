import { Component, OnInit, Output } from '@angular/core';
import { VM } from 'app/models/vm';
import { FetchService } from 'app/services/fetch/fetch.service';
import { ResponseService } from 'app/services/response/response.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  vms: VM[] = [];
  selectedVm?: VM;

  // Declare a property to store the vms data
  vmListInputs = {};
  
  constructor(private fetchService: FetchService,private responseService: ResponseService) { }

  ngOnInit() {
    this.fetchService.getData<VM>('handle_vm/vm_names', 'VM').subscribe((vms: VM[]) => {
      this.vms = vms;
      // Set the vmListInputs property to pass the vms data to the VmListComponent
      this.vmListInputs = { vms: this.vms };
    });
  }
 
  onSelectVm(vm: VM) {
    if (this.selectedVm === vm) {
      this.selectedVm = undefined;
    } else {
      this.selectedVm = vm;
    }
  }

  onCloseDetails() {
    this.selectedVm = undefined;
  }
}
