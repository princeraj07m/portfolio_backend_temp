import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-management',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container-fluid">
    <h3 class="mb-3">Management</h3>
    <div class="row g-3">
      <div class="col-md-3" *ngFor="let item of sortedLinks">
        <a class="card p-3 text-decoration-none" [routerLink]="item.href">
          <div class="fw-bold">{{item.title}}</div>
          <div class="text-muted small">{{item.path}}</div>
        </a>
      </div>
    </div>
  </div>
  `
})
export class ManagementComponent {
  links = [
    { title: 'Projects', href: '/manage/projects', path: 'admin/projects' },
    { title: 'Awards', href: '/manage/awards', path: 'admin/awards' },
    { title: 'Blog Posts', href: '/manage/blog-posts', path: 'admin/blog-posts' },
    { title: 'Blog Categories', href: '/manage/blog-categories', path: 'admin/blog-categories' },
    { title: 'Blog Tags', href: '/manage/blog-tags', path: 'admin/blog-tags' },
    { title: 'Blog Comments', href: '/manage/blog-comments', path: 'admin/blog-comments' },
    { title: 'Media Assets', href: '/manage/media-assets', path: 'admin/media-assets' },
    { title: 'Users', href: '/manage/user-profiles', path: 'admin/user-profiles' },
    { title: 'Social Links', href: '/manage/social-links', path: 'admin/social-links' },
    { title: 'Skills', href: '/manage/skills', path: 'admin/skills' },
    { title: 'Hackathons', href: '/manage/hackathons', path: 'admin/hackathons' },
    { title: 'Internships', href: '/manage/internships', path: 'admin/internships' },
    { title: 'Personal Brand', href: '/manage/personal-brands', path: 'admin/personal-brands' },
    { title: 'Contact Info', href: '/manage/contact-infos', path: 'admin/contact-infos' },
    { title: 'Settings', href: '/manage/settings', path: 'admin/settings' },
    { title: 'Personal Settings', href: '/manage/personal-settings', path: 'admin/personal-settings' },
    { title: 'Experience', href: '/manage/experiences', path: 'admin/experiences' },
    { title: 'Education', href: '/manage/educations', path: 'admin/educations' },
    { title: 'Expanded Skills', href: '/manage/skills-expanded', path: 'admin/skills-expanded' },
    { title: 'Certifications', href: '/manage/certifications', path: 'admin/certifications' },
    { title: 'Achievements', href: '/manage/achievements', path: 'admin/achievements' },
    { title: 'Volunteer Experience', href: '/manage/volunteer-experiences', path: 'admin/volunteer-experiences' },
    { title: 'Project Categories', href: '/manage/project-categories', path: 'admin/project-categories' },
    { title: 'Project Versions', href: '/manage/project-versions', path: 'admin/project-versions' },
    { title: 'Project Feedback', href: '/manage/project-feedbacks', path: 'admin/project-feedbacks' },
    { title: 'Project Files', href: '/manage/project-files', path: 'admin/project-files' },
    { title: 'Collaborations', href: '/manage/collaborations', path: 'admin/collaborations' },
    { title: 'Clients', href: '/manage/clients', path: 'admin/clients' },
    { title: 'Proposals', href: '/manage/proposals', path: 'admin/proposals' },
    { title: 'Gallery Items', href: '/manage/gallery-items', path: 'admin/gallery-items' },
    { title: 'Sections', href: '/manage/sections', path: 'admin/sections' },
    { title: 'Custom Sections', href: '/manage/custom-sections', path: 'admin/custom-sections' },
    { title: 'Theme Settings', href: '/manage/theme-settings', path: 'admin/theme-settings' },
    { title: 'SEO', href: '/manage/seo', path: 'admin/seo' }
  ];

  get sortedLinks() {
    return [...this.links].sort((a, b) => a.title.localeCompare(b.title));
  }
}

