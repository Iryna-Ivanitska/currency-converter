import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { CurrencyLabels, ICurrency } from 'src/app/interfaces/currency';

@Component({
  selector: 'app-converter-block',
  templateUrl: './converter-block.component.html',
  styleUrls: ['./converter-block.component.scss']
})

export class ConverterBlockComponent {
  public currenciesLabel = [CurrencyLabels.UAH, CurrencyLabels.EUR, CurrencyLabels.USD]
  @Input('currencies') currencies: ICurrency[]
  selectedTo = this.currenciesLabel[1]
  selectedFrom = this.currenciesLabel[0]

  @ViewChild('valueFrom') valueFrom: ElementRef;
  public inputFrom: HTMLInputElement;
  @ViewChild('valueTo') valueTo: ElementRef;
  public inputTo: HTMLInputElement;

  ngAfterViewInit(): void {
    this.inputFrom = this.valueFrom.nativeElement
    this.inputTo = this.valueTo.nativeElement
  }

  public inOrderExchange(value: string, reverse = false): void {
    let sum: string;
    switch (true) {
      case (this.selectedFrom === CurrencyLabels.UAH && this.selectedTo === CurrencyLabels.USD): {
        sum = reverse 
          ? this.exchangeUSDtoUAH(Number(value)).toFixed(2)
          : this.exchangeUAHtoUSD(Number(value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === CurrencyLabels.UAH && this.selectedTo === CurrencyLabels.EUR): {
        sum = reverse 
          ? this.exchangeEURtoUAH(Number(value)).toFixed(2)
          : this.exchangeUAHtoEUR(Number(value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === CurrencyLabels.EUR && this.selectedTo === CurrencyLabels.UAH): {
        sum = reverse 
          ? this.exchangeUAHtoEUR(Number(value)).toFixed(2)
          : this.exchangeEURtoUAH(Number(value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === CurrencyLabels.USD && this.selectedTo === CurrencyLabels.UAH): {
        sum = reverse
          ? this.exchangeUAHtoUSD(Number(value)).toFixed(2)
          : this.exchangeUSDtoUAH(Number(value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === CurrencyLabels.EUR && this.selectedTo === CurrencyLabels.USD): {
        sum = reverse 
          ? this.exchangeUSDtoEUR(Number(value)).toFixed(2)
          : this.exchangeEURtoUSD(Number(value)).toFixed(2)
        break;
      }
      case (this.selectedFrom === CurrencyLabels.USD && this.selectedTo === CurrencyLabels.EUR): {
        sum = reverse
          ? this.exchangeEURtoUSD(Number(this.inputFrom.value)).toFixed(2)
          : this.exchangeUSDtoEUR(Number(this.inputFrom.value)).toFixed(2)
        break;
      }
      default: {
        sum = value.toString();
        break
      };
    }
    if (!reverse) {
      this.inputTo.value = sum
    } else {
      this.inputFrom.value = sum
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
 
  switchCurrencies() {
    let cur = this.selectedFrom;
    this.selectedFrom = this.selectedTo;
    this.selectedTo = cur;
    this.inOrderExchange(this.inputFrom.value);
  }
}