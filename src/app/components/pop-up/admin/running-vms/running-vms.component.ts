import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserDetailsModule } from 'app/models/user-details';
import { VM } from 'app/models/vm';
import { ProxmoxUser } from 'app/models/proxmox-user';
import { SortingService } from 'app/services/sorting/sorting';
import { forkJoin } from 'rxjs';
import { FetchService } from 'app/services/fetch/fetch.service';
import { ProxmoxNode } from 'app/models/proxmox-node';

@Component({
  selector: 'app-running-vms',
  styleUrls: ['running-vms.component.css'],
  templateUrl: 'running-vms.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class RunningVmsComponent {
  vm?: VM;
  vms!: VM[];
  UserVMInfos: UserDetailsModule[] = [];
  user?: UserDetailsModule;
  dataSource: any;
  dataUsers: any;
  dataNodes: any;
  display_after_username: boolean = true;
  columnsToDisplay = [
    'name',
    'Running VMs',
    'Total VMs',
    'Storage used',
    'RAM used',
    'CPU used',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: UserDetailsModule | null = null;

  constructor(
    private fetchService: FetchService,
    private sortVms: SortingService
  ) { }

  ngOnInit() {
    forkJoin([
      this.fetchService.getData<ProxmoxUser>('admin/get_all_user_vms', 'ProxmoxUser'),
      this.fetchService.getData<VM>('handle_vm/vm_names', 'VM'),
      this.fetchService.getData<ProxmoxNode>('admin/node_resources', 'ProxmoxNode')
    ]).subscribe(([users, vms, nodes]) => {
      this.vms = vms;
      this.dataUsers = this.sortVms.sortVmsByUser(this.vms, users);
      this.dataNodes = this.sortVms.sortVmsByProxmoxNode(this.vms, nodes);
      this.vms[0].showDetails = true;
      const all_cpu_available = this.dataNodes.reduce((acc: number, node: any) => {
        return acc + node.properties.get("CPU available").value
      }, 0); // Get the total number of CPU available

      this.dataUsers.forEach((user: any) => {
        // Get the percentage of CPU used by each user. Beforehand the CPU used was a absolute value of acctually used CPU, not a percentage
        user.properties.get("CPU used").value = (parseFloat(user.properties.get("CPU used").value) / parseInt(all_cpu_available)); //TODO: update this every n seconds
      });
      this.dataSource = this.dataUsers
    });
  }
  disableAnimation = true;
  ngAfterViewInit(): void {
  }
  expandRow(user: ProxmoxUser) {
    this.disableAnimation = true;
    this.vms = user.properties.get('vms')?.value;
    // Workaround for angular component issue #13870
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => (this.disableAnimation = false));
  }
  changeOrder() {
    if (this.display_after_username) {
      this.columnsToDisplay = [
        'name',
        'CPU available',
        'CPU used',
        'RAM available',
        'RAM used',
        'Status',
        'Storage available',
        'Storage used',
      ];
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
      this.dataSource = this.dataNodes;
    }
    else {
      this.columnsToDisplay = [
        'name',
        'Running VMs',
        'Total VMs',
        'Storage used',
        'RAM used',
        'CPU used',
      ];
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
      this.dataSource = this.dataUsers;
    }
    this.display_after_username = !this.display_after_username;
  }
}
