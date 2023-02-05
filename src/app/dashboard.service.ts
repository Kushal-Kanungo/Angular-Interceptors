import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  myfunc() {
    const name = () => {
      return 'Jushal';
    };
  }

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/books');
  }

  getBooksPage(page: number): Observable<any[]> {
    return this.http
      .get<any[]>(`http://localhost:3000/books/page/${page}`)
      .pipe(
        map((data: any) => {
          let tempData: any = data.map((book: { title: string }) => {
            return {
              title: book.title.substring(0, 4),
              description: book.title.substring(4),
            };
          });
          return tempData;
        })
      );
  }
}
