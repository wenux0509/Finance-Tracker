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
    this.username = localStorage.getItem('username') || '';
  }

  // Logout function
  logout() {
    localStorage.removeItem('username'); // Clear stored username on logout
    this.router.navigate(['/login']);
  }
}




