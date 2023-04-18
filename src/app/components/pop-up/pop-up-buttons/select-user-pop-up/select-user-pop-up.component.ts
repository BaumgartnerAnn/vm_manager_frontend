import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProxmoxUser } from 'app/models/proxmox-user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopUpComponent } from '../confirmation-pop-up/confirmation-pop-up.component';
import { ResponseService } from 'app/services/response/response.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-user-pop-up',
  templateUrl: './select-user-pop-up.component.html',
  styleUrls: ['./select-user-pop-up.component.css']
})
export class SelectUserPopUpComponent {
  constructor(private responseService: ResponseService,
    public dialogRef: MatDialogRef<SelectUserPopUpComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  template_name: string = this.data.template_name;
  public users: ProxmoxUser[] = [];
  allComplete: boolean = false;
  allSelected = false;

  ngOnInit(): void {
    this.responseService.postRequest('get_users').subscribe((response: any) => {
      if (response.users !== null) {
        for (var key in response.users) {
          this.users.push(new ProxmoxUser(key, response.users[key]));
        }
        this.users.sort((a, b) => a.properties.get('name')?.value.localeCompare(b.properties.get('name')?.value));
      }
      else {
        console.log('Error');
      }


    });

  }
  onClickCancel(): void {
    this.dialogRef.close()
  }


  selectAll(list: any) {
    if (this.allSelected) {
      this.users.forEach(user => user.selected = false);
      list.deselectAll();
    } else {
      this.users.forEach(user => user.selected = true);
      list.selectAll();
    }
    this.allSelected = !this.allSelected;
  }

  userSelected(user: any) {
    user.selected = !user.selected;
    this.allSelected = this.users.every(user => user.selected);
  }
  onClickDeploy() {
    const confirmRef = this.dialog.open(ConfirmationPopUpComponent, {
      width: '290px',
      data: { description: "Are you sure you want to deploy this template on the selected systems?" }
    });
    confirmRef.afterClosed().subscribe(result => {
      // We only want to close the pop up if the user clicks on the deploy button, not on the cancel button
      if (result) {
        this.responseService.postRequest('handle_template/deploy_on_selected', { users: this.users.filter(user => user.selected).map(user => user.properties.get('name')?.value), template_name: this.template_name }).subscribe((response: any) => {
          if (response.message === 'Success') {
            console.log('Success');
          }
        });
        this.dialogRef.close("deploy");
      }
    }
    );
  }
  checkIfNoUsersSelected() {
    return this.users.every(user => !user.selected);
  }
}