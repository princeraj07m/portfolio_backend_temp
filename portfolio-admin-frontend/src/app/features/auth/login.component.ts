import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="container py-5" style="max-width:420px;">
    <h3 class="mb-3 text-center">Admin Login</h3>
    <form (ngSubmit)="onSubmit()" #f="ngForm">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input class="form-control" name="email" [(ngModel)]="email" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" name="password" [(ngModel)]="password" required />
      </div>
      <button class="btn btn-primary w-100" [disabled]="loading">Login</button>
      <div class="text-danger mt-2" *ngIf="error">{{error}}</div>
    </form>
    <div class="mt-3 text-center">
      <a routerLink="/register">Create an account</a>
    </div>
  </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}

