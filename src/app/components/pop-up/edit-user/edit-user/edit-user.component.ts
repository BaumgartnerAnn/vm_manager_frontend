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
  firstname: string = "";
  lastname: string = "";
  wireguard: boolean = false;
  newUser: boolean = false;
  Title: string = 'Edit User';
  buttonTitle: string = 'Apply Changes'
  dataSource?: any;
  type: string = ""; //only used for new users
  password: string = ""; //only used for new users
  class_id: string = ""; //only used for new users

  ngOnInit(): void {
    console.log(this.data)
    this.firstname = this.data.user.properties.get('firstname')?.value;
    this.lastname = this.data.user.properties.get('lastname')?.value;
    this.gId = this.data.user.properties.get('gIds')?.value;
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
      this.responseService.postRequest('admin/create_user', { "firstname": this.firstname, "lastname": this.lastname, "gId": this.gId, "wireguard": this.wireguard });
      const newUser = new LdapEditProfileUser(this.firstname, this.lastname, null, new DisplayService(), this.gId, this.wireguard);
      this.dataSource.push(newUser);
      console.log(this.dataSource);
      this.dialogRef.close();
    }
    else {
      this.responseService.patchRequest('admin/edit_user', { "firstname": this.firstname, "lastname": this.lastname, "gId": this.gId, "previousGId": this.data.user.properties.get('gIds')?.value, "wireguard": this.wireguard, "uId": this.data.user.properties.get('uId')?.value });
      this.data.user.properties.get('firstname')!.value = this.firstname;
      this.data.user.properties.get('lastname')!.value = this.lastname;
      this.data.user.properties.get('gIds')!.value = this.gId;
      this.dialogRef.close();
    }
  };
  setWireguard() {
    this.data.user.properties.get('wireguard')!.value = this.wireguard;
  };
}
