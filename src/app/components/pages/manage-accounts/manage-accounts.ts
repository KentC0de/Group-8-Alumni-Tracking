import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AccountItem {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Regular User';
  dateJoined: string;
}

@Component({
  selector: 'app-manage-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-accounts.html',
  styleUrls: ['./manage-accounts.scss']
})
export class ManageAccountsComponent {
  searchTerm: string = '';
  selectedRole: string = 'All Roles';

  accounts: AccountItem[] = [];

  get totalUsers(): number {
    return this.accounts.length;
  }

  get totalAdmins(): number {
    return this.accounts.filter(account => account.role === 'Admin').length;
  }

  get totalRegularUsers(): number {
    return this.accounts.filter(account => account.role === 'Regular User').length;
  }

  get newThisMonth(): number {
    const now = new Date();

    return this.accounts.filter(account => {
      const joined = new Date(account.dateJoined);
      return (
        joined.getMonth() === now.getMonth() &&
        joined.getFullYear() === now.getFullYear()
      );
    }).length;
  }

  get filteredAccounts(): AccountItem[] {
    return this.accounts.filter((account: AccountItem) => {
      const search = this.searchTerm.toLowerCase();

      const matchesSearch =
        account.name.toLowerCase().includes(search) ||
        account.email.toLowerCase().includes(search);

      const matchesRole =
        this.selectedRole === 'All Roles' || account.role === this.selectedRole;

      return matchesSearch && matchesRole;
    });
  }

  editAccount(account: AccountItem): void {
    console.log('Edit account:', account);
  }

  deleteAccount(account: AccountItem): void {
    console.log('Delete account:', account);
  }
}