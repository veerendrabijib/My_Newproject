import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface User { id: string; name: string; email: string; role: 'user' | 'admin'; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5000/api/auth';
  currentUser = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.api}/register`, data).pipe(
      tap((res: any) => { if (res.success) { localStorage.setItem('token', res.token); localStorage.setItem('user', JSON.stringify(res.user)); this.currentUser.set(res.user); } })
    );
  }

  login(data: any) {
    return this.http.post(`${this.api}/login`, data).pipe(
      tap((res: any) => { if (res.success) { localStorage.setItem('token', res.token); localStorage.setItem('user', JSON.stringify(res.user)); this.currentUser.set(res.user); } })
    );
  }

  logout() { localStorage.removeItem('token'); localStorage.removeItem('user'); this.currentUser.set(null); this.router.navigate(['/login']); }
  isLoggedIn() { return !!localStorage.getItem('token'); }
  isAdmin() { return this.currentUser()?.role === 'admin'; }
  getToken() { return localStorage.getItem('token'); }
}