import { Component, Input } from '@angular/core';
import { Template } from 'app/models/template';
import { MatDialog } from '@angular/material/dialog';
import { DeployPopUpComponent } from '../pop-up/deploy-pop-up/deploy-pop-up.component';
import { ResponseService } from 'app/services/response/response.service';

export interface DialogData {
  template: Template;
}

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css']
})
export class TemplateDetailComponent {
  @Input() templates!: Template[];
  @Input() template?: Template;
  @Input() NameOfButton: string = 'Deploy on my system';
  @Input() dozent_buttons: boolean = false;
  selectedTemplate: Template[] = []; // set initial selected Template array to empty


  constructor(private responseService: ResponseService,
    public dialog: MatDialog) { }

  onPanelOpen(template: Template) {
    if (!this.selectedTemplate.includes(template)) {
      this.selectedTemplate.push(template); // add the selected Template to the array
    }
  }

  onPanelClose(template: Template) {
    const index = this.selectedTemplate.indexOf(template);
    if (index !== -1) {
      this.selectedTemplate.splice(index, 1); // remove the selected Template from the array
    }
  }
  onDeployClick(template: Template): void {
    const dialogRef = this.dialog.open(DeployPopUpComponent, {
      width: '550px', height: '510px',
      data: { name: template.properties.get('name')?.value, dozent_buttons: this.dozent_buttons }
    });
  }

}

