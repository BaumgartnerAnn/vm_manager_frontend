import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseService } from 'app/services/response/response.service';
import { LdapEditProfileUser } from 'app/models/ldap-edit-profile-user';
import { DisplayService } from 'app/services/display/display.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  adminForm!: FormGroup;
  constructor(
    public responseService: ResponseService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private displayService: DisplayService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.adminForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  hidden: { [key: string]: boolean } = {newPassword: true};
  firstname: string = '';
  lastname: string = '';
  typeOfUser: string = '';
  typeOfUsers: string[] = ['cyber', 'lieutenant', 'teacher', 'admin'];
  wireguard: boolean = false;
  isNewUser: boolean = false;
  Title: string = 'Edit User';
  buttonTitle: string = 'Apply Changes'
  dataSource?: any;
  classId: string = ''; //only used for new users
  newUser: LdapEditProfileUser[] = [];

  ngOnInit(): void {
    console.log(this.newUser)
    console.log(this.data)
    this.firstname = this.data.user.properties.get('firstname')?.value;
    this.lastname = this.data.user.properties.get('lastname')?.value;
    this.wireguard = this.data.user.properties.get('wireguard')?.value;
    this.isNewUser = this.data.isNewUser;
    if (this.isNewUser) {
      this.Title = 'Create User';
      this.buttonTitle = 'Create User'
      this.dataSource = this.data.dataSource;
    }
  }
  applyChanges() {
    if (this.isNewUser) {
      this.responseService.postRequest('admin/create_user', { "firstname": this.firstname, "lastname": this.lastname, "password": this.adminForm.value['newPassword'], "wireguard": this.wireguard, "typeOfUser": this.typeOfUser, "class_id": this.classId }).subscribe((response) => {
        this.newUser = response.map((ldapEditProfileUser: any) => new LdapEditProfileUser(ldapEditProfileUser.givenName, ldapEditProfileUser.sn, ldapEditProfileUser.uid, this.displayService, ldapEditProfileUser.type_of_user, ldapEditProfileUser.wireguard));
        this.dialogRef.close(this.newUser);
      });
    }
    else {
      this.responseService.patchRequest('admin/edit_user', { "firstname": this.firstname, "lastname": this.lastname, "wireguard": this.wireguard, "uId": this.data.user.properties.get('uId')?.value }).subscribe(() => {});
      this.data.user.properties.get('firstname')!.value = this.firstname;
      this.data.user.properties.get('lastname')!.value = this.lastname;
      this.dialogRef.close();
    }
  };
  setWireguard() {
    this.data.user.properties.get('wireguard')!.value = this.wireguard;
  };
  changeTypeOfUser(selectedValue: string) {
    this.typeOfUser = selectedValue;
  }
  changePasswordVisibility(key: string) {
    this.hidden[key] = !this.hidden[key];
  }
}
