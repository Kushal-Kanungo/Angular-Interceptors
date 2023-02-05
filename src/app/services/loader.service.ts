import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  isLogInLoading = new Subject<boolean>();
  constructor() {}

  show(loaderName: string) {
    if (loaderName == 'login') {
      this.isLogInLoading.next(true);
    } else {
      this.isLoading.next(true);
    }
  }

  hide(loaderName: string) {
    if (loaderName == 'login') {
      this.isLogInLoading.next(false);
    } else {
      this.isLoading.next(false);
    }
  }
}
