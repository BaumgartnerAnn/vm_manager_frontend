import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  constructor(private http: HttpClient,
    private authService: AuthService) { }

  public baseURL = environment.apiBaseUrl; 

  postRequest(url: string, body: any = {}): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post(`${this.baseURL}/${url}`, body, { headers });
  }
  getRequest(url: string, params?: HttpParams): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get(`${this.baseURL}/${url}`, { headers, params });
  }
  patchRequest(url: string, body: any = {}): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.patch(`${this.baseURL}/${url}`, body, { headers });
  }
}