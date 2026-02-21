import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CrudService } from './crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-crud-list',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div class="d-flex align-items-center gap-3">
      <h3 class="mb-0">{{title}}</h3>
      <span class="text-muted small" *ngIf="items.length">({{filteredItems.length}}/{{items.length}})</span>
    </div>
    <div class="d-flex gap-2 align-items-center">
      <input class="form-control form-control-sm" style="width:220px" type="search" placeholder="Search" [(ngModel)]="query">
      <a class="btn btn-primary btn-sm" [routerLink]="createLink">New</a>
      <button class="btn btn-outline-secondary btn-sm" (click)="refresh()" [disabled]="loading">{{ loading ? 'Loading...' : 'Refresh' }}</button>
    </div>
  </div>
  <div class="table-responsive" *ngIf="filteredItems.length; else empty">
    <table class="table table-hover align-middle mb-0">
      <thead>
        <tr>
          <th *ngFor="let c of columns">{{c.label}}</th>
          <th class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let it of filteredItems">
          <td *ngFor="let c of columns">{{ renderCell(it, c) }}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-outline-primary me-2" [routerLink]="[baseUrl, it._id]">Edit</a>
            <button class="btn btn-sm btn-outline-danger" (click)="remove(it)" [disabled]="removingId===it._id">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ng-template #empty>
    <div class="alert alert-secondary">No items found.</div>
  </ng-template>
  `
})
export class CrudListComponent implements OnInit {
  @Input() title = 'Items';
  @Input() basePath = '';
  @Input() baseUrl = '';
  @Input() columns: { key: string; label: string }[] = [];

  items: any[] = [];
  get filteredItems() {
    if (!this.query) return this.items;
    const q = this.query.toLowerCase();
    return this.items.filter((row) => this.columns.some((c) => String(this.renderCell(row, c)).toLowerCase().includes(q)));
  }
  removingId: string | null = null;
  get createLink() { return [this.baseUrl, 'new']; }
  query = '';
  loading = false;

  constructor(private crud: CrudService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Allow config via route data if inputs are not provided
    const data = this.route.snapshot.data as any;
    this.title = this.title || data.title || this.title;
    this.basePath = this.basePath || data.basePath || this.basePath;
    this.baseUrl = this.baseUrl || data.baseUrl || this.baseUrl || ('/' + (data.basePath || ''));
    this.columns = this.columns?.length ? this.columns : (data.columns || []);
    this.refresh();
  }
  refresh() {
    if (!this.basePath) return;
    this.loading = true;
    this.crud.list(this.basePath).subscribe({ next: (d) => { this.items = d; this.loading = false; }, error: () => this.loading = false });
  }
  remove(it: any) {
    if (!it._id) return; if (!confirm('Delete this item?')) return; this.removingId = it._id;
    this.crud.remove(this.basePath, it._id).subscribe({ next: () => { this.removingId = null; this.refresh(); }, error: () => this.removingId = null });
  }
  renderCell(it: any, c: { key: string; label: string }) {
    const v = c.key.split('.').reduce((acc: any, k: string) => acc?.[k], it);
    return Array.isArray(v) ? v.join(', ') : (v ?? '-');
  }
}

