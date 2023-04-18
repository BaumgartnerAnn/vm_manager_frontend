import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let vm of data" (click)="selectVm.emit(vm)">
        {{ vm.name }}
      </li>
    </ul>
  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'vm_manager_frontend';
  variablename = 'Variable Value';

}
