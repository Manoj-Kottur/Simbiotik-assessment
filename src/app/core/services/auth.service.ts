import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private tokenKey = 'auth-token';

  private apiUrl = 'https://du-test-api.simbiotiktech.in/users/login';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(res => {
        if (res && res.accessToken) {
          localStorage.setItem(this.tokenKey, res.accessToken);
        }
      })
    );
  }

  // 🔹 Get token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
