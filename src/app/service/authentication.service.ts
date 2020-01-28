import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http : HttpClient
  ) { }

  authenticate(username : string, password : string) {
    let request = this.http.post<User>('http://localhost:8080/authenticate', {
      username: username,
      password: password
    })

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
    let username = sessionStorage.getItem('authenticatedUser');

    return this.http.get<User>(`http://localhost:8080/users/byusername/${username}`)
  }
}
