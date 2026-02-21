import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  imports: [RouterLink, RouterOutlet],
  template: `
  <div class="d-flex">
    <nav class="p-3 border-end" style="width:240px; min-height:100vh;">
      <h5 class="mb-3">Admin</h5>
      <ul class="nav flex-column gap-2">
        <li><a routerLink="/" class="nav-link">Dashboard</a></li>
        <li><a routerLink="/projects" class="nav-link">Projects</a></li>
        <li><a routerLink="/manage/certifications" class="nav-link">Certificates</a></li>
        <li><a routerLink="/manage/hackathons" class="nav-link">Hackathons</a></li>
        <li><a routerLink="/awards" class="nav-link">Awards</a></li>
        <li><a routerLink="/manage/educations" class="nav-link">Education</a></li>
        <li><a routerLink="/manage/social-links" class="nav-link">Social Links</a></li>
        <li><a routerLink="/users" class="nav-link">Users</a></li>
        <li><a routerLink="/manage" class="nav-link">All Collections</a></li>
      </ul>
    </nav>
    <main class="flex-grow-1 p-4">
      <router-outlet />
    </main>
  </div>
  `
})
export class DashboardLayout {}

