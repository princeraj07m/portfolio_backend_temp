import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/admin/blog-posts`); }
}

