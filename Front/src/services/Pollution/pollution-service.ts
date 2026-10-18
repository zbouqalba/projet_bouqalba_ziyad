import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollutionService {
  private http = inject(HttpClient);

  createPollution(pollutionData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/pollution/add`, pollutionData);
  }

  listPollutions(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/pollution/all`);
  }

  readPollution(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/pollution/${id}`);
  }

  updatePollution(id: string, pollutionData: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/pollution/update/${id}`, pollutionData);
  }

  deletePollution(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/pollution/delete/${id}`);
  }

}
