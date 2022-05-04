import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurrency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  BASE_URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<ICurrency[]>(this.BASE_URL)
  }
}
