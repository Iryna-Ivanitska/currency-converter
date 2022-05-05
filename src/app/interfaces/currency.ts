export interface ICurrency {
  ccy: string,
  base_ccy: string,
  buy: number,
  sale: number,
}

export enum CurrencyLabels {
  USD = "USD",
  UAH = "UAH",
  EUR = "EUR",
}