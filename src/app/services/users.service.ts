// src/app/services/users.service.ts
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

  // ✅ accept string | number
  patch(id: string | number, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, data);
  }

  verify(id: string | number) {
    return this.patch(id, { status: 'verified' });
  }

  reject(id: string | number) {
    return this.patch(id, { status: 'rejected' });
  }

  toggleActive(id: string | number, isActive: boolean) {
    return this.patch(id, { isActive });
  }

  setRole(id: string | number, role: UserRole) {
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
}