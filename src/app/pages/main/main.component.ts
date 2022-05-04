import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { ICurrency } from './../../interfaces/currency';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public currencyUSD: ICurrency;
  public currencyEUR: ICurrency;
  
  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getData().subscribe(
      response => {
        this.currencyUSD = response[0];
        this.currencyEUR = response[1];
      }
    )
  }

}
