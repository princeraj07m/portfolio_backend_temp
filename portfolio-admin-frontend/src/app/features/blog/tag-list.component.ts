import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TagsService, BlogTag } from './tags.service';

@Component({
  standalone: true,
  selector: 'app-tag-list',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Blog Tags</h3>
      <div class="d-flex gap-2">
        <a class="btn btn-success" routerLink="/blog/tags/new">New Tag</a>
        <button class="btn btn-outline-secondary" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead><tr><th>Name</th><th>Slug</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let t of items">
            <td>{{t.name}}</td>
            <td>{{t.slug}}</td>
            <td class="text-end">
              <a class="btn btn-sm btn-outline-primary me-2" [routerLink]="['/blog/tags', t._id]">Edit</a>
              <button class="btn btn-sm btn-outline-danger" (click)="remove(t)" [disabled]="removingId===t._id">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class TagListComponent implements OnInit {
  items: BlogTag[] = [];
  removingId: string | null = null;
  constructor(private svc: TagsService) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.svc.list().subscribe((d) => this.items = d); }
  remove(t: BlogTag) {
    if (!t._id) return; if (!confirm('Delete this tag?')) return; this.removingId = t._id;
    this.svc.remove(t._id).subscribe({ next: () => { this.removingId = null; this.refresh(); }, error: () => this.removingId = null });
  }
}

