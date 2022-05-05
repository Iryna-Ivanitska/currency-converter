import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { ICurrency } from 'src/app/interfaces/currency';

@Component({
  selector: 'app-converter-block',
  templateUrl: './converter-block.component.html',
  styleUrls: ['./converter-block.component.scss']
})

export class ConverterBlockComponent {
  public currenciesLabel = ['UAH', 'EUR', 'USD']
  @Input('currencies') currencies: ICurrency[]
  selectedTo = this.currenciesLabel[1]
  selectedFrom = this.currenciesLabel[0]

  @ViewChild('valueFrom') valueFrom: ElementRef;
  inputFrom: HTMLInputElement;
  @ViewChild('valueTo') valueTo: ElementRef;
  inputTo: HTMLInputElement;

  ngAfterViewInit() {
    this.inputFrom = this.valueFrom.nativeElement
    this.inputTo = this.valueTo.nativeElement
  }

  public inOrderExchange() {
    switch (true) {
      case (this.selectedFrom === 'UAH' && this.selectedTo === "USD"): {
        this.inputTo.value = this.exchangeUAHtoUSD(Number(this.inputFrom.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'UAH' && this.selectedTo === "EUR"): {
        this.inputTo.value = this.exchangeUAHtoEUR(Number(this.inputFrom.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'EUR' && this.selectedTo === "UAH"): {
        this.inputTo.value = this.exchangeEURtoUAH(Number(this.inputFrom.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'USD' && this.selectedTo === "UAH"): {
        this.inputTo.value = this.exchangeUSDtoUAH(Number(this.inputFrom.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'EUR' && this.selectedTo === "USD"): {
        this.inputTo.value = this.exchangeEURtoUSD(Number(this.inputFrom.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'USD' && this.selectedTo === "EUR"): {
        this.inputTo.value = this.exchangeUSDtoEUR(Number(this.inputFrom.value)).toFixed(2)
        break;
      }
      default: {
        this.inputTo.value = this.inputFrom.value;
        break
      };
    }
  }

  public reverseOrderExchange() {
    switch (true) {
      case (this.selectedFrom === 'UAH' && this.selectedTo === "USD"): {
        this.inputFrom.value = this.exchangeUSDtoUAH(Number(this.inputTo.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'UAH' && this.selectedTo === "EUR"): {
        this.inputFrom.value = this.exchangeEURtoUAH(Number(this.inputTo.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'EUR' && this.selectedTo === "UAH"): {
        this.inputFrom.value = this.exchangeUAHtoEUR(Number(this.inputTo.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'EUR' && this.selectedTo === "USD"): {
        this.inputFrom.value = this.exchangeUSDtoEUR(Number(this.inputTo.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'USD' && this.selectedTo === "UAH"): {
        this.inputFrom.value = this.exchangeUAHtoUSD(Number(this.inputTo.value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === 'USD' && this.selectedTo === "EUR"): {
        this.inputFrom.value = this.exchangeEURtoUSD(Number(this.inputTo.value)).toFixed(2)
        break;
      }
      default: {
        this.inputFrom.value = this.inputTo.value;
        break
      };
    }
  }

  exchangeUAHtoEUR(amount: number): number {
    return amount / this.currencies[1].sale
  }
  exchangeUAHtoUSD(amount: number): number {
    return amount / this.currencies[0].sale
  }
  exchangeEURtoUAH(amount: number): number {
    return amount * this.currencies[1].buy
  }
  exchangeUSDtoUAH(amount: number): number {
    return amount * this.currencies[0].buy
  }
  exchangeUSDtoEUR(amount: number): number {
    const amountUAH = this.exchangeUSDtoUAH(amount)
    return this.exchangeUAHtoEUR(amountUAH)
  }
  exchangeEURtoUSD(amount: number): number {
    const amountUAH = this.exchangeEURtoUAH(amount)
    return this.exchangeUAHtoUSD(amountUAH)
  }
}