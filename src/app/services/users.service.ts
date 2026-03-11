import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type UserRole = 'admin' | 'officer' | 'alumni';
export type UserStatus = 'pending' | 'verified' | 'rejected';

export interface User {
  id: string | number;
  schoolId: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getPending(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?status=pending`);
  }

  patch(id: string | number, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, data);
  }

  verify(id: string | number): Observable<User> {
    return this.patch(id, { status: 'verified' });
  }

  reject(id: string | number): Observable<User> {
    return this.patch(id, { status: 'rejected' });
  }

  toggleActive(id: string | number, isActive: boolean): Observable<User> {
    return this.patch(id, { isActive });
  }

  setRole(id: string | number, role: UserRole): Observable<User> {
    return this.patch(id, { role });
  }

  create(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  findByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}?email=${encodeURIComponent(email)}`
    );
  }

  findBySchoolId(schoolId: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}?schoolId=${encodeURIComponent(schoolId)}`
    );
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  getCurrentRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  isAdmin(): boolean {
    return this.getCurrentRole() === 'admin';
  }

  isOfficer(): boolean {
    return this.getCurrentRole() === 'officer';
  }

  isAlumni(): boolean {
    return this.getCurrentRole() === 'alumni';
  }

  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}