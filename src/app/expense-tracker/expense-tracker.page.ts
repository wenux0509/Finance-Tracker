import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.page.html',
  styleUrls: ['./expense-tracker.page.scss'],
})
export class ExpenseTrackerPage implements OnInit {
  username: string = '';
  transactions: any[] = [];
  transactionsByMonth: { [key: string]: any[] } = {};
  loading: boolean = true; // Add loading indicator
  searchCategory: string = ''; // Search category
  filteredTransactionsByMonth: { [key: string]: any[] } = {};

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getUsername();

    // Subscribe to router events to detect navigation back from add-transaction or edit-transaction page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event.url);
        this.refreshTransactionsIfNecessary(event.url);
      }
    });

    // Check for query parameter indicating a refresh is needed
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        this.refreshTransactions();
      }
    });
  }

  getUsername() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.http.get<any>(`http://localhost/finance-tracker/get-user.php?user_id=${userId}`)
        .subscribe(
          (response: any) => {
            this.username = response.username || '';
            this.getTransactions(parseInt(userId, 10)); // Parse userId to number
          },
          (error) => {
            console.error('Error fetching username:', error);
          }
        );
    } else {
      console.error('User ID not found in local storage');
    }
  }

  getTransactions(userId: number) {
    this.loading = true; // Set loading indicator
    this.http.get<any[]>(`http://localhost/finance-tracker/get-transaction.php?user_id=${userId}`)
      .subscribe(
        (response: any[]) => {
          this.transactions = response;
          this.transactionsByMonth = this.groupTransactionsByMonth(response);
          this.filteredTransactionsByMonth = this.transactionsByMonth;
          this.loading = false; // Update loading indicator
        },
        (error) => {
          console.error('Error fetching transactions:', error);
          this.loading = false; // Update loading indicator even on error
        }
      );
  }

  groupTransactionsByMonth(transactions: any[]): { [key: string]: any[] } {
    const grouped: { [key: string]: any[] } = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(transaction);
    });
    return grouped;
  }

  getTotalAmount(transactions: any[]): number {
    return transactions.reduce((total, transaction) => total + Number(transaction.amount), 0);
  }

  refreshTransactionsIfNecessary(url: string) {
    // Check if the URL contains '/add-transaction' or '/edit-transaction'
    if (url.includes('/add-transaction') || url.includes('/edit-transaction')) {
      console.log('Refreshing transactions...');
      this.refreshTransactions();
    }
  }

  filterTransactions() {
    const searchCategoryLower = this.searchCategory.toLowerCase();
    this.filteredTransactionsByMonth = {};
    Object.keys(this.transactionsByMonth).forEach(month => {
      const filteredTransactions = this.transactionsByMonth[month].filter(transaction =>
        transaction.category.toLowerCase().includes(searchCategoryLower)
      );
      if (filteredTransactions.length > 0) {
        this.filteredTransactionsByMonth[month] = filteredTransactions;
      }
    });
  }

  addTransaction() {
    this.router.navigate(['/add-transaction']);
  }

  editTransaction(transactionId: number) {
    this.router.navigate([`/edit-transaction/${transactionId}`]);
  }

  deleteTransaction(transactionId: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.http.delete(`http://localhost/finance-tracker/delete-transaction.php?transaction_id=${transactionId}`)
        .subscribe(
          () => {
            this.transactions = this.transactions.filter(t => t.id !== transactionId);
            this.transactionsByMonth = this.groupTransactionsByMonth(this.transactions);
            this.filterTransactions();
          },
          (error) => {
            console.error('Error deleting transaction:', error);
          }
        );
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  refreshTransactions() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getTransactions(parseInt(userId, 10));
    }
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}







