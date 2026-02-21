import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="container py-5" style="max-width:420px;">
    <h3 class="mb-3 text-center">Create Admin Account</h3>
    <form (ngSubmit)="onSubmit()" #f="ngForm">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input class="form-control" name="name" [(ngModel)]="name" />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input class="form-control" name="email" [(ngModel)]="email" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" name="password" [(ngModel)]="password" required />
      </div>
      <button class="btn btn-primary w-100" [disabled]="loading">Register</button>
      <div class="text-danger mt-2" *ngIf="error">{{error}}</div>
      <div class="text-success mt-2" *ngIf="success">{{success}}</div>
    </form>
    <div class="mt-3 text-center">
      <a routerLink="/login">Back to Login</a>
    </div>
  </div>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  loading = false;
  error = '';
  success = '';
  constructor(private http: HttpClient, private router: Router) {}
  onSubmit() {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.http.post(`${environment.apiBaseUrl}/auth/register`, { name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => { this.success = 'Registration successful. Please login.'; this.loading = false; this.router.navigate(['/login']); },
      error: (e) => { this.error = e?.error?.message || 'Registration failed'; this.loading = false; }
    });
  }
}


