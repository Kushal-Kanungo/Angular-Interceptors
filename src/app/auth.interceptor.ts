import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('jwt_token');
    if (token) {
      request = request.clone({
        setHeaders: { authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpHeaderResponse) => {
        if (error.status === 401) {
          alert('You are not authorized. PLease login again');
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );

    // console.log(reqCopy);

    // return next.handle(reqCopy);
  }
}
