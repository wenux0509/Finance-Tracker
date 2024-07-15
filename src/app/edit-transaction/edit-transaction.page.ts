import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.page.html',
  styleUrls: ['./edit-transaction.page.scss'],
})
export class EditTransactionPage implements OnInit {
  transaction: any = {
    amount: 0,
    category: '',
    date: '',
    notes: '',
    location: '',
    user_id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const transactionIdParam = this.route.snapshot.paramMap.get('id');
    if (transactionIdParam) {
      const transactionId = parseInt(transactionIdParam, 10);
      if (!isNaN(transactionId)) {
        this.getTransaction(transactionId);
      } else {
        console.error('Invalid transaction ID:', transactionIdParam);
      }
    } else {
      console.error('Transaction ID not found in route parameters');
    }
  }

  getTransaction(transactionId: number) {
    this.http.get<any>(`http://localhost/finance-tracker/get-transaction.php?transaction_id=${transactionId}`)
      .subscribe(
        (response: any) => {
          if (response && response.length > 0) {
            this.transaction = response[0];
            this.transaction.date = this.formatDateForIonDatetime(this.transaction.date);
          }
        },
        (error) => {
          console.error('Error fetching transaction:', error);
        }
      );
  }

  formatDateForIonDatetime(dateString: string): string {
    // Assuming datetimeString is in 'YYYY-MM-DD HH:mm:ss' format, convert it to 'YYYY-MM-DDTHH:mm:ss'
    return dateString.replace(' ', 'T');
  }

  saveTransaction() {
    this.transaction.date = this.transaction.date.replace('T', ' '); // Convert back to original format if needed
    this.http.post(`http://localhost/finance-tracker/update-transaction.php`, this.transaction)
      .subscribe(
        () => {
          this.router.navigate(['/expense-tracker']);
        },
        (error) => {
          console.error('Error updating transaction:', error);
        }
      );
  }
}