import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VM } from 'app/models/vm';
import { LdapEditProfileUser } from 'app/models/ldap-edit-profile-user';

@Component({
  selector: 'app-vm-list',
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.css']
})
export class VmListComponent {
  @Input() vms: VM[] = [];
  @Input() user: LdapEditProfileUser = LdapEditProfileUser.createEmptyUser();
}

