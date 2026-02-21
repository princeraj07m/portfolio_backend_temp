import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, BlogPost } from './blog.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-blog-list',
  imports: [CommonModule, RouterModule],
  template: `
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Blog Posts</h3>
      <div class="d-flex gap-2">
        <a class="btn btn-primary" [routerLink]="['/manage/blog-posts/new']">Add Post</a>
        <button class="btn btn-outline-secondary" (click)="refresh()">Refresh</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of posts">
            <td>{{p.title}}</td>
            <td>{{p.slug}}</td>
            <td>{{p.status || '-'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  constructor(private blog: BlogService) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.blog.list().subscribe((data) => this.posts = data); }
}

