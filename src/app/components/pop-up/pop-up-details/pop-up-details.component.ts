import { Component, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-pop-up-details',
  templateUrl: './pop-up-details.component.html',
  styleUrls: ['./pop-up-details.component.css']
})
export class PopUpDetailsComponent {
  @Input() type: string = '';
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() step_slider: number = 0;
  @Input() step_input: number = 0;
  @Input() maxlength: number = 0;
  @Output() name: string = '';
  @Output() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  ngOnInit() {
    this.value = this.min;
  }
}
