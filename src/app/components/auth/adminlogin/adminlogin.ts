import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminlogin.html',
  styleUrls: ['./adminlogin.scss'],
})
export class Adminlogin {
  username: string = '';
  password: string = '';
  error: string = '';

  onAdminLogin() {
    if (!this.username || !this.password) {
      this.error = 'Admin credentials required';
      return;
    }

    this.error = '';
    console.log('ADMIN LOGIN:', this.username, this.password);
  }
}
