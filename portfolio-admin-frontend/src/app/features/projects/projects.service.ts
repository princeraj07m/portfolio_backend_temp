import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  isFeatured?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<Project[]>(`${environment.apiBaseUrl}/admin/projects`); }
  get(id: string) { return this.http.get<Project>(`${environment.apiBaseUrl}/admin/projects/${id}`); }
  create(payload: Partial<Project>) { return this.http.post<Project>(`${environment.apiBaseUrl}/admin/projects`, payload); }
  update(id: string, payload: Partial<Project>) { return this.http.put<Project>(`${environment.apiBaseUrl}/admin/projects/${id}`, payload); }
  remove(id: string) { return this.http.delete(`${environment.apiBaseUrl}/admin/projects/${id}`); }
}

