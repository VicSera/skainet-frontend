import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { AuthenticationService } from '../service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = '';
  password : string = '';
  errorMessage : string = 'Invalid Credentials';
  invalidLogin : boolean = false;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService
   ) { }

  ngOnInit() {
  }

  handleLogin() : void {
    this.authenticationService.authenticate(this.username, this.password).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    )
    // console.log(this.username);
  }

  handleResponse(response) {
    this.invalidLogin = false;
    sessionStorage.setItem('authenticatedUser', this.username);

    this.router.navigate(['welcome', this.username]);
  }

  handleError(error) {
    this.invalidLogin = true;
    this.password = '';
  }

  register() {
    this.router.navigate(['register']);
  }

}
