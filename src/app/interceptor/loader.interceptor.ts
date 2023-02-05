import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url == 'http://localhost:3000/users/login')
      this.loaderService.show('login');
    else this.loaderService.show('scroll');

    // document.body.classList.add('stop-scrolling');

    return next.handle(request).pipe(
      finalize(() => {
        if (request.url == 'http://localhost:3000/users/login')
          this.loaderService.hide('login');
        else this.loaderService.hide('scroll');
        // document.body.classList.remove('stop-scrolling');
      })
    );
  }
}
