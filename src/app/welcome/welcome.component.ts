import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { UserDataService, User } from '../service/data/user-data.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public user : User;
  public name : String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    let pathUsername = this.route.snapshot.params['name'];
    let actualUsername = sessionStorage.getItem('authenticatedUser');
    this.name = "";

    this.authenticationService.getLoggedInUser().subscribe(
      user => {
        this.user = user;
        this.name = this.user.firstName;
      }
    )

    if (!pathUsername || pathUsername != actualUsername) {
      this.router.navigate(['welcome', actualUsername]);
    }
  }
}