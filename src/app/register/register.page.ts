import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    const registerData = { username: this.username, password: this.password };

    this.http.post('http://localhost/finance-tracker/register.php', registerData)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Registration successful');
          this.router.navigate(['/login']);
        } else {
          alert('Registration failed');
        }
      }, error => {
        console.error('An error occurred:', error);
        alert('An error occurred');
      });
  }
}

