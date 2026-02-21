import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
  <div class="container-fluid">
    <h3 class="mb-3">Dashboard</h3>
    <div class="alert alert-info">Logged in: {{loggedIn() ? 'Yes' : 'No'}}
      <button class="btn btn-sm btn-outline-danger ms-3" (click)="logout()" *ngIf="loggedIn()">Logout</button>
    </div>
    <div class="row g-3">
      <div class="col-md-3">
        <div class="card p-3">
          <div class="fw-bold">Projects</div>
          <div class="text-muted">Manage portfolio projects</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-3">
          <div class="fw-bold">Blog</div>
          <div class="text-muted">Posts, categories, comments</div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class DashboardComponent {
  loggedIn = computed(() => this.auth.isAuthenticated());
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}

