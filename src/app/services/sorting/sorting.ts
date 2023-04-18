import { Injectable } from '@angular/core';
import { VM } from 'app/models/vm';
import { ProxmoxNode } from 'app/models/proxmox-node';
import { ProxmoxUser } from 'app/models/proxmox-user';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }
  sortVmsByUser(vms: VM[], users: ProxmoxUser[]): ProxmoxUser[] {
    const coreServiceVms = vms.filter(vm => vm.properties.get('VM ID')?.value < 1000000);
    const unknownUserVms = vms.filter(vm => vm.properties.get('VM ID')?.value > 10000000);
    
    const userVms = vms.filter(vm => vm.properties.get('VM ID')?.value > 1000000 && vm.properties.get('VM ID')?.value < 10000000);
    users.forEach(user => {
      if (user.properties.get('name')?.value === 'CoreServices') {
        user.properties.get('vms')!.value = coreServiceVms;
      } else if (user.properties.get('name')?.value === 'unknown') {
        user.properties.get('vms')!.value = unknownUserVms;
      } else {
        const UserID = user.properties.get('name')?.value.slice(2);
        user.properties.get('vms')!.value = vms.filter(vm =>user.properties.get('name')?.value.slice(2) === vm.properties.get('VM ID')?.value.toString().slice(0, -1));
      }
    });
    return users;
  }
  sortVmsByProxmoxNode(vms: VM[], proxmoxnodes: ProxmoxNode[]): ProxmoxNode[] {
    proxmoxnodes.forEach(proxmoxnode => {
      proxmoxnode.properties.get('vms')!.value = vms.filter(vm => vm.properties.get('Node name')?.value === proxmoxnode.properties.get('name')?.value);
    });
    return proxmoxnodes;
  }
}  