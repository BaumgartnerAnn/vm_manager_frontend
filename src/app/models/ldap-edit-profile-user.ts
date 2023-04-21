// The selected boolean is used to determine if a template should be depoyed to a user.
// ldap users are for the Ldap-card component, --> user handling for ldap in the admin panel.
import { Property } from "./property";
import { DisplayService } from "../services/display/display.service";

export class LdapEditProfileUser {
  properties: Map<string, Property<any>> = new Map<string, Property<any>>();
  loaded: boolean = false;
  selected: boolean = false //used to select user when deploying a template

  constructor(firstname: string,
    lastname: string,
    uId: number | string | null, //only null for new users
    displayService: DisplayService,
    typeOfUser: string = '', //types are saiber, loefti, dozent, admin
    wireguard: boolean = false,
  ) {
    this.properties.set("firstname", new Property(firstname, displayService));
    this.properties.set("lastname", new Property(lastname, displayService));
    this.properties.set("uId", new Property(uId, displayService));
    this.properties.set("typeOfUser", new Property(typeOfUser, displayService));
    this.properties.set("wireguard", new Property(wireguard, displayService));
    this.loaded = false;
  }
  static createEmptyUser(): LdapEditProfileUser {
    return new LdapEditProfileUser("", "", "", new DisplayService(), '', false);
  }
}
