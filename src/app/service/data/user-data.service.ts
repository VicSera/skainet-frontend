import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class User {
  constructor(
    public id : number,
    public firstName : String,
    public lastName : String,
    public username : String,
    password : String,
    public phoneNumber : String,
    public usualLocation : String
  ) {}
}

export class UserWithoutId {
  constructor(
    firstName : String,
    lastName : String,
    username : String,
    password : String,
    phoneNumber : String,
    usualLocation : String
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
    return this.http.get<User>(`http://localhost:8080/users/${id}`);
  }

  addUser(user : UserWithoutId) {
    return this.http.post<User>('http://localhost:8080/users', user);
  }
}
