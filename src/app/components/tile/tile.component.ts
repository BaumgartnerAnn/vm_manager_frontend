import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent  {
  @Input() value!: string;
  @Input() label!: string;
  @Input() color?: string;

  constructor() { 
    // get card
  }
}
