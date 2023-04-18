import { DisplayService } from "../services/display/display.service";
// this is a property class. The property class is used to define the properties of a Vm and a Template.
// For every property, there is a name and a clipboard boolean.
// The clipboard boolean is used to determine if there is a copy to clipboard button for that property.
export class Property<T> {
  value: T;
  clipboard: boolean = false;
  displayed: boolean = true;

  constructor(value: T,
    private displayService: DisplayService,
    clipboard: boolean = false,
    displayed: boolean = true
  ) {
    this.value = value;
    this.clipboard = clipboard;
    this.displayed = displayed;
  }
  get displayValue(): string {
    return this.displayService.displayValue(this.value as any);
  }
  setValue(value: any): void {
    this.value = value;
  }
}

