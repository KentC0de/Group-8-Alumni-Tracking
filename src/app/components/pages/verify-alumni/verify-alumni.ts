import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';

import { UsersService, User } from '../../../services/users.service';

@Component({
  selector: 'app-verify-alumni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-alumni.html',
  styleUrls: ['./verify-alumni.scss'],
})
export class VerifyAlumniComponent {
  loading = false;

  // trigger refresh without needing "click twice"
  private refresh$ = new BehaviorSubject<void>(undefined);

  // ✅ Use observable so Angular updates view automatically
  pendingUsers$: Observable<User[]> = this.refresh$.pipe(
    tap(() => (this.loading = true)),
    switchMap(() =>
      this.usersService.getPending().pipe(
        map((users) =>
          users.filter((u) => (u.role || '').toLowerCase() === 'alumni')
        ),
        finalize(() => (this.loading = false)),
        catchError((err) => {
          console.log('VERIFY LOAD ERROR:', err);
          this.loading = false;

          Swal.fire({
            icon: 'error',
            title: 'Failed to load',
            text: 'Cannot load pending alumni. Make sure json-server is running.',
          });

          return of([] as User[]);
        })
      )
    )
  );

  constructor(private usersService: UsersService) {}

  // call this to reload list
  loadPending() {
    this.refresh$.next();
  }

  approve(u: User) {
    Swal.fire({
      icon: 'question',
      title: 'Verify this alumni?',
      html: `
        <div style="text-align:left">
          <b>School ID:</b> ${u.schoolId}<br/>
          <b>Name:</b> ${u.fullName}<br/>
          <b>Email:</b> ${u.email}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Verify',
      cancelButtonText: 'Cancel',
    }).then((res) => {
      if (!res.isConfirmed) return;

      this.loading = true;

      this.usersService
        .patch(u.id, { status: 'verified', isActive: true })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Verified!',
              timer: 900,
              showConfirmButton: false,
            });
            this.loadPending(); // ✅ refresh list
          },
          error: (err) => {
            console.log('VERIFY PATCH ERROR:', err);
            Swal.fire({
              icon: 'error',
              title: 'Verify failed',
              text: 'Could not verify this account.',
            });
          },
        });
    });
  }

  reject(u: User) {
    Swal.fire({
      icon: 'warning',
      title: 'Reject this alumni?',
      html: `
        <div style="text-align:left">
          <b>School ID:</b> ${u.schoolId}<br/>
          <b>Name:</b> ${u.fullName}<br/>
          <b>Email:</b> ${u.email}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
    }).then((res) => {
      if (!res.isConfirmed) return;

      this.loading = true;

      this.usersService
        .patch(u.id, { status: 'rejected', isActive: false })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Rejected',
              timer: 900,
              showConfirmButton: false,
            });
            this.loadPending(); // ✅ refresh list
          },
          error: (err) => {
            console.log('REJECT PATCH ERROR:', err);
            Swal.fire({
              icon: 'error',
              title: 'Reject failed',
              text: 'Could not reject this account.',
            });
          },
        });
    });
  }
}