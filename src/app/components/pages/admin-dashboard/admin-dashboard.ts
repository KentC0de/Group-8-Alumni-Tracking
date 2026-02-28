import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { finalize } from 'rxjs/operators';

import { UsersService, User } from '../../../services/users.service';
import { EventsService, EventItem } from '../../../services/events.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, SkeletonModule, TableModule, ButtonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
})
export class AdminDashboardComponent implements OnInit {
  loadingStats = true;
  loadingPending = true;

  totalUsers = 0;
  pendingUsers = 0;
  activeUsers = 0;

  upcomingEvents = 0;

  pendingPreview: User[] = [];

  constructor(
    private usersService: UsersService,
    private eventsService: EventsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadPendingPreview();
    this.loadUpcomingEvents();
  }

  private loadStats() {
    this.loadingStats = true;
    this.cdr.markForCheck();

    this.usersService.getAll()
      .pipe(finalize(() => {
        this.loadingStats = false;
        this.cdr.markForCheck(); // ✅ ensures skeleton -> number swaps immediately
      }))
      .subscribe({
        next: (users: User[]) => {
          this.totalUsers = users.length;
          this.pendingUsers = users.filter(u => u.status === 'pending').length;
          this.activeUsers = users.filter(u => u.isActive).length;
          this.cdr.markForCheck(); // ✅ ensures numbers render without click
        },
        error: (err) => console.error('Users API failed:', err),
      });
  }

  private loadPendingPreview() {
    this.loadingPending = true;
    this.cdr.markForCheck();

    this.usersService.getPending()
      .pipe(finalize(() => {
        this.loadingPending = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (users: User[]) => {
          this.pendingPreview = users.slice(0, 5);
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Pending users API failed:', err),
      });
  }

  private loadUpcomingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.eventsService.list().subscribe({
      next: (events: EventItem[]) => {
        this.upcomingEvents = events.filter(e => {
          const d = new Date(e.date);
          d.setHours(0, 0, 0, 0);
          return d >= today;
        }).length;

        this.cdr.markForCheck();
      },
      error: (err) => console.error('Events API failed:', err),
    });
  }
}