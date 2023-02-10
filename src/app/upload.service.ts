import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFile(
    username: string,
    password: string,
    avatar: File
  ): Observable<any> {
    let imageData = new FormData();
    imageData.append('username', username);
    imageData.append('password', password);
    imageData.append('avatar', avatar);
    return this.http.post('http://localhost:3000/api/upload', imageData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
