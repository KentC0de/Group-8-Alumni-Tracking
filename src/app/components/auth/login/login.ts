import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

type User = {
  id: string | number;
  email: string;
  password: string;
  role: 'admin' | 'alumni';
  name?: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  email = '';
  password = '';

  submitted = false;
  showPassword = false;
  hasPassword = false;

  constructor(private router: Router, private http: HttpClient) {}

  onPasswordChange(value: string) {
    this.password = value ?? '';
    this.hasPassword = this.password.trim().length > 0;

    if (!this.hasPassword) this.showPassword = false;
  }

  onLogin() {
    this.submitted = true;

    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please enter your email and password.',
      });
      return;
    }

    this.http
      .get<User[]>(
        `http://localhost:3000/users?email=${encodeURIComponent(email)}`
      )
      .subscribe({
        next: (users) => {
          if (!users.length) {
            Swal.fire({
              icon: 'error',
              title: 'Invalid credentials',
              text: 'Email or password is incorrect.',
            });
            return;
          }

          const user = users.find((u) => (u.password ?? '').trim() === password);

          if (!user) {
            Swal.fire({
              icon: 'error',
              title: 'Invalid credentials',
              text: 'Email or password is incorrect.',
            });
            return;
          }

          localStorage.setItem('currentUser', JSON.stringify(user));

          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            // For tomorrow: send everyone to admin so you have a destination
            this.router.navigate(['/admin']);
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'JSON Server not reachable',
            text: 'Run: json-server --watch db.json --port 3000',
          });
        },
      });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}