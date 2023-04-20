import { Component } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';
import { VM } from 'app/models/vm';
import { Input } from '@angular/core';

@Component({
  selector: 'app-snapshot-pop-up',
  templateUrl: './snapshot-pop-up.component.html',
  styleUrls: ['./snapshot-pop-up.component.css']
})
export class SnapshotPopUpComponent {
  @Input() vm!: VM;
  
  constructor(private responseService: ResponseService) { } 
  
  onMakeSnapshot(){
    this.responseService.postRequest('handle_vm/make_snapshot', { vmid: this.vm.properties.get('VM ID')?.value }).subscribe(() => {
        console.log("snapshot created");
    });
  }

}

