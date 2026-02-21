import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './crud.service';

type SelectOptions = { labelKey?: string; valueKey?: string; items?: any[]; apiBasePath?: string; multiple?: boolean };
type Field = { key: string; label: string; type?: 'text'|'textarea'|'number'|'checkbox'|'date'|'array:string'|'json'|'select'; required?: boolean; pattern?: string; placeholder?: string; options?: SelectOptions };

@Component({
  standalone: true,
  selector: 'app-crud-form',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container-fluid">
    <h3 class="mb-3">{{title}}</h3>
    <form (ngSubmit)="save()" #f="ngForm" class="row g-3">
      <ng-container *ngFor="let field of fields">
        <div class="col-md-6" *ngIf="field.type !== 'textarea' && field.type !== 'array:string' && field.type !== 'json' && field.type !== 'select'; else special">
          <label class="form-label">{{field.label}}</label>
          <input [type]="field.type || 'text'" class="form-control"
                 [(ngModel)]="model[field.key]" [name]="field.key" [required]="field.required || false"
                 [attr.pattern]="field.pattern || null" [attr.placeholder]="field.placeholder || null" />
        </div>
        <ng-template #special>
          <div class="col-12" *ngIf="field.type === 'textarea'">
            <label class="form-label">{{field.label}}</label>
            <textarea rows="6" class="form-control" [(ngModel)]="model[field.key]" [name]="field.key"></textarea>
          </div>
          <div class="col-md-6" *ngIf="field.type === 'select'">
            <label class="form-label">{{field.label}}</label>
            <select class="form-select" [(ngModel)]="model[field.key]" [name]="field.key" [required]="field.required || false" [multiple]="isMultiple(field)">
              <option [ngValue]="''">-- Select --</option>
              <option *ngFor="let opt of getOptions(field)" [ngValue]="opt[getValueKey(field)]">{{ opt[getLabelKey(field)] || opt[getValueKey(field)] }}</option>
            </select>
          </div>
          <div class="col-12" *ngIf="field.type === 'array:string'">
            <label class="form-label d-flex justify-content-between align-items-center">
              <span>{{field.label}}</span>
              <button type="button" class="btn btn-sm btn-outline-primary" (click)="ensureArray(field.key); model[field.key].push('')">Add</button>
            </label>
            <div class="vstack gap-2">
              <div class="input-group" *ngFor="let v of (isArray(model[field.key]) ? model[field.key] : []); let i = index">
                <input class="form-control" [(ngModel)]="model[field.key][i]" [name]="field.key + '_' + i" />
                <button type="button" class="btn btn-outline-danger" (click)="model[field.key].splice(i,1)">Remove</button>
              </div>
            </div>
          </div>
          <div class="col-12" *ngIf="field.type === 'json' && showAdvancedJson">
            <label class="form-label">{{field.label}}</label>
            <textarea rows="10" class="form-control" [ngModel]="(model[field.key] | json)" (ngModelChange)="onJsonChange(field.key, $event)" [name]="field.key + '_json'"></textarea>
            <div class="form-text">Enter valid JSON</div>
          </div>
        </ng-template>
      </ng-container>

      <div class="col-12 d-flex gap-2 mt-2">
        <button class="btn btn-primary" [disabled]="saving || f.invalid">Save</button>
        <button class="btn btn-secondary" type="button" (click)="back()">Cancel</button>
      </div>
      <div class="text-danger" *ngIf="error">{{error}}</div>
    </form>
  </div>
  `
})
export class CrudFormComponent implements OnInit {
  @Input() title = 'Edit Item';
  @Input() basePath = '';
  @Input() backUrl = '';
  @Input() fields: Field[] = [];
  @Input() showAdvancedJson = true;
  @Input() autoFields = true;

  id: string | null = null;
  model: any = {};
  saving = false; error = '';
  private fieldOptionsCache: Record<string, any[]> = {};

  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    const data = this.route.snapshot.data as any;
    this.title = this.title || data.title || this.title;
    this.basePath = this.basePath || data.basePath || this.basePath;
    this.backUrl = this.backUrl || data.backUrl || this.backUrl || ('/' + (data.basePath || ''));
    this.fields = this.fields?.length ? this.fields : (data.fields || []);
    this.autoFields = data.autoFields !== undefined ? data.autoFields : this.autoFields;

    // Load schema and merge to guarantee all model fields are present
    if (this.autoFields && this.basePath) {
      this.crud.schema(this.basePath).subscribe((schema) => {
        const existingKeys = new Set(this.fields.map((f) => f.key));
        const inferred: Field[] = (schema?.fields || [])
          .filter((f: any) => !existingKeys.has(f.key))
          .map((f: any) => ({ key: f.key, label: f.label, type: f.type as any, required: !!f.required }));
        // Keep given fields order, append any missing ones from schema
        this.fields = [...this.fields, ...inferred];
        // Prefetch options for any select fields declared after merge
        for (const f of this.fields) {
          if (f.type === 'select' && f.options?.apiBasePath) {
            this.crud.list(f.options.apiBasePath).subscribe((list)=> this.fieldOptionsCache[f.key] = list);
          } else if (f.type === 'select' && f.options?.items) {
            this.fieldOptionsCache[f.key] = f.options.items;
          }
        }
      });
    }
    // Prefetch options for select fields with apiBasePath
    for (const f of this.fields) {
      if (f.type === 'select' && f.options?.apiBasePath) {
        this.crud.list(f.options.apiBasePath).subscribe((list)=> this.fieldOptionsCache[f.key] = list);
      } else if (f.type === 'select' && f.options?.items) {
        this.fieldOptionsCache[f.key] = f.options.items;
      }
    }
    // Auto-fill userId for Achievements from JWT if available and valid
    if ((this.basePath === 'achievements') && !this.model?.userId) {
      try {
        const token = localStorage.getItem('jwt') || '';
        const payload = token.split('.')[1] ? JSON.parse(atob(token.split('.')[1])) : null;
        const sub = payload?.sub as string | undefined;
        if (sub && /^[a-fA-F0-9]{24}$/.test(sub)) {
          this.model.userId = sub;
        }
      } catch {}
    }
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.basePath) this.crud.get(this.basePath, this.id).subscribe((d)=> this.model = d);
  }
  save() {
    this.saving = true;
    const obs = this.id ? this.crud.update(this.basePath, this.id!, this.model) : this.crud.create(this.basePath, this.model);
    obs.subscribe({ next: ()=> this.router.navigate([this.backUrl]), error: (e)=> { this.error = e?.error?.message || 'Save failed'; this.saving = false; } });
  }
  back() { this.router.navigate([this.backUrl]); }

  // Helpers to work with nested paths
  getByPath(path: string) {
    return path.split('.').reduce((acc: any, k: string) => (acc ? acc[k] : undefined), this.model);
  }
  setByPath(path: string, value: any) {
    const parts = path.split('.');
    let ref = this.model;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (typeof ref[p] !== 'object' || ref[p] === null) ref[p] = {};
      ref = ref[p];
    }
    ref[parts[parts.length - 1]] = value;
  }

  onJsonChange(key: string, json: string) {
    try {
      const parsed = JSON.parse(json || 'null');
      this.model[key] = parsed;
    } catch (e) {
      // ignore until valid JSON
    }
  }

  // Template helpers to avoid TS resolving Array as component property
  isArray(v: any): v is any[] { return Array.isArray(v); }
  ensureArray(key: string) {
    if (!Array.isArray(this.model[key])) this.model[key] = [];
  }
  getOptions(field: Field) { return this.fieldOptionsCache[field.key] || []; }
  getLabelKey(field: Field) { return (field.options?.labelKey) || 'title'; }
  getValueKey(field: Field) { return (field.options?.valueKey) || '_id'; }
  isMultiple(field: Field) { return !!field.options?.multiple; }
}

