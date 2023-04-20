import { Component,  Output } from '@angular/core';
import { VM } from 'app/models/vm';
import { FetchService } from 'app/services/fetch/fetch.service';
import { ResponseService } from 'app/services/response/response.service';
import { forkJoin } from 'rxjs';
import { LdapEditProfileUser } from 'app/models/ldap-edit-profile-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  vms: VM[] = [];
  selectedVm?: VM;
  users: LdapEditProfileUser[] = [];
  user: LdapEditProfileUser = LdapEditProfileUser.createEmptyUser();

  constructor(private fetchService: FetchService, private responseService: ResponseService) { }

  ngOnInit() {
    forkJoin([
      this.fetchService.getData<LdapEditProfileUser>('handle_user/user_info', 'LdapEditProfileUser'),
      this.fetchService.getData<VM>('handle_vm/vm_names', 'VM'),
    ]).subscribe(([user, vms]) => {
      this.vms = vms;
      this.users = user;
      this.user = user[0];
    });
  }

onSelectVm(vm: VM) {
  if (this.selectedVm === vm) {
    this.selectedVm = undefined;
  } else {
    this.selectedVm = vm;
  }
}

onCloseDetails() {
  this.selectedVm = undefined;
}
}
