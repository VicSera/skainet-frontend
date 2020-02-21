import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class User {
  constructor(
    public id : number = 0,
    public firstName : string = "",
    public lastName : string = "",
    public username : string = "",
    public password : string = "",
    public phoneNumber : string = "",
    public home : string = "",
    public carSeats : number = 0
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http : HttpClient
  ) { }

  getUser(id) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  addUser(user : User) {
    delete user.id;

    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }
}
