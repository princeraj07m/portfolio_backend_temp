import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService, MediaAsset } from './media.service';

@Component({
  standalone: true,
  selector: 'app-media-list',
  imports: [CommonModule],
  template: `
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Media Library</h3>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm-6 col-md-4 col-lg-3" *ngFor="let m of items">
        <div class="card h-100">
          <img *ngIf="m.fileURL" [src]="m.fileURL" class="card-img-top" alt="media" />
          <div class="card-body">
            <div class="fw-bold small text-truncate" title="{{m.fileName}}">{{m.fileName}}</div>
            <div class="text-muted small">{{m.fileType || '-'}}</div>
          </div>
          <div class="card-footer bg-transparent d-flex justify-content-end gap-2">
            <a [href]="m.fileURL" target="_blank" class="btn btn-sm btn-outline-primary">Open</a>
            <button class="btn btn-sm btn-outline-danger" (click)="remove(m)" [disabled]="removingId===m._id">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class MediaListComponent implements OnInit {
  items: MediaAsset[] = [];
  removingId: string | null = null;
  constructor(private svc: MediaService) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.svc.list().subscribe((d) => this.items = d); }
  remove(m: MediaAsset) {
    if (!m._id) return; if (!confirm('Delete this file?')) return; this.removingId = m._id;
    this.svc.remove(m._id).subscribe({ next: () => { this.removingId = null; this.refresh(); }, error: () => this.removingId = null });
  }
}

