// This is a model class for a user.
// The selected boolean is used to determine if a template should be depoyed to a user.
// Proxmox users are for the prxomx user. A proxmox user is based on the vms, so a user without vms is not a proxmox user.
import { Property } from "./property";
import { DisplayService } from "../services/display/display.service";
import { VM } from "./vm";

export class ProxmoxUser {
  properties: Map<string, Property<any>> = new Map<string, Property<any>>();
  
  loaded: boolean = false;
  selected: boolean = false;
  constructor(name: string,
    displayService: DisplayService,
    storage_used: number = 0,
    running_vms: number = 0,
    total_vms: number = 0,
    ram_used: number = 0,
    cpu_used: number = 0,
    vms: VM[] = [],
    ) {

    this.properties.set("name", new Property(name, displayService));
    this.properties.set("Storage used", new Property(storage_used, displayService));
    this.properties.set("Running VMs", new Property(running_vms, displayService));
    this.properties.set("Total VMs", new Property(total_vms, displayService));
    this.properties.set("RAM used", new Property(ram_used, displayService));
    this.properties.set("CPU used", new Property(cpu_used, displayService));
    this.properties.set("vms", new Property(vms, displayService));
    this.loaded = false;
  }

}


