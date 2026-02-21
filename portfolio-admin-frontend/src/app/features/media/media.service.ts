import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';

export interface MediaAsset { _id?: string; fileName: string; fileURL: string; fileType?: string; }

@Injectable({ providedIn: 'root' })
export class MediaService {
  constructor(private http: HttpClient) {}
  list() { return this.http.get<MediaAsset[]>(`${environment.apiBaseUrl}/admin/media-assets`); }
  remove(id: string) { return this.http.delete(`${environment.apiBaseUrl}/admin/media-assets/${id}`); }
}

