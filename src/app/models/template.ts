import { Property } from "./property";
import { DisplayService } from "../services/display/display.service";

export class Template {
  properties: Map<string, Property<any>> = new Map<string, Property<any>>();
  // saibers can define the RAM, storage, cores of the VM when creating the VM
  // create a vm
  showDetails: boolean = false;
  loaded: boolean = false // we check if the vm is loaded or not (lazy loading)
  constructor(name: string,
    displayService: DisplayService,
    ) {
    this.properties.set("name", new Property(name, displayService));
    this.showDetails = false;
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
