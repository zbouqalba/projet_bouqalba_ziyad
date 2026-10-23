import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserData } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private http = inject(HttpClient);

  signUp(userData: UserData): Observable<UserData> {
    return this.http.post<UserData>(`${environment.apiUrl}/signup`, userData);
  }
}
