import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-pop-up',
  templateUrl: './confirmation-pop-up.component.html',
  styleUrls: ['./confirmation-pop-up.component.css']
})
export class ConfirmationPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) { }
  buttonTitle: string = "Deploy";
  buttonColor: string = "primary";
  // If there is a button Tilte in the data, we set it to the buttonTitle
  ngOnInit(): void {
    if (this.data.buttonTitle) {
      this.buttonTitle = this.data.buttonTitle;
    }
    if (this.data.buttonColor) {
      this.buttonColor = this.data.buttonColor;
    }
  }

  OnClickDeploy(): void {
    this.dialogRef.close(true);
  }
}
