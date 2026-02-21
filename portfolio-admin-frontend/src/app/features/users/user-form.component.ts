import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, UserProfile } from './users.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container-fluid" *ngIf="model">
    <h3 class="mb-3">{{model._id ? 'Edit' : 'Create'}} User</h3>
    <form (ngSubmit)="save()" #f="ngForm" class="row g-3">
      <div class="col-md-4"><label class="form-label">Username</label><input class="form-control" [(ngModel)]="model.username" name="username" required /></div>
      <div class="col-md-4"><label class="form-label">Email</label><input class="form-control" [(ngModel)]="model.email" name="email" required /></div>
      <div class="col-md-4"><label class="form-label">Password</label><input type="password" class="form-control" [(ngModel)]="plainPassword" name="password" [required]="!model._id" /></div>

      <div class="col-md-3"><label class="form-label">First Name</label><input class="form-control" [(ngModel)]="model.firstName" name="firstName" /></div>
      <div class="col-md-3"><label class="form-label">Last Name</label><input class="form-control" [(ngModel)]="model.lastName" name="lastName" /></div>
      <div class="col-md-3"><label class="form-label">Display Name</label><input class="form-control" [(ngModel)]="model.displayName" name="displayName" /></div>
      <div class="col-md-3"><label class="form-label">Preferred Name</label><input class="form-control" [(ngModel)]="model.preferredName" name="preferredName" /></div>

      <div class="col-md-6"><label class="form-label">Profile Image URL</label><input class="form-control" [(ngModel)]="model.profileImage" name="profileImage" /></div>
      <div class="col-md-6"><label class="form-label">Cover Image URL</label><input class="form-control" [(ngModel)]="model.coverImage" name="coverImage" /></div>

      <div class="col-12"><label class="form-label">Tagline</label><input class="form-control" [(ngModel)]="model.tagline" name="tagline" /></div>
      <div class="col-12"><label class="form-label">Bio Short</label><textarea class="form-control" rows="2" [(ngModel)]="model.bioShort" name="bioShort"></textarea></div>
      <div class="col-12"><label class="form-label">Bio Long</label><textarea class="form-control" rows="4" [(ngModel)]="model.bioLong" name="bioLong"></textarea></div>

      <div class="col-md-3"><label class="form-label">Birth Date</label><input type="date" class="form-control" [(ngModel)]="model.birthDate" name="birthDate" /></div>
      <div class="col-md-3"><label class="form-label">Gender</label><input class="form-control" [(ngModel)]="model.gender" name="gender" /></div>
      <div class="col-md-3"><label class="form-label">Timezone</label><input class="form-control" [(ngModel)]="model.timezone" name="timezone" /></div>
      <div class="col-md-3"><label class="form-label">Phone</label><input class="form-control" [(ngModel)]="model.phone" name="phone" /></div>

      <div class="col-12"><label class="form-label d-flex justify-content-between align-items-center">Alternate Phones<button type="button" class="btn btn-sm btn-outline-primary" (click)="push(model.alternatePhones)">Add</button></label>
        <div class="vstack gap-2"><div class="input-group" *ngFor="let v of (model.alternatePhones || []); let i = index"><input class="form-control" [(ngModel)]="model.alternatePhones[i]" name="altPhone_{{i}}" /><button type="button" class="btn btn-outline-danger" (click)="splice(model.alternatePhones,i)">Remove</button></div></div>
      </div>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Location</legend>
        <div class="row g-3">
          <div class="col-md-3"><label class="form-label">City</label><input class="form-control" [(ngModel)]="model.location.city" name="loc_city" /></div>
          <div class="col-md-3"><label class="form-label">State</label><input class="form-control" [(ngModel)]="model.location.state" name="loc_state" /></div>
          <div class="col-md-3"><label class="form-label">Country</label><input class="form-control" [(ngModel)]="model.location.country" name="loc_country" /></div>
          <div class="col-md-3"><label class="form-label">Postal Code</label><input class="form-control" [(ngModel)]="model.location.postalCode" name="loc_postalCode" /></div>
          <div class="col-md-3"><label class="form-label">Latitude</label><input type="number" class="form-control" [(ngModel)]="model.location.coords.lat" name="loc_lat" /></div>
          <div class="col-md-3"><label class="form-label">Longitude</label><input type="number" class="form-control" [(ngModel)]="model.location.coords.lng" name="loc_lng" /></div>
        </div>
      </fieldset>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Websites</legend>
        <div class="vstack gap-2">
          <div class="row g-2 align-items-end" *ngFor="let w of (model.websites || []); let i = index">
            <div class="col-md-4"><label class="form-label">Label</label><input class="form-control" [(ngModel)]="model.websites[i].label" name="web_label_{{i}}" /></div>
            <div class="col-md-6"><label class="form-label">URL</label><input class="form-control" [(ngModel)]="model.websites[i].url" name="web_url_{{i}}" /></div>
            <div class="col-md-2"><div class="form-check"><input type="checkbox" class="form-check-input" [(ngModel)]="model.websites[i].isPrimary" name="web_primary_{{i}}" id="web_primary_{{i}}" /><label class="form-check-label" for="web_primary_{{i}}">Primary</label></div></div>
            <div class="col-12"><button type="button" class="btn btn-sm btn-outline-danger" (click)="splice(model.websites,i)">Remove</button></div>
          </div>
          <button type="button" class="btn btn-sm btn-outline-primary w-auto" (click)="push(model.websites, { label: '', url: '', isPrimary: false })">Add Website</button>
        </div>
      </fieldset>

      <div class="col-md-3"><div class="form-check"><input type="checkbox" class="form-check-input" [(ngModel)]="model.emailVerified" name="emailVerified" id="emailVerified" /><label class="form-check-label" for="emailVerified">Email Verified</label></div></div>
      <div class="col-md-3"><div class="form-check"><input type="checkbox" class="form-check-input" [(ngModel)]="model.phoneVerified" name="phoneVerified" id="phoneVerified" /><label class="form-check-label" for="phoneVerified">Phone Verified</label></div></div>
      <div class="col-md-3"><div class="form-check"><input type="checkbox" class="form-check-input" [(ngModel)]="model.profilePublic" name="profilePublic" id="profilePublic" /><label class="form-check-label" for="profilePublic">Profile Public</label></div></div>
      <div class="col-md-3"><div class="form-check"><input type="checkbox" class="form-check-input" [(ngModel)]="model.availableForHire" name="availableForHire" id="availableForHire" /><label class="form-check-label" for="availableForHire">Available For Hire</label></div></div>

      <div class="col-md-4"><label class="form-label">Availability Notes</label><input class="form-control" [(ngModel)]="model.availabilityNotes" name="availabilityNotes" /></div>
      <div class="col-md-2"><label class="form-label">Rate Value</label><input type="number" class="form-control" [(ngModel)]="model.freelanceRate.value" name="rate_value" /></div>
      <div class="col-md-3"><label class="form-label">Rate Currency</label><input class="form-control" [(ngModel)]="model.freelanceRate.currency" name="rate_currency" /></div>
      <div class="col-md-3"><label class="form-label">Rate Unit</label><input class="form-control" [(ngModel)]="model.freelanceRate.unit" name="rate_unit" /></div>

      <div class="col-12"><label class="form-label d-flex justify-content-between align-items-center">Languages<button type="button" class="btn btn-sm btn-outline-primary" (click)="push(model.languages, { name: '', proficiency: '', proficiencyScore: 0 })">Add</button></label>
        <div class="row g-2 align-items-end" *ngFor="let l of (model.languages || []); let i = index">
          <div class="col-md-4"><input class="form-control" placeholder="Name" [(ngModel)]="model.languages[i].name" name="lang_name_{{i}}" /></div>
          <div class="col-md-4"><input class="form-control" placeholder="Proficiency" [(ngModel)]="model.languages[i].proficiency" name="lang_prof_{{i}}" /></div>
          <div class="col-md-2"><input type="number" class="form-control" placeholder="Score" [(ngModel)]="model.languages[i].proficiencyScore" name="lang_score_{{i}}" /></div>
          <div class="col-md-2"><button type="button" class="btn btn-outline-danger" (click)="splice(model.languages,i)">Remove</button></div>
        </div>
      </div>

      <div class="col-12"><label class="form-label">Interests (comma-separated)</label><input class="form-control" [(ngModel)]="interestsInput" name="interests" /></div>
      <div class="col-12"><label class="form-label">Hobbies (comma-separated)</label><input class="form-control" [(ngModel)]="hobbiesInput" name="hobbies" /></div>

      <div class="col-12"><label class="form-label">Education Summary</label><textarea class="form-control" rows="2" [(ngModel)]="model.educationSummary" name="educationSummary"></textarea></div>
      <div class="col-12"><label class="form-label">Experience Summary</label><textarea class="form-control" rows="2" [(ngModel)]="model.experienceSummary" name="experienceSummary"></textarea></div>
      <div class="col-12"><label class="form-label">Skill Summary</label><textarea class="form-control" rows="2" [(ngModel)]="model.skillSummary" name="skillSummary"></textarea></div>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Social Links</legend>
        <div class="vstack gap-2">
          <div class="row g-2" *ngFor="let s of (model.socialLinks || []); let i = index">
            <div class="col-md-3"><input class="form-control" placeholder="Platform" [(ngModel)]="model.socialLinks[i].platform" name="soc_platform_{{i}}" /></div>
            <div class="col-md-3"><input class="form-control" placeholder="Username" [(ngModel)]="model.socialLinks[i].username" name="soc_username_{{i}}" /></div>
            <div class="col-md-4"><input class="form-control" placeholder="URL" [(ngModel)]="model.socialLinks[i].url" name="soc_url_{{i}}" /></div>
            <div class="col-md-2"><input type="number" class="form-control" placeholder="Order" [(ngModel)]="model.socialLinks[i].order" name="soc_order_{{i}}" /></div>
            <div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.socialLinks[i].visible" name="soc_visible_{{i}}" id="soc_visible_{{i}}" /><label class="form-check-label" for="soc_visible_{{i}}">Visible</label></div></div>
            <div class="col-12"><button type="button" class="btn btn-sm btn-outline-danger" (click)="splice(model.socialLinks,i)">Remove</button></div>
          </div>
          <button type="button" class="btn btn-sm btn-outline-primary w-auto" (click)="push(model.socialLinks, { platform: '', username: '', url: '', order: 0, visible: true })">Add Social Link</button>
        </div>
      </fieldset>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Preferences</legend>
        <div class="row g-3">
          <div class="col-md-3"><label class="form-label">Theme</label><input class="form-control" [(ngModel)]="model.preferences.theme" name="pref_theme" /></div>
          <div class="col-md-3"><label class="form-label">Date Format</label><input class="form-control" [(ngModel)]="model.preferences.dateFormat" name="pref_dateFormat" /></div>
          <div class="col-md-3"><label class="form-label">Locale</label><input class="form-control" [(ngModel)]="model.preferences.locale" name="pref_locale" /></div>
          <div class="col-md-3"><label class="form-label">Units</label><input class="form-control" [(ngModel)]="model.preferences.units" name="pref_units" /></div>
        </div>
      </fieldset>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Privacy</legend>
        <div class="row g-3">
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.privacy.showEmail" name="priv_showEmail" id="priv_showEmail" /><label class="form-check-label" for="priv_showEmail">Show Email</label></div></div>
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.privacy.showPhone" name="priv_showPhone" id="priv_showPhone" /><label class="form-check-label" for="priv_showPhone">Show Phone</label></div></div>
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.privacy.showLocation" name="priv_showLocation" id="priv_showLocation" /><label class="form-check-label" for="priv_showLocation">Show Location</label></div></div>
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.privacy.dataSharingOptIn" name="priv_dataSharing" id="priv_dataSharing" /><label class="form-check-label" for="priv_dataSharing">Data Sharing Opt-in</label></div></div>
        </div>
      </fieldset>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Notifications</legend>
        <div class="row g-3">
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.notifications.email.marketing" name="notif_email_marketing" id="notif_email_marketing" /><label class="form-check-label" for="notif_email_marketing">Email Marketing</label></div></div>
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.notifications.email.product" name="notif_email_product" id="notif_email_product" /><label class="form-check-label" for="notif_email_product">Email Product</label></div></div>
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.notifications.email.security" name="notif_email_security" id="notif_email_security" /><label class="form-check-label" for="notif_email_security">Email Security</label></div></div>
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.notifications.sms.alerts" name="notif_sms_alerts" id="notif_sms_alerts" /><label class="form-check-label" for="notif_sms_alerts">SMS Alerts</label></div></div>
          <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" [(ngModel)]="model.notifications.push.enabled" name="notif_push_enabled" id="notif_push_enabled" /><label class="form-check-label" for="notif_push_enabled">Push Enabled</label></div></div>
        </div>
      </fieldset>

      <div class="col-md-4"><label class="form-label">Profile Complete (%)</label><input type="number" class="form-control" [(ngModel)]="model.profileCompletePercent" name="profileCompletePercent" /></div>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Roles History</legend>
        <div class="vstack gap-2">
          <div class="row g-2" *ngFor="let r of (model.rolesHistory || []); let i = index">
            <div class="col-md-4"><input class="form-control" placeholder="Role" [(ngModel)]="model.rolesHistory[i].role" name="role_role_{{i}}" /></div>
            <div class="col-md-4"><input class="form-control" placeholder="Granted By (Id)" [(ngModel)]="model.rolesHistory[i].grantedBy" name="role_grantedBy_{{i}}" /></div>
            <div class="col-md-4"><input type="date" class="form-control" [(ngModel)]="model.rolesHistory[i].grantedAt" name="role_grantedAt_{{i}}" /></div>
            <div class="col-12"><button type="button" class="btn btn-sm btn-outline-danger" (click)="splice(model.rolesHistory,i)">Remove</button></div>
          </div>
          <button type="button" class="btn btn-sm btn-outline-primary w-auto" (click)="push(model.rolesHistory, { role: '', grantedBy: '', grantedAt: '' })">Add Role</button>
        </div>
      </fieldset>

      <fieldset class="col-12 border rounded p-3">
        <legend class="float-none w-auto px-2">Notes</legend>
        <div class="vstack gap-2">
          <div class="row g-2" *ngFor="let n of (model.notes || []); let i = index">
            <div class="col-md-10"><input class="form-control" placeholder="Text" [(ngModel)]="model.notes[i].text" name="note_text_{{i}}" /></div>
            <div class="col-md-2"><input type="date" class="form-control" [(ngModel)]="model.notes[i].createdAt" name="note_created_{{i}}" /></div>
            <div class="col-12"><button type="button" class="btn btn-sm btn-outline-danger" (click)="splice(model.notes,i)">Remove</button></div>
          </div>
          <button type="button" class="btn btn-sm btn-outline-primary w-auto" (click)="push(model.notes, { text: '', createdAt: '' })">Add Note</button>
        </div>
      </fieldset>

      <div class="col-12 d-flex gap-2 mt-2">
        <button class="btn btn-primary" [disabled]="saving">Save</button>
        <button class="btn btn-secondary" type="button" (click)="back()">Cancel</button>
      </div>
      <div class="text-danger" *ngIf="error">{{error}}</div>
    </form>
  </div>
  `
})
export class UserFormComponent implements OnInit {
  model: UserProfile | any = {
    username: '',
    email: '',
    roles: [],
    alternatePhones: [],
    websites: [],
    languages: [],
    socialLinks: [],
    rolesHistory: [],
    notes: [],
    location: { city: '', state: '', country: '', postalCode: '', coords: { lat: null, lng: null } },
    preferences: { theme: '', dateFormat: '', locale: '', units: '' },
    privacy: { showEmail: false, showPhone: false, showLocation: false, dataSharingOptIn: false },
    notifications: { email: { marketing: false, product: true, security: true }, sms: { alerts: false }, push: { enabled: false } },
    freelanceRate: { value: null, currency: '', unit: '' }
  };
  rolesInput = '';
  interestsInput = '';
  hobbiesInput = '';
  plainPassword = '';
  id: string | null = null;
  saving = false; error = '';
  constructor(private route: ActivatedRoute, private router: Router, private svc: UsersService) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.svc.get(this.id).subscribe((d)=> { this.model = { ...this.model, ...d }; this.rolesInput = (d.roles || []).join(', '); this.interestsInput = (d as any).interests?.join(', ') || ''; this.hobbiesInput = (d as any).hobbies?.join(', ') || ''; });
    }
  }
  save() {
    this.saving = true;
    this.model.roles = this.rolesInput.split(',').map((s: string)=> s.trim()).filter(Boolean);
    this.model.interests = this.interestsInput.split(',').map((s: string)=> s.trim()).filter(Boolean);
    this.model.hobbies = this.hobbiesInput.split(',').map((s: string)=> s.trim()).filter(Boolean);
    if (this.plainPassword) (this.model as any).password = this.plainPassword;
    const obs = this.id ? this.svc.update(this.id!, this.model) : this.svc.create(this.model);
    obs.subscribe({ next: ()=> this.router.navigate(['/users']), error: (e)=> { this.error = e?.error?.message || 'Save failed'; this.saving = false; } });
  }
  back() { this.router.navigate(['/users']); }
  push(arr: any[] | undefined, v: any = '') { if (!Array.isArray(arr)) { (this.model as any)[this.findKeyByRef(arr)] = []; arr = (this.model as any)[this.findKeyByRef(arr)]; } arr!.push(v); }
  splice(arr: any[] | undefined, i: number) { if (!Array.isArray(arr)) return; arr.splice(i,1); }
  private findKeyByRef(arr: any): string { for (const k of Object.keys(this.model)) if ((this.model as any)[k] === arr) return k; return ''; }
}

