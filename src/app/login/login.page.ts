import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface LoginResponse {
  success: boolean;
  error?: string;
  username?: string; // Adjust based on PHP response structure
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const loginData = { email: this.email, password: this.password };

    this.http.post<LoginResponse>('http://localhost/finance-tracker/login.php', loginData)
      .subscribe(
        (response: LoginResponse) => {
          if (response.success) {
            this.loginError = ''; // Clear any previous login error message
            console.log('Login successful:', response);
            alert('Login successful');
            // Store the username in local storage
            localStorage.setItem('username', response.username || '');
            // Navigate to another page upon successful login
            this.router.navigate(['/expense-tracker']); // Replace with your desired page
          } else {
            this.loginError = response.error || 'Unknown error occurred.';
            console.error('Login failed:', this.loginError);
            alert('Login failed: ' + this.loginError);
          }
        },
        (error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          this.loginError = 'An error occurred, please try again later.';
          alert(this.loginError);
        }
      );
  }
}

