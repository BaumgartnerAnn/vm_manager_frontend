import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordPopUpComponent } from 'app/components/pop-up/change-password-pop-up/change-password-pop-up.component';
import { FetchService } from 'app/services/fetch/fetch.service';
import { LdapEditProfileUser } from 'app/models/ldap-edit-profile-user';
import { DisplayService } from 'app/services/display/display.service';
import { UploadSshKeyPopUpComponent } from 'app/components/pop-up/upload-ssh-key-pop-up/upload-ssh-key-pop-up.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  // the users array is only one user, but it is an array because the fetch service returns an array (we reuse the same fetch service for other components)
  constructor(private fetchService: FetchService,
    private displayService: DisplayService,
    private dialog: MatDialog) { }
  users: LdapEditProfileUser[] = [];

  ngOnInit(): void {
    // first create a default user, so that the page doesn't display errors till the fetch service returns the user
    this.users[0] = LdapEditProfileUser.createEmptyUser();
    this.fetchService.getData<LdapEditProfileUser>('handle_user/user_info', 'LdapEditProfileUser').subscribe((users: LdapEditProfileUser[]) => {
      this.users = users
      console.log(this.users)
    });
  }
  changePassword() {
    this.dialog.open(ChangePasswordPopUpComponent, {});
  }
  uploadWireguard() {
    this.dialog.open(UploadSshKeyPopUpComponent, { width: '760px' })
  }
  uploadShareKey(){
    this.dialog.open(UploadSshKeyPopUpComponent, { width: '760px', data: { openAsShareKey: true } })
  }
}
