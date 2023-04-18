import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisplayService } from 'app/services/display/display.service';
import { ResponseService } from 'app/services/response/response.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-deploy-pop-up',
  templateUrl: './deploy-pop-up.component.html',
  styleUrls: ['./deploy-pop-up.component.css']
})
export class DeployPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<DeployPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private displayService: DisplayService,
    private responseService: ResponseService) { }
  @Input() template_name: string = this.data.name;
  @Input() dozent_buttons: boolean = this.data.dozent_buttons;
  name: string = '';
  nameForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  RAMMin: number = 512;
  CoresMin: number = 1;
  StorageMin: number = 20;
  RAM: number = this.RAMMin;
  Cores: number = this.CoresMin;
  Storage: number = this.StorageMin;

  formatLabel = (value: number | null): string => {
    return this.displayService.displayValue(value!.toString());
  }
  formatLabel2 = (value: number | null): string => {
    return value?.toString() || '';
  }
  Element1Change(newValue: number) {
    this.RAM = newValue;
  }
  Element2Change(newValue: number) {
    this.Cores = newValue;
  }
  Element3Change(newValue: number) {
    this.Storage = newValue;
  }
}