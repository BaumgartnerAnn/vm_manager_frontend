import { Component, Input } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopUpComponent } from '../confirmation-pop-up/confirmation-pop-up.component';
import { SelectUserPopUpComponent } from '../select-user-pop-up/select-user-pop-up.component';

@Component({
  selector: 'app-dozent-popup-buttons',
  templateUrl: './dozent.component.html',
  styleUrls: ['./dozent.component.css']
})
export class DozentPopUpButtonsComponent {
  constructor(
    private responseService: ResponseService,
    public dialog: MatDialog,
  ) { }
  @Input() name: any;
  @Input() dialogRef: any;
  onClickDeployOnAll(): void {
    const confirmRef = this.dialog.open(ConfirmationPopUpComponent, {
      width: '290px',
      data: { description: "Are you sure you want to deploy this template on all systems?" }
    });
    confirmRef.afterClosed().subscribe(result => {
      // We only want to close the pop up if the user clicks on the deploy button, not on the cancel button
      if (result) {
        this.responseService.postRequest('handle_template/deploy_on_all', { template_name: this.name }).subscribe(() => {
        });
        this.dialogRef.close();
      }
    });
  }
  onClickDeployOnSelected(): void {
    const dialogRef_1 = this.dialog.open(SelectUserPopUpComponent, {
      width: '550px', data: { template_name: this.name }
    });

    dialogRef_1.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }
  onClickCancel(): void {
    this.dialogRef.close()
  }
}