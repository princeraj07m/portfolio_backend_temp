import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

@Injectable({ providedIn: 'root' })
export class CrudService {
  constructor(private http: HttpClient) {}
  list(basePath: string) { return this.http.get<any[]>(`${environment.apiBaseUrl}/admin/${basePath}`); }
  get(basePath: string, id: string) { return this.http.get<any>(`${environment.apiBaseUrl}/admin/${basePath}/${id}`); }
  create(basePath: string, payload: any) { return this.http.post<any>(`${environment.apiBaseUrl}/admin/${basePath}`, payload); }
  update(basePath: string, id: string, payload: any) { return this.http.put<any>(`${environment.apiBaseUrl}/admin/${basePath}/${id}`, payload); }
  remove(basePath: string, id: string) { return this.http.delete(`${environment.apiBaseUrl}/admin/${basePath}/${id}`); }
  schema(basePath: string) { return this.http.get<{ resource: string; fields: any[] }>(`${environment.apiBaseUrl}/admin/schemas/${basePath}`); }
}

