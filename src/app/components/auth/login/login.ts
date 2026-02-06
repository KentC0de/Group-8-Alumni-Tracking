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
  error = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Please complete all required fields';
      return;
    }
    this.error = '';
  }

  // 🔥 THIS MUST EXIST
  goToAdminLogin() {
    this.router.navigate(['/admin-login']);
  }
}
