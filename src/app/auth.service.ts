import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/users';

  login(data: any) {
    return this.http.post(`${this.url}/login`, { user: data });
  }
}
