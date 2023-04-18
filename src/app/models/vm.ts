import { Property } from "./property";
import { DisplayService } from "../services/display/display.service";

export class VM {
    properties: Map<string, Property<any>> = new Map<string, Property<any>>();
    // saibers can define the RAM, storage, cores of the VM when creating the VM
    // create a vm
    showDetails: boolean = false;
    loaded: boolean = false // we check if the vm is loaded or not (lazy loading)
    constructor(name: string,
        vmid: number,
        displayService: DisplayService,
        node_name: string,
        cpus: number = 0,
        maxdisk: number = 0,
        maxmem: number = 0,
        ostype: string = "",
        status: string = "") {
            
        this.properties.set("name", new Property(name, displayService));
        this.properties.set("CPU available", new Property(cpus, displayService));
        this.properties.set("Max Storage", new Property(maxdisk, displayService));
        this.properties.set("Max RAM", new Property(maxmem, displayService));
        this.properties.set("OS", new Property(ostype, displayService));
        this.properties.set("Status", new Property(status, displayService));
        this.properties.set("VM ID", new Property(vmid, displayService, false, false));
        this.properties.set("Node name", new Property(node_name, displayService, false, false));

        this.showDetails = false;
        this.loaded = false;
    }

    get shownProperties(): Map<string, Property<any>> {
        let properties = new Map<string, Property<any>>();

        this.properties.forEach((value, key) => {
            if (key !== "name" && key) {
                properties.set(key, value);
            }
        });

        return properties;
    }
}