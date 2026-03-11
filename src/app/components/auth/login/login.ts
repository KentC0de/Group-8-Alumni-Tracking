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
  role: 'admin' | 'alumni' | 'officer';
  name?: string;
  fullName?: string;
  status?: 'pending' | 'verified' | 'rejected';
  isActive?: boolean;
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

  onPasswordChange(value: string): void {
    this.password = value ?? '';
    this.hasPassword = this.password.trim().length > 0;

    if (!this.hasPassword) {
      this.showPassword = false;
    }
  }

  onLogin(): void {
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
      .get<User[]>(`http://localhost:3000/users?email=${encodeURIComponent(email)}`)
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

          if (user.status === 'pending') {
            Swal.fire({
              icon: 'info',
              title: 'Account Pending',
              text: 'Your account is waiting for admin verification.',
            });
            return;
          }

          if (user.status === 'rejected') {
            Swal.fire({
              icon: 'error',
              title: 'Account Rejected',
              text: 'Your registration was rejected by admin.',
            });
            return;
          }

          if (user.isActive === false) {
            Swal.fire({
              icon: 'error',
              title: 'Account Disabled',
              text: 'Your account was disabled by admin.',
            });
            return;
          }

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', 'logged-in');

          let redirectUrl = '/login';

          if (user.role === 'admin') {
            redirectUrl = '/admin/dashboard';
          } else if (user.role === 'alumni') {
            redirectUrl = '/alumni/dashboard';
          } else if (user.role === 'officer') {
            redirectUrl = '/admin/dashboard';
          }

          Swal.fire({
            icon: 'success',
            title: 'Login successful',
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this.router.navigate([redirectUrl]);
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

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}