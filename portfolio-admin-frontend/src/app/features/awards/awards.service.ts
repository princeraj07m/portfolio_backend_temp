import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

export interface Award {
  _id?: string;
  userId?: string;
  title: string;
  organization?: string;
  dateReceived?: string;
  visibility?: string;
}

@Injectable({ providedIn: 'root' })
export class AwardsService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<Award[]>(`${environment.apiBaseUrl}/admin/awards`); }
  get(id: string) { return this.http.get<Award>(`${environment.apiBaseUrl}/admin/awards/${id}`); }
  create(payload: Partial<Award>) { return this.http.post<Award>(`${environment.apiBaseUrl}/admin/awards`, payload); }
  update(id: string, payload: Partial<Award>) { return this.http.put<Award>(`${environment.apiBaseUrl}/admin/awards/${id}`, payload); }
  remove(id: string) { return this.http.delete(`${environment.apiBaseUrl}/admin/awards/${id}`); }
}

