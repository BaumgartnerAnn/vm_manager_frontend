import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VM } from 'app/models/vm';

@Component({
  selector: 'app-vm-list',
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.css']
})
export class VmListComponent {
  @Input() vms: VM[]=[];
  @Output() selectVm = new EventEmitter<VM>();

  selectedVM: VM[] = []; // set initial selected VM array to empty

}

