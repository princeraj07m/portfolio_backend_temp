import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriesService, BlogCategory } from './categories.service';

@Component({
  standalone: true,
  selector: 'app-category-list',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Blog Categories</h3>
      <div class="d-flex gap-2">
        <a class="btn btn-success" routerLink="/blog/categories/new">New Category</a>
        <button class="btn btn-outline-secondary" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead><tr><th>Name</th><th>Slug</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let c of items">
            <td>{{c.name}}</td>
            <td>{{c.slug}}</td>
            <td class="text-end">
              <a class="btn btn-sm btn-outline-primary me-2" [routerLink]="['/blog/categories', c._id]">Edit</a>
              <button class="btn btn-sm btn-outline-danger" (click)="remove(c)" [disabled]="removingId===c._id">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class CategoryListComponent implements OnInit {
  items: BlogCategory[] = [];
  removingId: string | null = null;
  constructor(private svc: CategoriesService) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.svc.list().subscribe((d) => this.items = d); }
  remove(c: BlogCategory) {
    if (!c._id) return; if (!confirm('Delete this category?')) return; this.removingId = c._id;
    this.svc.remove(c._id).subscribe({ next: () => { this.removingId = null; this.refresh(); }, error: () => this.removingId = null });
  }
}

