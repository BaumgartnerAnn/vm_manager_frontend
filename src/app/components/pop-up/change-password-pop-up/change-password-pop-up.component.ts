import { Component, Inject } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ResponseService } from 'app/services/response/response.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-change-password-pop-up',
  templateUrl: './change-password-pop-up.component.html',
  styleUrls: ['./change-password-pop-up.component.css']
})
export class ChangePasswordPopUpComponent {
  openedAsAdmin: boolean = false;
  myForm!: FormGroup;
  oldPasswordForm!: FormGroup;
  adminForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  hidden: { [key: string]: boolean } = {
    password: true,
    newPassword: true,
    confirmPassword: true
  };
  uId: string = ''; //only used when opened as admin, because otherwise the uid is in the cookie

  constructor(private formBuilder: FormBuilder,
    private responseService: ResponseService,
    public dialogRef: MatDialogRef<ChangePasswordPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any,) {
    this.myForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
    this.adminForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.oldPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.openAsAdmin === true) {
      this.openedAsAdmin = this.data.openAsAdmin;
      this.uId = this.data.user.properties.get('uId')?.value;
    }
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls?.['newPassword'].value;
    let confirmPass = group.controls?.['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true }
  }
  changePassword() {
    if (this.openedAsAdmin) {
      this.responseService.patchRequest('admin/change_password', { ...this.adminForm.value, "uId": this.uId }).subscribe(() => {
        this.dialogRef.close();
      });
    }
    else {
      this.responseService.patchRequest('handle_user/change_password', { ...this.oldPasswordForm.value, ...this.myForm.value }).subscribe(() => {
        this.dialogRef.close();
      });
    }
    console.log("change password");
  }
  close() {
    this.dialogRef.close();
  }
  changePasswordVisibility(key: string) {
    this.hidden[key] = !this.hidden[key];
  }
}
