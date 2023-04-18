// This is the user model for the admin page
export class UserDetailsModule {
  Username: string;
  Runnning_VMs: number;
  Total_VMs: number;
  Storage_used: number;
  RAM_used: number;
  CPU_used: number;
  constructor(Username: string, Runnning_VMs: number, Total_VMs: number, Storage_used: number, RAM_used: number, CPU_used: number) {
    this.Username = Username;
    this.Runnning_VMs = Runnning_VMs;
    this.Total_VMs = Total_VMs;
    this.Storage_used = Storage_used;
    this.RAM_used = RAM_used;
    this.CPU_used = CPU_used;
  }

  shownProperties(): string {
    const properties = Object.entries(this);
    const output = properties.map(([key, value]) => {
      const spacedKey = key.replace("_", " ");
      return `${spacedKey}: ${value}`;
    });
    return output.join("\n");
  }
}
