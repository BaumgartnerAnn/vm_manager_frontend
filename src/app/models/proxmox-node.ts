// This is a model class for a user.
// The selected boolean is used to determine if a template should be depoyed to a user.
import { Property } from "./property";
import { DisplayService } from "../services/display/display.service";
import { VM } from "./vm";

export class ProxmoxNode {
  properties: Map<string, Property<any>> = new Map<string, Property<any>>();
  
  loaded: boolean = false;
  selected: boolean = false;
  constructor(name: string,
    displayService: DisplayService,
    cpu_available: number = 0,
    cpu_used: number = 0,
    ram_available: number = 0,
    ram_used: number = 0,
    status: string = '',
    storage_available: number = 0,
    storage_used: number = 0,
    vms: VM[] = []
    ) {
    this.properties.set("name", new Property(name, displayService));
    this.properties.set("CPU available", new Property(cpu_available, displayService));
    this.properties.set("CPU used", new Property(cpu_used, displayService));
    this.properties.set("RAM available", new Property(ram_available, displayService));
    this.properties.set("RAM used", new Property(ram_used, displayService));
    this.properties.set("Status", new Property(status, displayService));
    this.properties.set("Storage available", new Property(storage_available, displayService));
    this.properties.set("Storage used", new Property(storage_used, displayService));
    this.properties.set("vms", new Property(vms, displayService));
    this.loaded = false;
  }
}