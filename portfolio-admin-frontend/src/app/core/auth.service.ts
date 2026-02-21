import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = signal<string | null>(localStorage.getItem('jwt'));

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiBaseUrl}/auth/login`, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
    this.token.set(token);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.token.set(null);
  }

  isAuthenticated() {
    return !!this.token();
  }
}

