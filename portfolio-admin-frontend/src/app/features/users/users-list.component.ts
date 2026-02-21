import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService, UserProfile } from './users.service';

@Component({
  standalone: true,
  selector: 'app-users-list',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Users</h3>
      <div class="d-flex gap-2">
        <a class="btn btn-success" routerLink="/users/new">New User</a>
        <button class="btn btn-outline-secondary" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead><tr><th>Username</th><th>Email</th><th>Roles</th><th>Default</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let u of items">
            <td>{{u.username}}</td>
            <td>{{u.email}}</td>
            <td>{{u.roles?.join(', ')}}</td>
            <td>
              <span class="badge bg-primary" *ngIf="defaultId===u._id">Default</span>
            </td>
            <td class="text-end">
              <a class="btn btn-sm btn-outline-primary me-2" [routerLink]="['/users', u._id]">Edit</a>
              <button class="btn btn-sm btn-outline-success me-2" *ngIf="defaultId!==u._id" (click)="makeDefault(u)">Make Default</button>
              <button class="btn btn-sm btn-outline-warning me-2" *ngIf="defaultId===u._id" (click)="clearDefault()">Unset Default</button>
              <button class="btn btn-sm btn-outline-danger" (click)="remove(u)" [disabled]="removingId===u._id">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class UsersListComponent implements OnInit {
  items: UserProfile[] = [];
  removingId: string | null = null;
  defaultId: string | null = null;
  constructor(private svc: UsersService) {}
  ngOnInit() { this.refresh(); }
  refresh() {
    this.svc.list().subscribe((d) => this.items = d);
    this.svc.getDefaultProfile().subscribe((r)=> this.defaultId = (r as any).profileId || null);
  }
  makeDefault(u: UserProfile) {
    if (!u._id) return;
    this.svc.setDefaultProfile(u._id).subscribe(()=> this.refresh());
  }
  clearDefault() {
    this.svc.clearDefaultProfile().subscribe(()=> this.refresh());
  }
  remove(u: UserProfile) {
    if (!u._id) return; if (!confirm('Delete this user?')) return; this.removingId = u._id;
    this.svc.remove(u._id).subscribe({ next: () => { this.removingId = null; this.refresh(); }, error: () => this.removingId = null });
  }
}

