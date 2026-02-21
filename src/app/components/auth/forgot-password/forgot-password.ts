console.log('ForgotPassword component file loaded ✅');
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
})
export class ForgotPassword {
  email = '';
  message = '';
  error = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.error = 'Please enter your email address.';
      this.message = '';
      return;
    }

    this.error = '';
    this.message = `If an account exists for "${this.email}", a reset link has been sent.`;
  }

  // ✅ keep BOTH so template can call either
  goToLogin() {
    this.router.navigate(['/login']);
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }
}