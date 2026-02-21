import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

export interface BlogCategory { _id?: string; name: string; slug: string; }

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<BlogCategory[]>(`${environment.apiBaseUrl}/admin/blog-categories`); }
  get(id: string) { return this.http.get<BlogCategory>(`${environment.apiBaseUrl}/admin/blog-categories/${id}`); }
  create(payload: Partial<BlogCategory>) { return this.http.post<BlogCategory>(`${environment.apiBaseUrl}/admin/blog-categories`, payload); }
  update(id: string, payload: Partial<BlogCategory>) { return this.http.put<BlogCategory>(`${environment.apiBaseUrl}/admin/blog-categories/${id}`, payload); }
  remove(id: string) { return this.http.delete(`${environment.apiBaseUrl}/admin/blog-categories/${id}`); }
}

