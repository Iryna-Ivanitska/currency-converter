import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurrency } from '../interfaces/currency';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  BASE_URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<ICurrency[]>(this.BASE_URL).pipe(
      map(response => response.map( el => ({
        ccy: el.ccy,
        base_ccy: el.base_ccy,
        buy: Number(el.buy),
        sale: Number(el.sale)
      })).filter(el => el.ccy != "BTC")
      )
      )
  }
}
