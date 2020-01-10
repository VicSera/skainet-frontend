import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticatedUser : User;

  constructor(
    private http : HttpClient
  ) { }

  authenticate(username : string, password : string) {
    let request = this.http.post<User>('http://localhost:8080/authenticate', {
      username: username,
      password: password
    })

    request.subscribe(
      response => {
        if (response)
          this.authenticatedUser = response;
      }
    )

    return request;
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  getLoggedInUser() {
    // let username = sessionStorage.getItem('authenticatedUser');

    // return username;
    return this.authenticatedUser;
  }
}
