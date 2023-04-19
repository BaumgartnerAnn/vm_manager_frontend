import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseService } from 'app/services/response/response.service';
import { LdapEditProfileUser } from 'app/models/ldap-edit-profile-user';
import { DisplayService } from 'app/services/display/display.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  constructor(
    public responseService: ResponseService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  firstname: string = '';
  lastname: string = '';
  typeOfUser: string = '';
  typeOfUsers: string[] = ['saiber', 'loefti', 'dozent', 'admin'];
  wireguard: boolean = false;
  newUser: boolean = false;
  Title: string = 'Edit User';
  buttonTitle: string = 'Apply Changes'
  dataSource?: any;
  password: string = ''; //only used for new users
  classId: string = ''; //only used for new users

  ngOnInit(): void {
    console.log(this.data)
    this.firstname = this.data.user.properties.get('firstname')?.value;
    this.lastname = this.data.user.properties.get('lastname')?.value;
    this.typeOfUser = this.data.user.properties.get('typeOfUser')?.value;
    this.wireguard = this.data.user.properties.get('wireguard')?.value;
    this.newUser = this.data.newUser;
    if (this.newUser) {
      this.Title = 'Create User';
      this.buttonTitle = 'Create User'
      this.dataSource = this.data.dataSource;
      console.log(this.dataSource)
    }
  }
  applyChanges() {
    if (this.newUser) {
      // this.responseService.postRequest('admin/create_user', { "firstname": this.firstname, "lastname": this.lastname, "password": this.password, "wireguard": this.wireguard, "typeOfUser": this.typeOfUser, "class_id": this.classId }).subscribe(() => {});
      const newUser = new LdapEditProfileUser(this.firstname, this.lastname, null, new DisplayService(), this.typeOfUser, this.wireguard);
      this.dialogRef.close(newUser);
    }
    else {
      this.responseService.patchRequest('admin/edit_user', { "firstname": this.firstname, "lastname": this.lastname, "typeOfUser": this.typeOfUser, "previousGId": this.data.user.properties.get('typeOfUser')?.value, "wireguard": this.wireguard, "uId": this.data.user.properties.get('uId')?.value });
      this.data.user.properties.get('firstname')!.value = this.firstname;
      this.data.user.properties.get('lastname')!.value = this.lastname;
      this.data.user.properties.get('typeOfUser')!.value = this.typeOfUser;
      this.dialogRef.close();
    }
  };
  setWireguard() {
    this.data.user.properties.get('wireguard')!.value = this.wireguard;
  };
  changeTypeOfUser(selectedValue: string) {
    this.typeOfUser = selectedValue;
  }
}
