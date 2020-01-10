import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username : string, password : string) {
    if (username === 'victor' && password === '123') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser')
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }
}
