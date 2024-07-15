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
    id: 0,
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
          }
        },
        (error) => {
          console.error('Error fetching transaction:', error);
        }
      );
  }

  saveTransaction() {
    this.http.post(`http://localhost/finance-tracker/update-transaction.php`, this.transaction)
      .subscribe(
        () => {
          this.router.navigate(['/expense-tracker'], { queryParams: { refresh: true } });
        },
        (error) => {
          console.error('Error updating transaction:', error);
        }
      );
  }
}
