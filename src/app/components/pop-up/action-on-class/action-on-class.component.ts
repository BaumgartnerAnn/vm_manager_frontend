import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseService } from 'app/services/response/response.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-on-class',
  templateUrl: './action-on-class.component.html',
  styleUrls: ['./action-on-class.component.css']
})
export class ActionOnClassComponent {

  constructor(private responseService: ResponseService,
    public dialogRef: MatDialogRef<ActionOnClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any,) { }

  inputForm = new FormGroup({
    classId: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
  });
  title: string = 'Archive Class'
  buttonTitle: string = 'Archive Class'
  ngOnInit(): void {
    if (this.data.openAsDelete) {
      this.title = 'Delete Class'
      this.buttonTitle = 'Delete Class'
    }
  }
  actionOnClass() {
    if (this.data.openAsDelete) {
      this.responseService.postRequest('admin/delete_class', { "class_id": this.inputForm.value.classId }).subscribe(() => { });
      this.dialogRef.close(this.inputForm.value.classId);
    } else {
      this.responseService.patchRequest('admin/archive_class', { "class_id": this.inputForm.value.classId }).subscribe(() => { });
      this.dialogRef.close(this.inputForm.value.classId);
    }
  }
}