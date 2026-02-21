import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  onPasswordChange(value: string) {
    this.password = value ?? '';
    this.hasPassword = this.password.trim().length > 0;

    if (!this.hasPassword) {
      this.showPassword = false;
    }
  }

  onLogin() {
    this.submitted = true;

    const email = this.email.trim();
    const password = this.password.trim();

    if (!email || !password) return;

    console.log('LOGIN:', email, password);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword() {
  console.log('CLICKED FORGOT PASSWORD');
  this.router.navigate(['/forgot-password']);
  }
}