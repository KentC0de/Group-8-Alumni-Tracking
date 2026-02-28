import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventItem {
  id: number;
  title: string;
  date: string;        // "YYYY-MM-DD"
  location: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private baseUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  list(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.baseUrl);
  }
}