import { Component, OnInit } from '@angular/core';
import { User, UserDataService } from '../service/data/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user : User;

  constructor(
    private router : Router,
    private userService : UserDataService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  registerUser() {
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      response => {
        console.log(response)
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error)
      }
    );
  }

}
