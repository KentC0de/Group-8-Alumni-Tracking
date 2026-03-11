import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent implements OnInit {
  menuOpen = false;

  isAdmin = false;
  isAlumni = false;

  sidebarTitle = 'Admin Access';
  displayName = 'Admin User';
  roleLabel = 'Administrator';
  avatarLetter = 'A';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setLayoutByRoute(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setLayoutByRoute(event.urlAfterRedirects);
      });
  }

  setLayoutByRoute(url: string): void {
    this.isAdmin = url.startsWith('/admin');
    this.isAlumni = url.startsWith('/alumni');

    if (this.isAlumni) {
      this.sidebarTitle = 'Alumni Access';
      this.displayName = 'Alumni User';
      this.roleLabel = 'Alumni';
      this.avatarLetter = 'A';
    } else {
      this.sidebarTitle = 'Admin Access';
      this.displayName = 'Admin User';
      this.roleLabel = 'Administrator';
      this.avatarLetter = 'A';
    }

    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    Swal.fire({
      title: 'Log out?',
      text: 'You will be returned to the login page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Logged out successfully',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 400);
      }
    });
  }
}