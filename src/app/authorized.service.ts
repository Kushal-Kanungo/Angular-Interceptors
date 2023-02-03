import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedService {
  constructor() {}

  isAuthenticated() {
    let token = localStorage.getItem('jwt_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
