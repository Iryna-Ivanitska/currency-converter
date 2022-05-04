import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ICurrency } from 'src/app/interfaces/currency';


@Component({
  selector: 'app-converter-block',
  templateUrl: './converter-block.component.html',
  styleUrls: ['./converter-block.component.scss']
})
export class ConverterBlockComponent implements OnInit {
  public currenciesLabel = ['UAH', 'EUR', 'USD']
  @Input('currencies') currencies: ICurrency[]
  selectedTo = this.currenciesLabel[1]
  selectedFrom = this.currenciesLabel[0]

  @ViewChild('valueFrom') valueFrom: ElementRef;
  inputFrom: HTMLInputElement;
  @ViewChild('valueTo') valueTo: ElementRef;
  inputTo: HTMLInputElement;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.inputFrom = this.valueFrom.nativeElement
    this.inputTo = this.valueTo.nativeElement
  }

  public inOrderExchange() {
    switch (true) {
      case (this.selectedFrom === 'UAH' && this.selectedTo === "USD"): {
        this.inputTo.value = (Number(this.inputFrom.value) / this.currencies[0].sale).toFixed(2);
        break;
      }
      case (this.selectedFrom === 'UAH' && this.selectedTo === "EUR"): {
        this.inputTo.value = (Number(this.inputFrom.value) / this.currencies[1].sale).toFixed(2);
        break;
      }
    }
    // console.log(this.currencies);
    // console.log('inputFrom:', this.inputFrom.value);
    // console.log('inputTo:', this.inputTo.value);
    // console.log('toSelect:', this.selectedTo);
    // console.log('fromSelect:', this.selectedFrom);
  }

}
