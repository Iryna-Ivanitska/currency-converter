import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { ICurrency } from './../../interfaces/currency';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public currencies: ICurrency[];
  sub = new Subscription;
  
  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.sub = this.currencyService.getData().subscribe(
      response => this.currencies = response
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
