import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RunningVmsComponent } from 'app/components/pop-up/admin/running-vms/running-vms.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private dialog: MatDialog) { }
  //TODO: Add the possibility to change the node of a vm
  onClickShowDetails(){
    this.dialog.open(RunningVmsComponent, {width: '1000px'});
  };
}
