import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AwardsService, Award } from './awards.service';

@Component({
  standalone: true,
  selector: 'app-awards-list',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Awards</h3>
      <div class="d-flex gap-2">
        <a class="btn btn-success" routerLink="/awards/new">New Award</a>
        <button class="btn btn-outline-secondary" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead><tr><th>Title</th><th>Organization</th><th>Date</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let a of items">
            <td>{{a.title}}</td>
            <td>{{a.organization || '-'}}</td>
            <td>{{a.dateReceived | date:'mediumDate'}}</td>
            <td class="text-end">
              <a class="btn btn-sm btn-outline-primary me-2" [routerLink]="['/awards', a._id]">Edit</a>
              <button class="btn btn-sm btn-outline-danger" (click)="remove(a)" [disabled]="removingId===a._id">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class AwardsListComponent implements OnInit {
  items: Award[] = [];
  removingId: string | null = null;
  constructor(private svc: AwardsService) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.svc.list().subscribe((d) => this.items = d); }
  remove(a: Award) {
    if (!a._id) return; if (!confirm('Delete this award?')) return; this.removingId = a._id;
    this.svc.remove(a._id).subscribe({ next: () => { this.removingId = null; this.refresh(); }, error: () => this.removingId = null });
  }
}

