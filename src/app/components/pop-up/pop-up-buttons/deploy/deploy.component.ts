import { Component, Input } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopUpComponent } from '../confirmation-pop-up/confirmation-pop-up.component';

@Component({
  selector: 'app-deploy-popup-buttons',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployPopUpButtonsComponent {
  constructor(
    private responseService: ResponseService,
    public dialog: MatDialog) { }
  @Input() vm_name: any;
  @Input() dialogRef: any;
  @Input() RAM!: number;
  @Input() Cores!: number;
  @Input() Storage!: number;
  @Input() name_given!: any;
  @Input() template_name!: string;

  onClickDeploy(): void {
    const confirmRef = this.dialog.open(ConfirmationPopUpComponent, {
      width: '290px',
      data: { description: "Are you sure you want to deploy this template?" }
    });
    confirmRef.afterClosed().subscribe(result => {
      // We only want to close the pop up if the user clicks on the deploy button, not on the cancel button
      if (result) {
        this.responseService.postRequest('handle_template/deploy_on_own', { template_name: this.template_name, RAM: this.RAM, Cores: this.Cores, Storage: this.Storage, vm_name: this.vm_name }).subscribe(() => {
        });
        this.dialogRef.close();
      }
    });
  }
  onClickCancel(): void {
    this.dialogRef.close()
  }
}
