import { Component } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-pop-up',
  templateUrl: './upload-pop-up.component.html',
  styleUrls: ['./upload-pop-up.component.css']
})
export class UploadPopUpComponent {
  
  fileToUpload: File | null = null;
  fileIsSelected = false;
  wireguard: boolean = true;
  loginForm = new FormGroup({
    classId: new FormControl('', Validators.required),
  });
  constructor(private responseService: ResponseService,
  public dialogRef: MatDialogRef<UploadPopUpComponent>) { }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    this.fileIsSelected = true;
  };
  onUploadFile() { 
    const formData = new FormData();
    formData.append('file', this.fileToUpload!);
    if (this.loginForm.value.classId !== null && this.loginForm.value.classId !== undefined) {
      formData.append('class_id', this.loginForm.value.classId);
    }
    formData.append('has_wireguard', this.wireguard.toString());
    this.responseService.postRequest('admin/upload_csv', formData)
    this.dialogRef.close();
  };

}