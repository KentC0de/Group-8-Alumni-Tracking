import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';

type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed';
type EventType = 'Career Fair' | 'Reunion' | 'Webinar' | 'Announcement';

interface EventItem {
  id: number;
  title: string;
  type: EventType;
  status: EventStatus;
  description: string;
  date: string;
  location: string;
}

@Component({
  selector: 'app-events-announcements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-announcements.html',
  styleUrls: ['./events-announcements.scss']
})
export class EventsAnnouncementsComponent {

  activeTab: 'All' | EventStatus = 'All';

  constructor(private usersService: UsersService) {}

  events: EventItem[] = [
    {
      id: 1,
      title: 'Career Fair 2026',
      type: 'Career Fair',
      status: 'Upcoming',
      description: 'Connect alumni with top employers and career opportunities.',
      date: 'May 10, 2026',
      location: 'University Gymnasium'
    },
    {
      id: 2,
      title: 'Alumni Homecoming 2026',
      type: 'Reunion',
      status: 'Upcoming',
      description: 'Annual alumni reunion and networking event.',
      date: 'April 15, 2026',
      location: 'University Main Hall'
    },
    {
      id: 3,
      title: 'Tech Industry Webinar',
      type: 'Webinar',
      status: 'Upcoming',
      description: 'Panel discussion with alumni working in the tech industry.',
      date: 'March 28, 2026',
      location: 'Online (Zoom)'
    }
  ];

  // ROLE CHECKS
  get isAdmin(): boolean {
    return this.usersService.isAdmin();
  }

  get isAlumni(): boolean {
    return this.usersService.isAlumni();
  }

  setActiveTab(tab: 'All' | EventStatus): void {
    this.activeTab = tab;
  }

  get filteredEvents(): EventItem[] {
    if (this.activeTab === 'All') {
      return this.events;
    }

    return this.events.filter(event => event.status === this.activeTab);
  }

  get allCount(): number {
    return this.events.length;
  }

  get upcomingCount(): number {
    return this.events.filter(event => event.status === 'Upcoming').length;
  }

  get ongoingCount(): number {
    return this.events.filter(event => event.status === 'Ongoing').length;
  }

  get completedCount(): number {
    return this.events.filter(event => event.status === 'Completed').length;
  }

  createEvent(): void {
    if (!this.isAdmin) return;
    console.log('Create event clicked');
  }

  editEvent(event: EventItem): void {
    if (!this.isAdmin) return;
    console.log('Edit event:', event);
  }

  deleteEvent(event: EventItem): void {
    if (!this.isAdmin) return;
    console.log('Delete event:', event);
  }

  viewDetails(event: EventItem): void {
    console.log('View details:', event);
  }

}