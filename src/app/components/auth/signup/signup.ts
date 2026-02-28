// src/app/components/auth/signup/signup.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UsersService, User } from '../../../services/users.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class Signup {
  schoolId = '';
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  submitted = false;
  loading = false;
  message = '';

  constructor(private users: UsersService, private router: Router) {}

  private isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  onSubmit() {
    this.submitted = true;
    this.message = '';

    const schoolId = this.schoolId.trim();
    const fullName = this.fullName.trim();
    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();
    const confirmPassword = this.confirmPassword.trim();

    if (!schoolId || !fullName || !email || !password || !confirmPassword) {
      this.message = 'Please complete all fields.';
      return;
    }

    if (!this.isEmailValid(email)) {
      this.message = 'Please enter a valid email.';
      return;
    }

    if (password !== confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    forkJoin({
      emailMatches: this.users.findByEmail(email),
      schoolIdMatches: this.users.findBySchoolId(schoolId),
    }).subscribe({
      next: ({ emailMatches, schoolIdMatches }) => {
        if (emailMatches.length > 0) {
          this.message = 'Email already exists.';
          this.loading = false;
          return;
        }

        if (schoolIdMatches.length > 0) {
          this.message = 'School ID already exists.';
          this.loading = false;
          return;
        }

        const newUser: Omit<User, 'id'> = {
          schoolId,
          fullName,
          email,
          password, // ✅ stored for login
          role: 'alumni',
          status: 'pending',
          isActive: true,
          createdAt: new Date().toISOString(),
        };

        this.users.create(newUser).subscribe({
          next: () => {
            this.message = 'Account created! Please wait for admin verification.';
            this.loading = false;
            setTimeout(() => this.router.navigate(['/login']), 800);
          },
          error: () => {
            this.message = 'Signup failed. Is json-server running?';
            this.loading = false;
          },
        });
      },
      error: () => {
        this.message = 'Could not validate user.';
        this.loading = false;
      },
    });
  }
}