import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

export interface BlogTag { _id?: string; name: string; slug: string; }

@Injectable({ providedIn: 'root' })
export class TagsService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<BlogTag[]>(`${environment.apiBaseUrl}/admin/blog-tags`); }
  get(id: string) { return this.http.get<BlogTag>(`${environment.apiBaseUrl}/admin/blog-tags/${id}`); }
  create(payload: Partial<BlogTag>) { return this.http.post<BlogTag>(`${environment.apiBaseUrl}/admin/blog-tags`, payload); }
  update(id: string, payload: Partial<BlogTag>) { return this.http.put<BlogTag>(`${environment.apiBaseUrl}/admin/blog-tags/${id}`, payload); }
  remove(id: string) { return this.http.delete(`${environment.apiBaseUrl}/admin/blog-tags/${id}`); }
}

