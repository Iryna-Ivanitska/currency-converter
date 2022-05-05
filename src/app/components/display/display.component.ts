import { Component, Input } from '@angular/core';
import { ICurrency } from 'src/app/interfaces/currency';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @Input() currency: ICurrency;
}
