import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService, Project } from './projects.service';

@Component({
  standalone: true,
  selector: 'app-projects-list',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Projects</h3>
      <div class="d-flex gap-2">
        <a class="btn btn-success" routerLink="/projects/new">New Project</a>
        <button class="btn btn-outline-secondary" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Featured</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of projects">
            <td>{{p.title}}</td>
            <td>{{p.slug}}</td>
            <td>
              <span class="badge" [class.text-bg-success]="p.isFeatured" [class.text-bg-secondary]="!p.isFeatured">{{p.isFeatured ? 'Yes' : 'No'}}</span>
            </td>
            <td class="text-end">
              <a class="btn btn-sm btn-outline-primary me-2" [routerLink]="['/projects', p._id]">Edit</a>
              <button class="btn btn-sm btn-outline-danger" (click)="remove(p)" [disabled]="removingId===p._id">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  removingId: string | null = null;
  constructor(private projectsSvc: ProjectsService) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.projectsSvc.list().subscribe((data) => this.projects = data); }
  remove(p: Project) {
    if (!p._id) return;
    if (!confirm('Delete this project?')) return;
    this.removingId = p._id;
    this.projectsSvc.remove(p._id).subscribe({
      next: () => { this.removingId = null; this.refresh(); },
      error: () => { this.removingId = null; }
    });
  }
}

