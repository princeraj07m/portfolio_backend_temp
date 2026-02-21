import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudFormComponent } from '../../shared/crud/crud-form.component';

@Component({
  standalone: true,
  selector: 'app-project-form',
  imports: [CommonModule, CrudFormComponent],
  template: `
  <app-crud-form
    [title]="'Create Project'"
    [basePath]="'projects'"
    [backUrl]="'/projects'"
    [autoFields]="true"
    [fields]="[
      { key: 'title', label: 'Title', required: true },
      { key: 'slug', label: 'Slug', required: true },
      { key: 'shortDescription', label: 'Short Description', type: 'textarea' },
      { key: 'longDescription', label: 'Long Description', type: 'textarea' },
      { key: 'problemStatement', label: 'Problem Statement', type: 'textarea' },
      { key: 'solutionSummary', label: 'Solution Summary', type: 'textarea' },
      { key: 'architectureOverview', label: 'Architecture Overview', type: 'textarea' },
      { key: 'bannerImage', label: 'Banner Image' },
      { key: 'thumbnail', label: 'Thumbnail' },
      { key: 'gallery', label: 'Gallery', type: 'array:string' },
      { key: 'repoURL', label: 'Repo URL' },
      { key: 'liveDemoURL', label: 'Live Demo URL' },
      { key: 'videoDemoURL', label: 'Video Demo URL' },
      { key: 'technologies', label: 'Technologies', type: 'array:string' },
      { key: 'tools', label: 'Tools', type: 'array:string' },
      { key: 'frameworks', label: 'Frameworks', type: 'array:string' },
      { key: 'libraries', label: 'Libraries', type: 'array:string' },
      { key: 'type', label: 'Type' },
      { key: 'category', label: 'Category' },
      { key: 'tags', label: 'Tags', type: 'array:string' },
      { key: 'projectGoal', label: 'Project Goal' },
      { key: 'features', label: 'Features', type: 'array:string' },
      { key: 'challenges', label: 'Challenges', type: 'array:string' },
      { key: 'outcomes', label: 'Outcomes', type: 'array:string' },
      { key: 'metrics', label: 'Metrics (JSON)', type: 'json' },
      { key: 'contributors', label: 'Contributors (JSON)', type: 'json' },
      { key: 'client', label: 'Client' },
      { key: 'clientFeedback', label: 'Client Feedback', type: 'textarea' },
      { key: 'budget', label: 'Budget', type: 'number' },
      { key: 'duration', label: 'Duration' },
      { key: 'startDate', label: 'Start Date', type: 'date' },
      { key: 'endDate', label: 'End Date', type: 'date' },
      { key: 'isOngoing', label: 'Ongoing', type: 'checkbox' },
      { key: 'isFeatured', label: 'Featured', type: 'checkbox' },
      { key: 'isPublic', label: 'Public', type: 'checkbox' },
      { key: 'priority', label: 'Priority', type: 'number' },
      { key: 'views', label: 'Views', type: 'number' },
      { key: 'likes', label: 'Likes', type: 'number' },
      { key: 'shares', label: 'Shares', type: 'number' },
      { key: 'rating', label: 'Rating', type: 'number' },
      { key: 'feedback', label: 'Feedback', type: 'array:string' },
      { key: 'comments', label: 'Comments (JSON)', type: 'json' },
      { key: 'relatedProjects', label: 'Related Projects (JSON)', type: 'json' },
      { key: 'lastModifiedBy', label: 'Last Modified By (User Id)' },
      { key: 'seo', label: 'SEO (JSON)', type: 'json' },
      { key: 'analytics', label: 'Analytics (JSON)', type: 'json' }
    ]">
  </app-crud-form>
  `
})
export class ProjectFormComponent {}

