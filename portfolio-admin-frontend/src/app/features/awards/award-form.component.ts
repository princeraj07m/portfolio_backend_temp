import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AwardsService, Award } from './awards.service';
import { ProjectsService, Project } from '../projects/projects.service';
import { UsersService, UserProfile } from '../users/users.service';
import { CrudService } from '../../shared/crud/crud.service';

@Component({
  standalone: true,
  selector: 'app-award-form',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container-fluid" *ngIf="model">
    <h3 class="mb-3">{{model._id ? 'Edit' : 'Create'}} Award</h3>
    <form (ngSubmit)="save()" #f="ngForm" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">User</label>
        <select class="form-select" [(ngModel)]="model.userId" name="userId" required>
          <option [ngValue]="''">-- Select User --</option>
          <option *ngFor="let u of users" [ngValue]="u._id">{{u.displayName || u.username || u.email}}</option>
        </select>
      </div>
      <div class="col-md-6">
        <label class="form-label">Title</label>
        <input class="form-control" [(ngModel)]="model.title" name="title" required />
      </div>

      <div class="col-md-6"><label class="form-label">Organization</label><input class="form-control" [(ngModel)]="model.organization" name="organization" /></div>
      <div class="col-md-3"><label class="form-label">Category</label><input class="form-control" [(ngModel)]="model.category" name="category" /></div>
      <div class="col-md-3"><label class="form-label">Subcategory</label><input class="form-control" [(ngModel)]="model.subcategory" name="subcategory" /></div>
      <div class="col-md-4"><label class="form-label">Date Received</label><input type="date" class="form-control" [(ngModel)]="model.dateReceived" name="dateReceived" /></div>
      <div class="col-md-4"><label class="form-label">Award Level</label><input class="form-control" [(ngModel)]="model.awardLevel" name="awardLevel" /></div>
      <div class="col-md-4"><label class="form-label">Visibility</label><input class="form-control" [(ngModel)]="model.visibility" name="visibility" /></div>

      <div class="col-12"><label class="form-label">Description</label><textarea class="form-control" rows="3" [(ngModel)]="model.description" name="description"></textarea></div>

      <div class="col-md-6"><label class="form-label">Image URL</label><input class="form-control" [(ngModel)]="model.imageURL" name="imageURL" /></div>
      <div class="col-md-6"><label class="form-label">Certificate URL</label><input class="form-control" [(ngModel)]="model.certificateURL" name="certificateURL" /></div>
      <div class="col-md-6"><label class="form-label">Award Logo</label><input class="form-control" [(ngModel)]="model.awardLogo" name="awardLogo" /></div>
      <div class="col-md-6"><label class="form-label">Issued By</label><input class="form-control" [(ngModel)]="model.issuedBy" name="issuedBy" /></div>
      <div class="col-md-6"><label class="form-label">Judge Name</label><input class="form-control" [(ngModel)]="model.judgeName" name="judgeName" /></div>
      <div class="col-md-6"><label class="form-label">Criteria</label><input class="form-control" [(ngModel)]="model.criteria" name="criteria" /></div>
      <div class="col-md-6"><label class="form-label">Nomination Details</label><input class="form-control" [(ngModel)]="model.nominationDetails" name="nominationDetails" /></div>
      <div class="col-md-6"><label class="form-label">Award Type</label><input class="form-control" [(ngModel)]="model.awardType" name="awardType" /></div>
      <div class="col-md-6"><label class="form-label">Location</label><input class="form-control" [(ngModel)]="model.location" name="location" /></div>

      <div class="col-12"><label class="form-label d-flex justify-content-between align-items-center">Tags
        <button type="button" class="btn btn-sm btn-outline-primary" (click)="push(model.tags)">Add</button></label>
        <div class="vstack gap-2"><div class="input-group" *ngFor="let v of (model.tags || []); let i = index">
          <input class="form-control" [(ngModel)]="model.tags[i]" name="tag_{{i}}" />
          <button type="button" class="btn btn-outline-danger" (click)="splice(model.tags,i)">Remove</button>
        </div></div>
      </div>

      <div class="col-md-4"><label class="form-label">Relevance Score</label><input type="number" class="form-control" [(ngModel)]="model.relevanceScore" name="relevanceScore" /></div>
      <div class="col-md-4">
        <label class="form-label">Project</label>
        <select class="form-select" [(ngModel)]="model.projectRef" name="projectRef">
          <option [ngValue]="''">-- None --</option>
          <option *ngFor="let p of projects" [ngValue]="p._id">{{p.title}}</option>
        </select>
      </div>
      <div class="col-md-4"><div class="form-check mt-4"><input class="form-check-input" type="checkbox" [(ngModel)]="model.isFeatured" name="isFeatured" id="isFeatured"><label class="form-check-label" for="isFeatured">Featured</label></div></div>

      <div class="col-md-4"><label class="form-label">Position Rank</label><input class="form-control" [(ngModel)]="model.positionRank" name="positionRank" /></div>
      <div class="col-md-4"><label class="form-label">Grade</label><input class="form-control" [(ngModel)]="model.grade" name="grade" /></div>
      <div class="col-md-4"><label class="form-label">Points</label><input type="number" class="form-control" [(ngModel)]="model.points" name="points" /></div>

      <div class="col-md-6"><label class="form-label">Recognition URL</label><input class="form-control" [(ngModel)]="model.recognitionURL" name="recognitionURL" /></div>

      <div class="col-12"><label class="form-label d-flex justify-content-between align-items-center">Related Media
        <button type="button" class="btn btn-sm btn-outline-primary" (click)="push(model.relatedMedia)">Add</button></label>
        <div class="vstack gap-2"><div class="input-group" *ngFor="let v of (model.relatedMedia || []); let i = index">
          <input class="form-control" [(ngModel)]="model.relatedMedia[i]" name="relMedia_{{i}}" />
          <button type="button" class="btn btn-outline-danger" (click)="splice(model.relatedMedia,i)">Remove</button>
        </div></div>
      </div>

      <div class="col-12"><label class="form-label">Notes</label><textarea class="form-control" rows="2" [(ngModel)]="model.notes" name="notes"></textarea></div>
      <div class="col-md-6"><label class="form-label">Internal Code</label><input class="form-control" [(ngModel)]="model.internalCode" name="internalCode" /></div>
      <div class="col-md-6"><label class="form-label">Reviewer Comment</label><input class="form-control" [(ngModel)]="model.reviewerComment" name="reviewerComment" /></div>
      <div class="col-md-6"><label class="form-label">Shareable Link</label><input class="form-control" [(ngModel)]="model.shareableLink" name="shareableLink" /></div>

      <div class="col-md-3"><label class="form-label">Likes Count</label><input type="number" class="form-control" [(ngModel)]="model.likesCount" name="likesCount" /></div>
      <div class="col-md-3"><label class="form-label">Views Count</label><input type="number" class="form-control" [(ngModel)]="model.viewsCount" name="viewsCount" /></div>
      <div class="col-md-3"><label class="form-label">Downloads Count</label><input type="number" class="form-control" [(ngModel)]="model.downloadsCount" name="downloadsCount" /></div>
      <div class="col-md-3"><label class="form-label">Shares Count</label><input type="number" class="form-control" [(ngModel)]="model.sharesCount" name="sharesCount" /></div>

      <div class="col-12"><label class="form-label d-flex justify-content-between align-items-center">Comments (Ids)
        <button type="button" class="btn btn-sm btn-outline-primary" (click)="push(model.comments)">Add</button></label>
        <div class="vstack gap-2"><div class="input-group" *ngFor="let v of (model.comments || []); let i = index">
          <input class="form-control" [(ngModel)]="model.comments[i]" name="comment_{{i}}" pattern="^[a-fA-F0-9]{24}$" placeholder="24-char hex ObjectId" />
          <button type="button" class="btn btn-outline-danger" (click)="splice(model.comments,i)">Remove</button>
        </div></div>
      </div>
      <div class="col-md-4"><label class="form-label">Comments Count</label><input type="number" class="form-control" [(ngModel)]="model.commentsCount" name="commentsCount" /></div>
      <div class="col-md-4"><label class="form-label">Feedback Rating</label><input type="number" class="form-control" [(ngModel)]="model.feedbackRating" name="feedbackRating" /></div>

      <div class="col-12"><label class="form-label d-flex justify-content-between align-items-center">Feedback Messages
        <button type="button" class="btn btn-sm btn-outline-primary" (click)="push(model.feedbackMessages)">Add</button></label>
        <div class="vstack gap-2"><div class="input-group" *ngFor="let v of (model.feedbackMessages || []); let i = index">
          <input class="form-control" [(ngModel)]="model.feedbackMessages[i]" name="fbMsg_{{i}}" />
          <button type="button" class="btn btn-outline-danger" (click)="splice(model.feedbackMessages,i)">Remove</button>
        </div></div>
      </div>

      <div class="col-12">
        <label class="form-label d-flex justify-content-between align-items-center">
          <span>Related Achievements</span>
          <span class="d-flex gap-2">
            <select class="form-select" style="width:auto" [(ngModel)]="selectedAchievementId" name="selectedAchievementId">
              <option [ngValue]="''">-- Select Achievement --</option>
              <option *ngFor="let a of achievements" [ngValue]="a._id">{{a.title}}</option>
            </select>
            <button type="button" class="btn btn-sm btn-outline-primary" (click)="addRelatedAchievement()">Add</button>
          </span>
        </label>
        <div class="vstack gap-2">
          <div class="input-group" *ngFor="let id of (model.relatedAchievements || []); let i = index">
            <input class="form-control" [value]="displayAchievementTitle(id)" readonly />
            <button type="button" class="btn btn-outline-danger" (click)="splice(model.relatedAchievements,i)">Remove</button>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Created By</label>
        <select class="form-select" [(ngModel)]="model.createdBy" name="createdBy">
          <option [ngValue]="''">-- None --</option>
          <option *ngFor="let u of users" [ngValue]="u._id">{{u.displayName || u.username || u.email}}</option>
        </select>
      </div>
      <div class="col-md-6">
        <label class="form-label">Approved By</label>
        <select class="form-select" [(ngModel)]="model.approvedBy" name="approvedBy">
          <option [ngValue]="''">-- None --</option>
          <option *ngFor="let u of users" [ngValue]="u._id">{{u.displayName || u.username || u.email}}</option>
        </select>
      </div>
      <div class="col-md-6"><label class="form-label">Verified At</label><input type="datetime-local" class="form-control" [(ngModel)]="model.verifiedAt" name="verifiedAt" /></div>
      <div class="col-md-6"><label class="form-label">Last Accessed At</label><input type="datetime-local" class="form-control" [(ngModel)]="model.lastAccessedAt" name="lastAccessedAt" /></div>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Meta</legend>
        <div class="row g-3">
          <div class="col-md-4"><label class="form-label">Device</label><input class="form-control" [(ngModel)]="model.meta.device" name="meta_device" /></div>
          <div class="col-md-4"><label class="form-label">IP Address</label><input class="form-control" [(ngModel)]="model.meta.ipAddress" name="meta_ip" /></div>
          <div class="col-md-4"><label class="form-label">User Agent</label><input class="form-control" [(ngModel)]="model.meta.userAgent" name="meta_ua" /></div>
        </div>
      </fieldset>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">SEO</legend>
        <div class="row g-3">
          <div class="col-md-4"><label class="form-label">Meta Title</label><input class="form-control" [(ngModel)]="model.seo.metaTitle" name="seo_metaTitle" /></div>
          <div class="col-md-4"><label class="form-label">Meta Description</label><input class="form-control" [(ngModel)]="model.seo.metaDescription" name="seo_metaDescription" /></div>
          <div class="col-md-4"><label class="form-label">Keywords</label><input class="form-control" [(ngModel)]="model.seo.keywords" name="seo_keywords" /></div>
        </div>
      </fieldset>

      <div class="col-12 d-flex gap-2 mt-2">
        <button class="btn btn-primary" [disabled]="saving || f.invalid">Save</button>
        <button class="btn btn-secondary" type="button" (click)="back()">Cancel</button>
      </div>
      <div class="text-danger" *ngIf="error">{{error}}</div>
    </form>
  </div>
  `
})
export class AwardFormComponent implements OnInit {
  model: Award | any = {
    userId: '',
    title: '',
    organization: '',
    category: '',
    subcategory: '',
    dateReceived: '',
    awardLevel: '',
    description: '',
    imageURL: '',
    certificateURL: '',
    awardLogo: '',
    issuedBy: '',
    judgeName: '',
    criteria: '',
    nominationDetails: '',
    awardType: '',
    location: '',
    tags: [],
    relevanceScore: null,
    projectRef: '',
    isFeatured: false,
    visibility: '',
    positionRank: '',
    grade: '',
    points: null,
    recognitionURL: '',
    relatedMedia: [],
    notes: '',
    internalCode: '',
    reviewerComment: '',
    shareableLink: '',
    likesCount: null,
    viewsCount: null,
    downloadsCount: null,
    sharesCount: null,
    comments: [],
    commentsCount: null,
    feedbackRating: null,
    feedbackMessages: [],
    relatedAchievements: [],
    createdBy: '',
    approvedBy: '',
    verifiedAt: '',
    lastAccessedAt: '',
    meta: { device: '', ipAddress: '', userAgent: '' },
    seo: { metaTitle: '', metaDescription: '', keywords: '' }
  };
  id: string | null = null;
  saving = false; error = '';
  projects: Project[] = [];
  users: UserProfile[] = [];
  achievements: any[] = [];
  selectedAchievementId: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private svc: AwardsService, private projectsSvc: ProjectsService, private usersSvc: UsersService, private crud: CrudService) {}
  ngOnInit() {
    // Auto-fill userId from JWT if available
    try {
      const token = localStorage.getItem('jwt') || '';
      const payload = token.split('.')[1] ? JSON.parse(atob(token.split('.')[1])) : null;
      const sub = payload?.sub as string | undefined;
      if (sub && /^[a-fA-F0-9]{24}$/.test(sub)) this.model.userId = sub;
    } catch {}
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectsSvc.list().subscribe((list)=> this.projects = list);
    this.usersSvc.list().subscribe((list)=> this.users = list);
    this.crud.list('achievements').subscribe((list)=> this.achievements = list);
    if (this.id) this.svc.get(this.id).subscribe((d)=> this.model = d);
  }
  save() {
    this.saving = true;
    const obs = this.id ? this.svc.update(this.id!, this.model) : this.svc.create(this.model);
    obs.subscribe({ next: ()=> this.router.navigate(['/awards']), error: (e)=> { this.error = e?.error?.message || 'Save failed'; this.saving = false; } });
  }
  back() { this.router.navigate(['/awards']); }
  push(arr: any[] | undefined, v: any = '') { if (!Array.isArray(arr)) { (this.model as any)[this.findKeyByRef(arr)] = []; arr = (this.model as any)[this.findKeyByRef(arr)]; } arr!.push(v); }
  splice(arr: any[] | undefined, i: number) { if (!Array.isArray(arr)) return; arr.splice(i,1); }
  private findKeyByRef(arr: any): string { for (const k of Object.keys(this.model)) if ((this.model as any)[k] === arr) return k; return ''; }
  addRelatedAchievement() { if (this.selectedAchievementId && /^[a-fA-F0-9]{24}$/.test(this.selectedAchievementId)) { if (!Array.isArray(this.model.relatedAchievements)) this.model.relatedAchievements = []; if (!this.model.relatedAchievements.includes(this.selectedAchievementId)) this.model.relatedAchievements.push(this.selectedAchievementId); this.selectedAchievementId = ''; } }
  displayAchievementTitle(id: string) { const a = this.achievements.find(x => x._id === id); return a ? a.title : id; }
}

