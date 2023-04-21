import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { DisplayService } from '../display/display.service';
import { ResponseService } from '../response/response.service';
import { VM } from 'app/models/vm';
import { ProxmoxNode } from 'app/models/proxmox-node';
import { Template } from 'app/models/template';
import { ProxmoxUser } from 'app/models/proxmox-user';
import { LdapEditProfileUser } from 'app/models/ldap-edit-profile-user';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  constructor(
    private displayService: DisplayService,
    private responseService: ResponseService,) { }
  test: any;

  getData<T>(endpoint: string, type_of_data: string): Observable<T[]> {
    return this.responseService.getRequest(endpoint).pipe(
      map((response: any) => {
          let data: any[];
          if (type_of_data === 'ProxmoxUser') {
            // we user 2 kind of user, ProxmoxUser and LdapEditProfileUser. Proxmox user are for admin/running-vms component, and show all proxmox user with their vms.
            data = response.map((proxmoxUser: any) => new ProxmoxUser(proxmoxUser.Username, this.displayService, proxmoxUser.storage_used, proxmoxUser.running_vms, proxmoxUser.total_vms, proxmoxUser.RAM_used, proxmoxUser.CPU_used));
          } else if (type_of_data === 'LdapEditProfileUser') {
            // LdapEditProfileUser are for the Ldap-card component, for editing the profile and are for the user handling in the admin panel.
            data = response.map((ldapEditProfileUser: any) => new LdapEditProfileUser(ldapEditProfileUser.givenName, ldapEditProfileUser.sn, ldapEditProfileUser.uid, this.displayService, ldapEditProfileUser.type_of_user, ldapEditProfileUser.wireguard));
            console.log(response)
            return data;
          } else if (type_of_data === 'VM') {
            data = response.map((vm: any) => new VM(vm.name, vm.vmid, this.displayService, vm.node_name));
          } else if (type_of_data === 'ProxmoxNode') {
            data = response.map((proxmoxNodes: any) => new ProxmoxNode(proxmoxNodes.node, this.displayService, proxmoxNodes.maxcpu, proxmoxNodes.cpu, proxmoxNodes.maxmem, proxmoxNodes.mem, proxmoxNodes.status, proxmoxNodes.maxdisk, proxmoxNodes.disk));
          } else if (type_of_data === 'Template') {
            data = response.map((templateName: { volid: string }) => {
              const template = new Template('', this.displayService);
              template.properties.get('name')?.setValue(templateName.volid.substring(10, templateName.volid.length));
              return template;
            });
          } else {
            throw new Error(`Unsupported type of data: ${type_of_data}`);
          }
          data.sort((a, b) => a.properties.get('name')!.value.localeCompare(b.properties.get('name')!.value));
          return data;
      })
    );
  }
}
