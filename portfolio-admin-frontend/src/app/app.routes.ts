import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent) },
  { path: '', canActivate: [authGuard], loadComponent: () => import('./layout/dashboard.layout').then(m => m.DashboardLayout), children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'projects', loadComponent: () => import('./features/projects/projects-list.component').then(m => m.ProjectsListComponent) },
      { path: 'projects/new', loadComponent: () => import('./features/projects/project-form.component').then(m => m.ProjectFormComponent) },
      { path: 'projects/:id', loadComponent: () => import('./features/projects/project-form.component').then(m => m.ProjectFormComponent) }
      ,{ path: 'blog', loadComponent: () => import('./features/blog/blog-list.component').then(m => m.BlogListComponent) }
      ,{ path: 'awards', loadComponent: () => import('./features/awards/awards-list.component').then(m => m.AwardsListComponent) }
      ,{ path: 'awards/new', loadComponent: () => import('./features/awards/award-form.component').then(m => m.AwardFormComponent) }
      ,{ path: 'awards/:id', loadComponent: () => import('./features/awards/award-form.component').then(m => m.AwardFormComponent) }
      ,{ path: 'blog/categories', loadComponent: () => import('./features/blog/category-list.component').then(m => m.CategoryListComponent) }
      ,{ path: 'blog/categories/new', loadComponent: () => import('./features/blog/category-form.component').then(m => m.CategoryFormComponent) }
      ,{ path: 'blog/categories/:id', loadComponent: () => import('./features/blog/category-form.component').then(m => m.CategoryFormComponent) }
      ,{ path: 'blog/tags', loadComponent: () => import('./features/blog/tag-list.component').then(m => m.TagListComponent) }
      ,{ path: 'blog/tags/new', loadComponent: () => import('./features/blog/tag-form.component').then(m => m.TagFormComponent) }
      ,{ path: 'blog/tags/:id', loadComponent: () => import('./features/blog/tag-form.component').then(m => m.TagFormComponent) }
      ,{ path: 'media', loadComponent: () => import('./features/media/media-list.component').then(m => m.MediaListComponent) }
      ,{ path: 'users', loadComponent: () => import('./features/users/users-list.component').then(m => m.UsersListComponent) }
      ,{ path: 'users/new', loadComponent: () => import('./features/users/user-form.component').then(m => m.UserFormComponent) }
      ,{ path: 'users/:id', loadComponent: () => import('./features/users/user-form.component').then(m => m.UserFormComponent) }
      ,{ path: 'manage', loadComponent: () => import('./features/management/management.component').then(m => m.ManagementComponent) }
      
      ,{ path: 'manage/projects', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Projects', basePath: 'projects', baseUrl: '/manage/projects', columns: [{ key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }, { key: 'isFeatured', label: 'Featured' }] } }
      ,{ path: 'manage/projects/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Project', basePath: 'projects', backUrl: '/manage/projects', autoFields: true, fields: [
        { key: 'title', label: 'Title', required: true },
        { key: 'slug', label: 'Slug', required: true }
      ] } }
      ,{ path: 'manage/projects/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Project', basePath: 'projects', backUrl: '/manage/projects', autoFields: true, fields: [
        { key: 'title', label: 'Title', required: true },
        { key: 'slug', label: 'Slug', required: true }
      ] } }

      ,{ path: 'manage/awards', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Awards', basePath: 'awards', baseUrl: '/manage/awards', columns: [{ key: 'title', label: 'Title' }, { key: 'awardedBy', label: 'Awarded By' }] } }
      ,{ path: 'manage/awards/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Award', basePath: 'awards', backUrl: '/manage/awards', autoFields: true, fields: [
        { key: 'title', label: 'Title' }
      ] } }
      ,{ path: 'manage/awards/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Award', basePath: 'awards', backUrl: '/manage/awards', autoFields: true, fields: [
        { key: 'title', label: 'Title' }
      ] } }

      ,{ path: 'manage/blog-categories', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Blog Categories', basePath: 'blog-categories', baseUrl: '/manage/blog-categories', columns: [{ key: 'name', label: 'Name' }, { key: 'slug', label: 'Slug' }] } }
      ,{ path: 'manage/blog-categories/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Blog Category', basePath: 'blog-categories', backUrl: '/manage/blog-categories', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }], autoFields: true } }
      ,{ path: 'manage/blog-categories/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Blog Category', basePath: 'blog-categories', backUrl: '/manage/blog-categories', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }], autoFields: true } }

      ,{ path: 'manage/blog-tags', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Blog Tags', basePath: 'blog-tags', baseUrl: '/manage/blog-tags', columns: [{ key: 'name', label: 'Name' }, { key: 'slug', label: 'Slug' }] } }
      ,{ path: 'manage/blog-tags/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Blog Tag', basePath: 'blog-tags', backUrl: '/manage/blog-tags', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }], autoFields: true } }
      ,{ path: 'manage/blog-tags/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Blog Tag', basePath: 'blog-tags', backUrl: '/manage/blog-tags', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }], autoFields: true } }

      ,{ path: 'manage/user-profiles', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Users', basePath: 'user-profiles', baseUrl: '/manage/user-profiles', columns: [{ key: 'username', label: 'Username' }, { key: 'email', label: 'Email' }] } }
      ,{ path: 'manage/user-profiles/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create User', basePath: 'user-profiles', backUrl: '/manage/user-profiles', autoFields: true, fields: [
        { key: 'username', label: 'Username', required: true },
        { key: 'email', label: 'Email', required: true },
        { key: 'password', label: 'Password' }
      ] } }
      ,{ path: 'manage/user-profiles/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit User', basePath: 'user-profiles', backUrl: '/manage/user-profiles', autoFields: true, fields: [
        { key: 'username', label: 'Username', required: true },
        { key: 'email', label: 'Email', required: true },
        { key: 'password', label: 'Password' }
      ] } }

      ,{ path: 'manage/internships', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Internships', basePath: 'internships', baseUrl: '/manage/internships', columns: [{ key: 'title', label: 'Title' }, { key: 'company', label: 'Company' }, { key: 'startDate', label: 'Start' }] } }
      ,{ path: 'manage/internships/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Internship', basePath: 'internships', backUrl: '/manage/internships', autoFields: true, fields: [
        { key: 'title', label: 'Title', required: true },
        { key: 'company', label: 'Company', required: true },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'endDate', label: 'End Date', type: 'date' }
      ] } }
      ,{ path: 'manage/internships/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Internship', basePath: 'internships', backUrl: '/manage/internships', autoFields: true, fields: [
        { key: 'title', label: 'Title', required: true },
        { key: 'company', label: 'Company', required: true },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'endDate', label: 'End Date', type: 'date' }
      ] } }

      ,{ path: 'manage/hackathons', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Hackathons', basePath: 'hackathons', baseUrl: '/manage/hackathons', columns: [{ key: 'name', label: 'Name' }, { key: 'organizer', label: 'Organizer' }, { key: 'startDate', label: 'Start' }] } }
      ,{ path: 'manage/hackathons/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Hackathon', basePath: 'hackathons', backUrl: '/manage/hackathons', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'organizer', label: 'Organizer' },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'endDate', label: 'End Date', type: 'date' }
      ] } }
      ,{ path: 'manage/hackathons/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Hackathon', basePath: 'hackathons', backUrl: '/manage/hackathons', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'organizer', label: 'Organizer' },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'endDate', label: 'End Date', type: 'date' }
      ] } }
      ,{ path: 'manage/personal-brands', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Personal Brands', basePath: 'personal-brands', baseUrl: '/manage/personal-brands', columns: [{ key: 'brandName', label: 'Brand' }, { key: 'slogan', label: 'Slogan' }] } }
      ,{ path: 'manage/personal-brands/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Personal Brand', basePath: 'personal-brands', backUrl: '/manage/personal-brands', fields: [{ key: 'brandName', label: 'Brand Name', required: true }, { key: 'slogan', label: 'Slogan' }] } }
      ,{ path: 'manage/personal-brands/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Personal Brand', basePath: 'personal-brands', backUrl: '/manage/personal-brands', fields: [{ key: 'brandName', label: 'Brand Name', required: true }, { key: 'slogan', label: 'Slogan' }] } }

      ,{ path: 'manage/social-links', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Social Links', basePath: 'social-links', baseUrl: '/manage/social-links', columns: [{ key: 'platform', label: 'Platform' }, { key: 'handle', label: 'Handle' }, { key: 'url', label: 'URL' }] } }
      ,{ path: 'manage/social-links/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Social Link', basePath: 'social-links', backUrl: '/manage/social-links', autoFields: true, fields: [
        { key: 'platform', label: 'Platform', required: true },
        { key: 'handle', label: 'Handle' },
        { key: 'username', label: 'Username' },
        { key: 'displayName', label: 'Display Name' },
        { key: 'url', label: 'Profile URL' },
        { key: 'iconUrl', label: 'Icon URL' },
        { key: 'profileUrl', label: 'Alternate Profile URL' },
        { key: 'preferredForContact', label: 'Preferred For Contact', type: 'checkbox' },
        { key: 'isPrimary', label: 'Primary', type: 'checkbox' },
        { key: 'tags', label: 'Tags', type: 'array:string' },
        { key: 'metadata', label: 'Extra Key/Value (JSON object)', type: 'json' }
      ] } }
      ,{ path: 'manage/social-links/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Social Link', basePath: 'social-links', backUrl: '/manage/social-links', autoFields: true, fields: [
        { key: 'platform', label: 'Platform', required: true },
        { key: 'handle', label: 'Handle' },
        { key: 'username', label: 'Username' },
        { key: 'displayName', label: 'Display Name' },
        { key: 'url', label: 'Profile URL' },
        { key: 'iconUrl', label: 'Icon URL' },
        { key: 'profileUrl', label: 'Alternate Profile URL' },
        { key: 'preferredForContact', label: 'Preferred For Contact', type: 'checkbox' },
        { key: 'isPrimary', label: 'Primary', type: 'checkbox' },
        { key: 'tags', label: 'Tags', type: 'array:string' },
        { key: 'metadata', label: 'Extra Key/Value (JSON object)', type: 'json' }
      ] } }
      ,{ path: 'manage/contact-infos', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Contact Info', basePath: 'contact-infos', baseUrl: '/manage/contact-infos', columns: [{ key: 'primaryEmail', label: 'Primary Email' }, { key: 'preferredContactMethod', label: 'Preferred' }] } }
      ,{ path: 'manage/contact-infos/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Contact Info', basePath: 'contact-infos', backUrl: '/manage/contact-infos', fields: [{ key: 'primaryEmail', label: 'Primary Email', required: true }, { key: 'preferredContactMethod', label: 'Preferred Method' }] } }
      ,{ path: 'manage/contact-infos/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Contact Info', basePath: 'contact-infos', backUrl: '/manage/contact-infos', fields: [{ key: 'primaryEmail', label: 'Primary Email', required: true }, { key: 'preferredContactMethod', label: 'Preferred Method' }] } }

      ,{ path: 'manage/skills', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Skills', basePath: 'skills', baseUrl: '/manage/skills', columns: [{ key: 'name', label: 'Name' }, { key: 'level', label: 'Level' }, { key: 'category', label: 'Category' }] } }
      ,{ path: 'manage/skills/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Skill', basePath: 'skills', backUrl: '/manage/skills', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'level', label: 'Level', type: 'number' },
        { key: 'category', label: 'Category' },
        { key: 'order', label: 'Order', type: 'number' }
      ] } }
      ,{ path: 'manage/skills/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Skill', basePath: 'skills', backUrl: '/manage/skills', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'level', label: 'Level', type: 'number' },
        { key: 'category', label: 'Category' },
        { key: 'order', label: 'Order', type: 'number' }
      ] } }

      ,{ path: 'manage/media-assets', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Media Assets', basePath: 'media-assets', baseUrl: '/manage/media-assets', columns: [{ key: 'fileName', label: 'File' }, { key: 'mimeType', label: 'Type' }] } }
      ,{ path: 'manage/media-assets/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Media Asset', basePath: 'media-assets', backUrl: '/manage/media-assets', autoFields: true, fields: [
        { key: 'fileName', label: 'File Name', required: true },
        { key: 'url', label: 'URL', required: true },
        { key: 'mimeType', label: 'MIME Type' }
      ] } }
      ,{ path: 'manage/media-assets/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Media Asset', basePath: 'media-assets', backUrl: '/manage/media-assets', autoFields: true, fields: [
        { key: 'fileName', label: 'File Name', required: true },
        { key: 'url', label: 'URL', required: true },
        { key: 'mimeType', label: 'MIME Type' }
      ] } }

      ,{ path: 'manage/testimonials', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Testimonials', basePath: 'testimonials', baseUrl: '/manage/testimonials', columns: [{ key: 'name', label: 'Name' }, { key: 'company', label: 'Company' }] } }
      ,{ path: 'manage/testimonials/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Testimonial', basePath: 'testimonials', backUrl: '/manage/testimonials', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'company', label: 'Company' },
        { key: 'message', label: 'Message', type: 'textarea' }
      ] } }
      ,{ path: 'manage/testimonials/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Testimonial', basePath: 'testimonials', backUrl: '/manage/testimonials', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'company', label: 'Company' },
        { key: 'message', label: 'Message', type: 'textarea' }
      ] } }

      ,{ path: 'manage/contacts', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Contacts', basePath: 'contacts', baseUrl: '/manage/contacts', columns: [{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }] } }
      ,{ path: 'manage/contacts/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Contact', basePath: 'contacts', backUrl: '/manage/contacts', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'email', label: 'Email' },
        { key: 'message', label: 'Message', type: 'textarea' }
      ] } }
      ,{ path: 'manage/contacts/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Contact', basePath: 'contacts', backUrl: '/manage/contacts', autoFields: true, fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'email', label: 'Email' },
        { key: 'message', label: 'Message', type: 'textarea' }
      ] } }

      ,{ path: 'manage/settings', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Settings', basePath: 'settings', baseUrl: '/manage/settings', columns: [{ key: 'key', label: 'Key' }, { key: 'value', label: 'Value' }] } }
      ,{ path: 'manage/settings/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Setting', basePath: 'settings', backUrl: '/manage/settings', autoFields: true, fields: [
        { key: 'key', label: 'Key', required: true },
        { key: 'value', label: 'Value', type: 'json' }
      ] } }
      ,{ path: 'manage/settings/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Setting', basePath: 'settings', backUrl: '/manage/settings', autoFields: true, fields: [
        { key: 'key', label: 'Key', required: true },
        { key: 'value', label: 'Value', type: 'json' }
      ] } }
      ,{ path: 'manage/personal-settings', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Personal Settings', basePath: 'personal-settings', baseUrl: '/manage/personal-settings', columns: [{ key: 'siteTitle', label: 'Site Title' }, { key: 'defaultLanguage', label: 'Language' }] } }
      ,{ path: 'manage/personal-settings/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Personal Setting', basePath: 'personal-settings', backUrl: '/manage/personal-settings', fields: [{ key: 'siteTitle', label: 'Site Title', required: true }, { key: 'defaultLanguage', label: 'Default Language' }] } }
      ,{ path: 'manage/personal-settings/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Personal Setting', basePath: 'personal-settings', backUrl: '/manage/personal-settings', fields: [{ key: 'siteTitle', label: 'Site Title', required: true }, { key: 'defaultLanguage', label: 'Default Language' }] } }

      ,{ path: 'manage/experiences', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Experience', basePath: 'experiences', baseUrl: '/manage/experiences', columns: [{ key: 'title', label: 'Title' }, { key: 'company', label: 'Company' }] } }
      ,{ path: 'manage/experiences/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Experience', basePath: 'experiences', backUrl: '/manage/experiences', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'company', label: 'Company', required: true }] } }
      ,{ path: 'manage/experiences/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Experience', basePath: 'experiences', backUrl: '/manage/experiences', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'company', label: 'Company', required: true }] } }

      ,{ path: 'manage/educations', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Education', basePath: 'educations', baseUrl: '/manage/educations', columns: [{ key: 'institution', label: 'Institution' }, { key: 'degree', label: 'Degree' }] } }
      ,{ path: 'manage/educations/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Education', basePath: 'educations', backUrl: '/manage/educations', autoFields: true, fields: [
        { key: 'institution', label: 'Institution', required: true },
        { key: 'institutionUrl', label: 'Institution URL' },
        { key: 'institutionLogo', label: 'Institution Logo' },
        { key: 'degree', label: 'Degree', required: true },
        { key: 'fieldOfStudy', label: 'Field Of Study' },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'endDate', label: 'End Date', type: 'date' },
        { key: 'grade', label: 'Grade' },
        { key: 'gpa', label: 'GPA', type: 'number' },
        { key: 'gpaScale', label: 'GPA Scale', type: 'number' },
        { key: 'honors', label: 'Honors' },
        { key: 'courses', label: 'Courses', type: 'array:string' },
        { key: 'thesis', label: 'Thesis (JSON)', type: 'json' },
        { key: 'extracurriculars', label: 'Extracurriculars', type: 'array:string' },
        { key: 'location', label: 'Location (JSON)', type: 'json' },
        { key: 'certifications', label: 'Certifications', type: 'array:string' },
        { key: 'projects', label: 'Projects (JSON)', type: 'json' },
        { key: 'achievements', label: 'Achievements', type: 'array:string' },
        { key: 'attachments', label: 'Attachments (JSON)', type: 'json' },
        { key: 'visibleOnProfile', label: 'Visible On Profile', type: 'checkbox' },
        { key: 'orderIndex', label: 'Order', type: 'number' },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ] } }
      ,{ path: 'manage/educations/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Education', basePath: 'educations', backUrl: '/manage/educations', autoFields: true, fields: [
        { key: 'institution', label: 'Institution', required: true },
        { key: 'institutionUrl', label: 'Institution URL' },
        { key: 'institutionLogo', label: 'Institution Logo' },
        { key: 'degree', label: 'Degree', required: true },
        { key: 'fieldOfStudy', label: 'Field Of Study' },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'endDate', label: 'End Date', type: 'date' },
        { key: 'grade', label: 'Grade' },
        { key: 'gpa', label: 'GPA', type: 'number' },
        { key: 'gpaScale', label: 'GPA Scale', type: 'number' },
        { key: 'honors', label: 'Honors' },
        { key: 'courses', label: 'Courses', type: 'array:string' },
        { key: 'thesis', label: 'Thesis (JSON)', type: 'json' },
        { key: 'extracurriculars', label: 'Extracurriculars', type: 'array:string' },
        { key: 'location', label: 'Location (JSON)', type: 'json' },
        { key: 'certifications', label: 'Certifications', type: 'array:string' },
        { key: 'projects', label: 'Projects (JSON)', type: 'json' },
        { key: 'achievements', label: 'Achievements', type: 'array:string' },
        { key: 'attachments', label: 'Attachments (JSON)', type: 'json' },
        { key: 'visibleOnProfile', label: 'Visible On Profile', type: 'checkbox' },
        { key: 'orderIndex', label: 'Order', type: 'number' },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ] } }

      ,{ path: 'manage/skills-expanded', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Expanded Skills', basePath: 'skills-expanded', baseUrl: '/manage/skills-expanded', columns: [{ key: 'name', label: 'Name' }, { key: 'proficiencyLevel', label: 'Level' }] } }
      ,{ path: 'manage/skills-expanded/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Skill', basePath: 'skills-expanded', backUrl: '/manage/skills-expanded', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'proficiencyLevel', label: 'Level' }] } }
      ,{ path: 'manage/skills-expanded/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Skill', basePath: 'skills-expanded', backUrl: '/manage/skills-expanded', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'proficiencyLevel', label: 'Level' }] } }

      ,{ path: 'manage/certifications', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Certifications', basePath: 'certifications', baseUrl: '/manage/certifications', columns: [{ key: 'title', label: 'Title' }, { key: 'issuingOrganization', label: 'Issuer' }] } }
      ,{ path: 'manage/certifications/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Certification', basePath: 'certifications', backUrl: '/manage/certifications', autoFields: true, fields: [
        { key: 'title', label: 'Title', required: true },
        { key: 'issuingOrganization', label: 'Issuing Organization', required: true },
        { key: 'issueDate', label: 'Issue Date', type: 'date' },
        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
        { key: 'credentialId', label: 'Credential ID' },
        { key: 'credentialUrl', label: 'Credential URL' },
        { key: 'certificateFileUrl', label: 'Certificate File URL' },
        { key: 'score', label: 'Score', type: 'number' },
        { key: 'scoreMax', label: 'Score Max', type: 'number' },
        { key: 'verificationStatus', label: 'Verification Status' },
        { key: 'verificationMethod', label: 'Verification Method' },
        { key: 'verifiedByUrl', label: 'Verified By URL' },
        { key: 'skillsCovered', label: 'Skills Covered', type: 'array:string' },
        { key: 'tags', label: 'Tags', type: 'array:string' },
        { key: 'notes', label: 'Notes', type: 'textarea' },
        { key: 'attachments', label: 'Attachments (JSON)', type: 'json' },
        { key: 'visible', label: 'Visible', type: 'checkbox' },
        { key: 'orderIndex', label: 'Order', type: 'number' }
      ] } }
      ,{ path: 'manage/certifications/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Certification', basePath: 'certifications', backUrl: '/manage/certifications', autoFields: true, fields: [
        { key: 'title', label: 'Title', required: true },
        { key: 'issuingOrganization', label: 'Issuing Organization', required: true },
        { key: 'issueDate', label: 'Issue Date', type: 'date' },
        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
        { key: 'credentialId', label: 'Credential ID' },
        { key: 'credentialUrl', label: 'Credential URL' },
        { key: 'certificateFileUrl', label: 'Certificate File URL' },
        { key: 'score', label: 'Score', type: 'number' },
        { key: 'scoreMax', label: 'Score Max', type: 'number' },
        { key: 'verificationStatus', label: 'Verification Status' },
        { key: 'verificationMethod', label: 'Verification Method' },
        { key: 'verifiedByUrl', label: 'Verified By URL' },
        { key: 'skillsCovered', label: 'Skills Covered', type: 'array:string' },
        { key: 'tags', label: 'Tags', type: 'array:string' },
        { key: 'notes', label: 'Notes', type: 'textarea' },
        { key: 'attachments', label: 'Attachments (JSON)', type: 'json' },
        { key: 'visible', label: 'Visible', type: 'checkbox' },
        { key: 'orderIndex', label: 'Order', type: 'number' }
      ] } }

      ,{ path: 'manage/achievements', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Achievements', basePath: 'achievements', baseUrl: '/manage/achievements', columns: [{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'awardDate', label: 'Date' }] } }
      ,{ path: 'manage/achievements/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Achievement', basePath: 'achievements', backUrl: '/manage/achievements', fields: [
        { key: 'userId', label: 'User Id', required: true, pattern: '^[a-fA-F0-9]{24}$', placeholder: '24-char hex ObjectId' },
        { key: 'title', label: 'Title' , required: false},
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'category', label: 'Category' },
        { key: 'awardingOrganization', label: 'Awarding Organization' },
        { key: 'awardDate', label: 'Award Date', type: 'date' },
        { key: 'certificateUrl', label: 'Certificate URL' },
        { key: 'badgeUrl', label: 'Badge URL' },
        { key: 'level', label: 'Level' },
        { key: 'rank', label: 'Rank' },
        { key: 'relatedProject', label: 'Related Project (Id)', pattern: '^[a-fA-F0-9]{24}$', placeholder: '24-char hex ObjectId' },
        { key: 'relatedSkill', label: 'Related Skill' },
        { key: 'publicNotes', label: 'Public Notes', type: 'textarea' },
        { key: 'internalNotes', label: 'Internal Notes', type: 'textarea' },
        { key: 'visibility', label: 'Visibility' },
        { key: 'tags', label: 'Tags', type: 'array:string' },
        { key: 'location', label: 'Location' },
        { key: 'judgesComments', label: 'Judges Comments', type: 'textarea' },
        { key: 'score', label: 'Score', type: 'number' },
        { key: 'proofFiles', label: 'Proof Files (JSON)', type: 'json' },
        { key: 'endorsers', label: 'Endorsers (JSON)', type: 'json' },
        { key: 'impactMetrics', label: 'Impact Metrics (JSON)', type: 'json' },
        { key: 'customFields', label: 'Custom Fields (JSON)', type: 'json' }
      ] } }
      ,{ path: 'manage/achievements/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Achievement', basePath: 'achievements', backUrl: '/manage/achievements', fields: [
        { key: 'userId', label: 'User Id', required: true, pattern: '^[a-fA-F0-9]{24}$', placeholder: '24-char hex ObjectId' },
        { key: 'title', label: 'Title' , required: false},
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'category', label: 'Category' },
        { key: 'awardingOrganization', label: 'Awarding Organization' },
        { key: 'awardDate', label: 'Award Date', type: 'date' },
        { key: 'certificateUrl', label: 'Certificate URL' },
        { key: 'badgeUrl', label: 'Badge URL' },
        { key: 'level', label: 'Level' },
        { key: 'rank', label: 'Rank' },
        { key: 'relatedProject', label: 'Related Project (Id)', pattern: '^[a-fA-F0-9]{24}$', placeholder: '24-char hex ObjectId' },
        { key: 'relatedSkill', label: 'Related Skill' },
        { key: 'publicNotes', label: 'Public Notes', type: 'textarea' },
        { key: 'internalNotes', label: 'Internal Notes', type: 'textarea' },
        { key: 'visibility', label: 'Visibility' },
        { key: 'tags', label: 'Tags', type: 'array:string' },
        { key: 'location', label: 'Location' },
        { key: 'judgesComments', label: 'Judges Comments', type: 'textarea' },
        { key: 'score', label: 'Score', type: 'number' },
        { key: 'proofFiles', label: 'Proof Files (JSON)', type: 'json' },
        { key: 'endorsers', label: 'Endorsers (JSON)', type: 'json' },
        { key: 'impactMetrics', label: 'Impact Metrics (JSON)', type: 'json' },
        { key: 'customFields', label: 'Custom Fields (JSON)', type: 'json' }
      ] } }

      ,{ path: 'manage/volunteer-experiences', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Volunteer Experience', basePath: 'volunteer-experiences', baseUrl: '/manage/volunteer-experiences', columns: [{ key: 'organizationName', label: 'Organization' }, { key: 'title', label: 'Title' }] } }
      ,{ path: 'manage/volunteer-experiences/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Volunteer Experience', basePath: 'volunteer-experiences', backUrl: '/manage/volunteer-experiences', fields: [{ key: 'organizationName', label: 'Organization', required: true }, { key: 'title', label: 'Title' }] } }
      ,{ path: 'manage/volunteer-experiences/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Volunteer Experience', basePath: 'volunteer-experiences', backUrl: '/manage/volunteer-experiences', fields: [{ key: 'organizationName', label: 'Organization', required: true }, { key: 'title', label: 'Title' }] } }

      ,{ path: 'manage/project-categories', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Project Categories', basePath: 'project-categories', baseUrl: '/manage/project-categories', columns: [{ key: 'name', label: 'Name' }, { key: 'slug', label: 'Slug' }] } }
      ,{ path: 'manage/project-categories/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Project Category', basePath: 'project-categories', backUrl: '/manage/project-categories', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }] } }
      ,{ path: 'manage/project-categories/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Project Category', basePath: 'project-categories', backUrl: '/manage/project-categories', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug', required: true }] } }

      ,{ path: 'manage/project-versions', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Project Versions', basePath: 'project-versions', baseUrl: '/manage/project-versions', columns: [{ key: 'versionName', label: 'Version' }, { key: 'releaseType', label: 'Type' }] } }
      ,{ path: 'manage/project-versions/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Project Version', basePath: 'project-versions', backUrl: '/manage/project-versions', fields: [{ key: 'versionName', label: 'Version Name', required: true }, { key: 'releaseType', label: 'Release Type' }] } }
      ,{ path: 'manage/project-versions/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Project Version', basePath: 'project-versions', backUrl: '/manage/project-versions', fields: [{ key: 'versionName', label: 'Version Name', required: true }, { key: 'releaseType', label: 'Release Type' }] } }

      ,{ path: 'manage/project-feedbacks', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Project Feedback', basePath: 'project-feedbacks', baseUrl: '/manage/project-feedbacks', columns: [{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }] } }
      ,{ path: 'manage/project-feedbacks/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Feedback', basePath: 'project-feedbacks', backUrl: '/manage/project-feedbacks', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'status', label: 'Status' }] } }
      ,{ path: 'manage/project-feedbacks/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Feedback', basePath: 'project-feedbacks', backUrl: '/manage/project-feedbacks', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'status', label: 'Status' }] } }

      ,{ path: 'manage/project-files', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Project Files', basePath: 'project-files', baseUrl: '/manage/project-files', columns: [{ key: 'fileName', label: 'File' }, { key: 'fileType', label: 'Type' }] } }
      ,{ path: 'manage/project-files/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Project File', basePath: 'project-files', backUrl: '/manage/project-files', fields: [{ key: 'fileName', label: 'File Name', required: true }, { key: 'fileURL', label: 'File URL', required: true }] } }
      ,{ path: 'manage/project-files/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Project File', basePath: 'project-files', backUrl: '/manage/project-files', fields: [{ key: 'fileName', label: 'File Name', required: true }, { key: 'fileURL', label: 'File URL', required: true }] } }

      ,{ path: 'manage/collaborations', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Collaborations', basePath: 'collaborations', baseUrl: '/manage/collaborations', columns: [{ key: 'collaboratorName', label: 'Name' }, { key: 'role', label: 'Role' }] } }
      ,{ path: 'manage/collaborations/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Collaboration', basePath: 'collaborations', backUrl: '/manage/collaborations', fields: [{ key: 'collaboratorName', label: 'Name', required: true }, { key: 'role', label: 'Role' }] } }
      ,{ path: 'manage/collaborations/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Collaboration', basePath: 'collaborations', backUrl: '/manage/collaborations', fields: [{ key: 'collaboratorName', label: 'Name', required: true }, { key: 'role', label: 'Role' }] } }

      ,{ path: 'manage/clients', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Clients', basePath: 'clients', baseUrl: '/manage/clients', columns: [{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }] } }
      ,{ path: 'manage/clients/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Client', basePath: 'clients', backUrl: '/manage/clients', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'email', label: 'Email' }] } }
      ,{ path: 'manage/clients/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Client', basePath: 'clients', backUrl: '/manage/clients', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'email', label: 'Email' }] } }

      ,{ path: 'manage/proposals', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Proposals', basePath: 'proposals', baseUrl: '/manage/proposals', columns: [{ key: 'title', label: 'Title' }, { key: 'status', label: 'Status' }] } }
      ,{ path: 'manage/proposals/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Proposal', basePath: 'proposals', backUrl: '/manage/proposals', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'status', label: 'Status' }] } }
      ,{ path: 'manage/proposals/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Proposal', basePath: 'proposals', backUrl: '/manage/proposals', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'status', label: 'Status' }] } }

      ,{ path: 'manage/gallery-items', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Gallery Items', basePath: 'gallery-items', baseUrl: '/manage/gallery-items', columns: [{ key: 'title', label: 'Title' }, { key: 'galleryType', label: 'Type' }] } }
      ,{ path: 'manage/gallery-items/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Gallery Item', basePath: 'gallery-items', backUrl: '/manage/gallery-items', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'galleryType', label: 'Type' }] } }
      ,{ path: 'manage/gallery-items/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Gallery Item', basePath: 'gallery-items', backUrl: '/manage/gallery-items', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'galleryType', label: 'Type' }] } }

      ,{ path: 'manage/sections', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Sections', basePath: 'sections', baseUrl: '/manage/sections', columns: [{ key: 'name', label: 'Name' }, { key: 'layoutType', label: 'Layout' }] } }
      ,{ path: 'manage/sections/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Section', basePath: 'sections', backUrl: '/manage/sections', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'layoutType', label: 'Layout' }] } }
      ,{ path: 'manage/sections/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Section', basePath: 'sections', backUrl: '/manage/sections', fields: [{ key: 'name', label: 'Name', required: true }, { key: 'layoutType', label: 'Layout' }] } }

      ,{ path: 'manage/custom-sections', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Custom Sections', basePath: 'custom-sections', baseUrl: '/manage/custom-sections', columns: [{ key: 'title', label: 'Title' }, { key: 'layout', label: 'Layout' }] } }
      ,{ path: 'manage/custom-sections/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Custom Section', basePath: 'custom-sections', backUrl: '/manage/custom-sections', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'layout', label: 'Layout' }] } }
      ,{ path: 'manage/custom-sections/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Custom Section', basePath: 'custom-sections', backUrl: '/manage/custom-sections', fields: [{ key: 'title', label: 'Title', required: true }, { key: 'layout', label: 'Layout' }] } }

      ,{ path: 'manage/theme-settings', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Theme Settings', basePath: 'theme-settings', baseUrl: '/manage/theme-settings', columns: [{ key: 'themeName', label: 'Theme' }, { key: 'version', label: 'Version' }] } }
      ,{ path: 'manage/theme-settings/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Theme Setting', basePath: 'theme-settings', backUrl: '/manage/theme-settings', fields: [{ key: 'themeName', label: 'Theme Name', required: true }, { key: 'version', label: 'Version' }] } }
      ,{ path: 'manage/theme-settings/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Theme Setting', basePath: 'theme-settings', backUrl: '/manage/theme-settings', fields: [{ key: 'themeName', label: 'Theme Name', required: true }, { key: 'version', label: 'Version' }] } }

      ,{ path: 'manage/seo', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'SEO', basePath: 'seo', baseUrl: '/manage/seo', columns: [{ key: 'pageName', label: 'Page' }, { key: 'metaTitle', label: 'Title' }] } }
      ,{ path: 'manage/seo/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create SEO', basePath: 'seo', backUrl: '/manage/seo', fields: [{ key: 'pageName', label: 'Page Name', required: true }, { key: 'metaTitle', label: 'Meta Title' }] } }
      ,{ path: 'manage/seo/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit SEO', basePath: 'seo', backUrl: '/manage/seo', fields: [{ key: 'pageName', label: 'Page Name', required: true }, { key: 'metaTitle', label: 'Meta Title' }] } }

      ,{ path: 'manage/blog-posts', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Blog Posts', basePath: 'blog-posts', baseUrl: '/manage/blog-posts', columns: [{ key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }, { key: 'status', label: 'Status' }] } }
      ,{ path: 'manage/blog-posts/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Blog Post', basePath: 'blog-posts', backUrl: '/manage/blog-posts', fields: [
        { key: 'userId', label: 'Author', type: 'select', options: { apiBasePath: 'user-profiles', labelKey: 'displayName', valueKey: '_id' } },
        { key: 'title', label: 'Title', required: true },
        { key: 'slug', label: 'Slug', required: true },
        { key: 'summary', label: 'Summary', type: 'textarea' },
        { key: 'content', label: 'Content', type: 'textarea' },
        { key: 'coverImage', label: 'Cover Image' },
        { key: 'categoryId', label: 'Category', type: 'select', options: { apiBasePath: 'blog-categories', labelKey: 'name', valueKey: '_id' } },
        { key: 'tags', label: 'Tags', type: 'select', options: { apiBasePath: 'blog-tags', labelKey: 'name', valueKey: 'slug', multiple: true } },
        { key: 'status', label: 'Status' },
        { key: 'scheduledPublishDate', label: 'Schedule', type: 'date' },
        { key: 'isFeatured', label: 'Featured', type: 'checkbox' },
        { key: 'visibility', label: 'Visibility' }
      ] } }
      ,{ path: 'manage/blog-posts/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Blog Post', basePath: 'blog-posts', backUrl: '/manage/blog-posts', fields: [
        { key: 'userId', label: 'Author', type: 'select', options: { apiBasePath: 'user-profiles', labelKey: 'displayName', valueKey: '_id' } },
        { key: 'title', label: 'Title', required: true },
        { key: 'slug', label: 'Slug', required: true },
        { key: 'summary', label: 'Summary', type: 'textarea' },
        { key: 'content', label: 'Content', type: 'textarea' },
        { key: 'coverImage', label: 'Cover Image' },
        { key: 'categoryId', label: 'Category', type: 'select', options: { apiBasePath: 'blog-categories', labelKey: 'name', valueKey: '_id' } },
        { key: 'tags', label: 'Tags', type: 'select', options: { apiBasePath: 'blog-tags', labelKey: 'name', valueKey: 'slug', multiple: true } },
        { key: 'status', label: 'Status' },
        { key: 'scheduledPublishDate', label: 'Schedule', type: 'date' },
        { key: 'isFeatured', label: 'Featured', type: 'checkbox' },
        { key: 'visibility', label: 'Visibility' }
      ] } }

      ,{ path: 'manage/blog-comments', loadComponent: () => import('./shared/crud/crud-list.component').then(m => m.CrudListComponent), data: { title: 'Blog Comments', basePath: 'blog-comments', baseUrl: '/manage/blog-comments', columns: [{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }] } }
      ,{ path: 'manage/blog-comments/new', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Create Blog Comment', basePath: 'blog-comments', backUrl: '/manage/blog-comments', fields: [
        { key: 'postId', label: 'Post', required: true, type: 'select', options: { apiBasePath: 'blog-posts', labelKey: 'title', valueKey: '_id' } },
        { key: 'userId', label: 'User', type: 'select', options: { apiBasePath: 'user-profiles', labelKey: 'displayName', valueKey: '_id' } },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'commentText', label: 'Comment', type: 'textarea' },
        { key: 'status', label: 'Status' },
        { key: 'isPinned', label: 'Pinned', type: 'checkbox' }
      ] } }
      ,{ path: 'manage/blog-comments/:id', loadComponent: () => import('./shared/crud/crud-form.component').then(m => m.CrudFormComponent), data: { title: 'Edit Blog Comment', basePath: 'blog-comments', backUrl: '/manage/blog-comments', fields: [
        { key: 'postId', label: 'Post', required: true, type: 'select', options: { apiBasePath: 'blog-posts', labelKey: 'title', valueKey: '_id' } },
        { key: 'userId', label: 'User', type: 'select', options: { apiBasePath: 'user-profiles', labelKey: 'displayName', valueKey: '_id' } },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'commentText', label: 'Comment', type: 'textarea' },
        { key: 'status', label: 'Status' },
        { key: 'isPinned', label: 'Pinned', type: 'checkbox' }
      ] } }
    ]
  },
  { path: '**', redirectTo: '' }
];
