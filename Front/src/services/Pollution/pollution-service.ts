import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { PollutionData } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class PollutionService {
  private http = inject(HttpClient);

  createPollution(pollutionData: Omit<PollutionData, 'id'>): Observable<PollutionData> {
    return this.http.post<PollutionData>(`${environment.apiUrl}/pollution/add`, pollutionData);
  }

  listPollutions(): Observable<PollutionData[]> {
    return this.http.get<PollutionData[]>(`${environment.apiUrl}/pollution/all`);
  }

  readPollution(id: number): Observable<PollutionData> {
    return this.http.get<PollutionData>(`${environment.apiUrl}/pollution/${id}`);
  }

  updatePollution(id: number, pollutionData: PollutionData): Observable<PollutionData> {
    return this.http.patch<PollutionData>(`${environment.apiUrl}/pollution/update/${id}`, pollutionData);
  }

  deletePollution(id: number): Observable<PollutionData> {
    return this.http.delete<PollutionData>(`${environment.apiUrl}/pollution/delete/${id}`);
  }

}
