import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/books');
  }

  getBooksPage(page: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/books/page/${page}`);
  }
}
