import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.page.html',
  styleUrls: ['./currency-calculator.page.scss'],
})
export class CurrencyCalculatorPage implements OnInit {
  amount!: number;
  fromCurrency: string = 'USD';
  toCurrency: string = 'MYR';
  result: number | null = null;
  currencies: string[] = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR']; // Add more currencies as needed

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  formatAmount() {
    if (this.amount !== null && this.amount !== undefined) {
      this.amount = parseFloat(this.amount.toFixed(2));
    }
  }

  convertCurrency() {
    const apiKey = 'fca_live_tWq5Nezkg3CVQXGnsVtpQd1JU3faxv61uH1VKXkl'; // Replace with your actual API key
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${this.toCurrency}&base_currency=${this.fromCurrency}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        console.log('API Response:', data); // Log the response to check its structure
        const rate = data.data[this.toCurrency]; // Adjusting to the correct response structure
        const rawResult = this.amount * rate;
        this.result = Math.round(rawResult * 100) / 100; // Round to 2 decimal places
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }
}
