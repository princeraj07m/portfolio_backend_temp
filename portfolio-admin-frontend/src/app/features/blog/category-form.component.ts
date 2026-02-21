import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, BlogCategory } from './categories.service';

@Component({
  standalone: true,
  selector: 'app-category-form',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container-fluid" *ngIf="model">
    <h3 class="mb-3">{{model._id ? 'Edit' : 'Create'}} Category</h3>
    <form (ngSubmit)="save()" #f="ngForm" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Name</label>
        <input class="form-control" [(ngModel)]="model.name" name="name" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Slug</label>
        <input class="form-control" [(ngModel)]="model.slug" name="slug" required />
      </div>
      <div class="col-12 d-flex gap-2 mt-2">
        <button class="btn btn-primary" [disabled]="saving">Save</button>
        <button class="btn btn-secondary" type="button" (click)="back()">Cancel</button>
      </div>
      <div class="text-danger" *ngIf="error">{{error}}</div>
    </form>
  </div>
  `
})
export class CategoryFormComponent implements OnInit {
  model: BlogCategory | any = { name: '', slug: '' };
  id: string | null = null;
  saving = false; error = '';
  constructor(private route: ActivatedRoute, private router: Router, private svc: CategoriesService) {}
  ngOnInit() { this.id = this.route.snapshot.paramMap.get('id'); if (this.id) this.svc.get(this.id).subscribe((d)=> this.model = d); }
  save() {
    this.saving = true;
    const obs = this.id ? this.svc.update(this.id!, this.model) : this.svc.create(this.model);
    obs.subscribe({ next: ()=> this.router.navigate(['/blog/categories']), error: (e)=> { this.error = e?.error?.message || 'Save failed'; this.saving = false; } });
  }
  back() { this.router.navigate(['/blog/categories']); }
}

