import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadPopUpComponent } from '../pop-up/upload-pop-up/upload-pop-up.component';
import { FetchService } from 'app/services/fetch/fetch.service';
import { LdapEditProfileUser } from 'app/models/ldap-edit-profile-user';
import { ResponseService } from 'app/services/response/response.service';
import { ConfirmationPopUpComponent } from '../pop-up/pop-up-buttons/confirmation-pop-up/confirmation-pop-up.component';
import { EditUserComponent } from '../pop-up/edit-user/edit-user/edit-user.component';
import { ChangePasswordPopUpComponent } from '../pop-up/change-password-pop-up/change-password-pop-up.component';
import { ActionOnClassComponent } from '../pop-up/action-on-class/action-on-class.component';

@Component({
  selector: 'app-ldap-card',
  templateUrl: './ldap-card.component.html',
  styleUrls: ['./ldap-card.component.css']
})
export class LdapCardComponent {
  dataSource: LdapEditProfileUser[] = [];
  columnsToDisplay = [
    'firstname',
    'lastname',
    'uId',
    'typeOfUser',
    ' ', //this is for the icons to modify a user
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  constructor(private dialog: MatDialog,
    private responseService: ResponseService,
    private fetchService: FetchService) { }

  ngOnInit() {
    this.fetchService.getData<LdapEditProfileUser>('admin/ldap_users', 'LdapEditProfileUser').subscribe((data) => {
      data.sort((a, b) => a.properties.get('firstname')!.value.localeCompare(b.properties.get('firstname')!.value));
      this.dataSource = data;
    }
    );
  }
  tableColumnName(columnName: string) {
    switch (columnName) {
      case 'firstname':
        return 'First Name';
      case 'lastname':
        return 'Last Name';
      case 'uId':
        return 'User ID';
      case 'typeOfUser':
        return 'Type of User';
      default:
        return columnName;
    }
  }

  onfileUploadPopUp() {
    this.dialog.open(UploadPopUpComponent)
  }
  confirmChange() {
    this.responseService.postRequest('admin/change_users', this.dataSource).subscribe((data) => {
      console.log(this.dataSource);
    });
  }
  deleteUser(element: LdapEditProfileUser) {
    const deleteDialog = this.dialog.open(ConfirmationPopUpComponent, {
      width: '290px',
      data: { description: "Are you sure you want to delete " + element.properties.get('firstname')?.value + " " + element.properties.get('lastname')?.value, buttonTitle: "Delete", title: "Delete User", buttonColor: "warn" }
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter((user) => user !== element);
        this.responseService.postRequest('admin/delete_user', { "uId": element.properties.get('uId')?.value }).subscribe(() => { });
      }
    });
  }
  archiveUser(element: LdapEditProfileUser) {
    const archiveDialog = this.dialog.open(ConfirmationPopUpComponent, {
      width: '290px',
      data: { description: "Are you sure you want to archive " + element.properties.get('firstname')?.value + " " + element.properties.get('lastname')?.value, buttonTitle: "Archive", title: "Archive User", buttonColor: "primary" }
    });
    archiveDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.find((user) => user === element)!.properties.get('typeOfUser')!.value = "archived";
        this.responseService.postRequest('admin/archive_user', { "uId": element.properties.get('uId')?.value }).subscribe(() => { });
      }
    });
  }
  editUser(element: LdapEditProfileUser) {
    this.dialog.open(EditUserComponent, {
      data: { user: element, isNewUser: false }
    })
  }
  createUser() {
    const createUserPopUp = this.dialog.open(EditUserComponent, {
      data: { user: LdapEditProfileUser.createEmptyUser(), isNewUser: true, dataSource: this.dataSource }
    })
    createUserPopUp.afterClosed().subscribe(newUser => {
      if (newUser != undefined) {
        this.dataSource = [...this.dataSource, newUser[0]];
        this.dataSource = this.dataSource.slice();
      }
    });
  }
  changePassword(element: LdapEditProfileUser) {
    this.dialog.open(ChangePasswordPopUpComponent, {
      data: { openAsAdmin: true, user: element }
    })
  }
  sortData(sort: any) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }
    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const property = sort.active;
      return compare(a.properties.get(property)!.value, b.properties.get(property)!.value, isAsc);
    });
  }
  archiveClass() {
    const archiveClassDialog = this.dialog.open(ActionOnClassComponent, {
      data: { openAsDelete: false }
    });
    archiveClassDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.forEach((user) => {
          if (user.properties.get('typeOfUser')!.value === "cyber" && user.properties.get('uId')!.value.substring(2, 6) === result) {
                user.properties.get('typeOfUser')!.value = "archived";
          }
        });
      }
    });
  }
  deleteClass() {
    const deleteClassDialog = this.dialog.open(ActionOnClassComponent, {
      data: { openAsDelete: true }
    });
    deleteClassDialog.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter((user) => user.properties.get('uId')!.value.substring(2, 6) !== result);
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}