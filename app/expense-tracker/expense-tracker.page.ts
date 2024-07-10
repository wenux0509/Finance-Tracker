import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.page.html',
  styleUrls: ['./expense-tracker.page.scss'],
})
export class ExpenseTrackerPage {
  username: string = '';

  constructor(private router: Router, private http: HttpClient) {
    this.getUsername();
  }

  getUsername() {
    // Retrieve userId from localStorage
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    if (userId !== 0) {
      // Fetch username from backend using userId
      this.http.get<any>(`http://localhost/finance-tracker/get-user.php?user_id=${userId}`)
        .subscribe(
          (response: any) => {
            this.username = response.username || '';
          },
          (error) => {
            console.error('Error fetching username:', error);
          }
        );
    }
  }

  logout() {
    localStorage.removeItem('userId'); // Clear stored userId on logout
    this.router.navigate(['/login']);
  }
}




