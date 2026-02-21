import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

export interface UserProfile { _id?: string; username: string; email: string; roles?: string[]; displayName?: string; }

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<UserProfile[]>(`${environment.apiBaseUrl}/admin/user-profiles`); }
  get(id: string) { return this.http.get<UserProfile>(`${environment.apiBaseUrl}/admin/user-profiles/${id}`); }
  create(payload: Partial<UserProfile>) { return this.http.post<UserProfile>(`${environment.apiBaseUrl}/admin/user-profiles`, payload); }
  update(id: string, payload: Partial<UserProfile>) { return this.http.put<UserProfile>(`${environment.apiBaseUrl}/admin/user-profiles/${id}`, payload); }
  remove(id: string) { return this.http.delete(`${environment.apiBaseUrl}/admin/user-profiles/${id}`); }
  getDefaultProfile() { return this.http.get<{ profileId: string | null }>(`${environment.apiBaseUrl}/admin/default-profile`); }
  setDefaultProfile(profileId: string) { return this.http.post<{ profileId: string }>(`${environment.apiBaseUrl}/admin/default-profile`, { profileId }); }
  clearDefaultProfile() { return this.http.delete<{ profileId: null }>(`${environment.apiBaseUrl}/admin/default-profile`); }
}

