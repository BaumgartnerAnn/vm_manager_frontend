import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Template } from 'app/models/template';
import { FetchService } from 'app/services/fetch/fetch.service';


@Component({
  selector: 'app-dozent',
  templateUrl: './dozent.component.html',
  styleUrls: ['./dozent.component.css'],
  providers: [HomeComponent]
})
export class DozentComponent {
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
