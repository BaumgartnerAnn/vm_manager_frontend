import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-mat-car-detail',
  templateUrl: './admin-mat-car-detail.component.html',
  styleUrls: ['./admin-mat-car-detail.component.css']
})
export class AdminMatCarDetailComponent {
  constructor(public dialog: MatDialog) { }
  @Input() running: number = 0;
  @Input() stopped: number = 0;
  @Input() card_title: string = '';
}
