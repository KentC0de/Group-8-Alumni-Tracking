import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { UsersService, User } from '../../../services/users.service';

@Component({
  selector: 'app-verify-alumni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-alumni.html',
  styleUrls: ['./verify-alumni.scss'],
})
export class VerifyAlumniComponent {
  private refresh$ = new BehaviorSubject<void>(undefined);

  // ✅ make loading reactive too (no ExpressionChanged error)
  loading$: Observable<boolean> = this.refresh$.pipe(
    switchMap(() =>
      this.usersService.getPending().pipe(
        map(() => false),
        catchError(() => of(false))
      )
    ),
    // start as true because refresh triggers load
    // but easier: we show loading using pendingUsers$ (below)
    shareReplay(1)
  );

  // ✅ pending alumni list
  pendingUsers$: Observable<User[]> = this.refresh$.pipe(
    switchMap(() =>
      this.usersService.getPending().pipe(
        map((users) =>
          users.filter((u) => (u.role || '').toLowerCase() === 'alumni')
        ),
        catchError((err) => {
          console.log('VERIFY LOAD ERROR:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to load',
            text: 'Cannot load pending alumni. Make sure json-server is running.',
          });
          return of([] as User[]);
        })
      )
    ),
    shareReplay(1)
  );

  constructor(private usersService: UsersService) {}

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

      this.usersService.patch(u.id, { status: 'verified', isActive: true }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Verified!',
            timer: 900,
            showConfirmButton: false,
          });
          this.loadPending();
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

      this.usersService.patch(u.id, { status: 'rejected', isActive: false }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Rejected',
            timer: 900,
            showConfirmButton: false,
          });
          this.loadPending();
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