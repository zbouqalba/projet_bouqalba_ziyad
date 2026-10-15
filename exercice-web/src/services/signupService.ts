import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private http = inject(HttpClient);

  signUp(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/signup`, userData);
  }
}
