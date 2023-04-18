import { Component, OnInit } from '@angular/core';
import { Template } from 'app/models/template';
import { FetchService } from 'app/services/fetch/fetch.service';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})

export class DeployComponent {
  value = 50;
  min = 0;
  max = 100;
  step = 1;
  numberOfCores: string = '1';

  templates: Template[] = [];
  selectedTemplate?: Template;

  constructor(private fetchService: FetchService) { }

  ngOnInit() {
    this.fetchService.getData<Template>('handle_template/template_names', 'Template').subscribe((templates: Template[]) => {
      this.templates = templates;
    });
  }

  onSelectTemplate(template: Template) {
    if (this.selectedTemplate === template) {
      this.selectedTemplate = undefined;
    } else {
      this.selectedTemplate = template;
    }
  }

  onCloseDetails() {
    this.selectedTemplate = undefined;
  }

}