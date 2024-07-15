import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

// Register the components globally
Chart.register(...registerables);

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.page.html',
  styleUrls: ['./expense-chart.page.scss'],
})
export class ExpenseChartPage implements OnInit {
  transactions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getTransactions(parseInt(userId, 10));
    }
  }

  getTransactions(userId: number) {
    this.http.get<any[]>(`http://localhost/finance-tracker/get-transaction.php?user_id=${userId}`)
      .subscribe(
        (response: any[]) => {
          this.transactions = response;
          this.generateDoughnutChart();
          this.generateLineChart();
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
  }

  generateDoughnutChart() {
    const categories = [...new Set(this.transactions.map(transaction => transaction.category))];
    const categoryTotals = categories.map(category => {
      return this.transactions
        .filter(transaction => transaction.category === category)
        .reduce((total, transaction) => total + transaction.amount, 0);
    });
           
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: categoryTotals,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Average Daily Expenses by Category'
          }
        }
      }
    });
  }
      
  generateLineChart() {
    const lastThreeMonths = this.getLastThreeMonths();
    const monthTotals = lastThreeMonths.map(month => {
      return this.transactions
        .filter(transaction => this.isTransactionInMonth(transaction, month))
        .reduce((total, transaction) => total + transaction.amount, 0);
    });
  
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: lastThreeMonths,
        datasets: [{
          label: 'Expenses',
          data: monthTotals,
          fill: false,
          borderColor: '#36A2EB'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Expenses for the Last 3 Months'
          }
        }
      }
    });
  }  

  getLastThreeMonths(): string[] {
    const date = new Date();
    const months = [];
    for (let i = 0; i < 3; i++) {
      months.push(date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear());
      date.setMonth(date.getMonth() - 1);
    }
    return months.reverse();
  }

  isTransactionInMonth(transaction: any, month: string): boolean {
    const date = new Date(transaction.date);
    const transactionMonth = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
    return transactionMonth === month;
  }
}