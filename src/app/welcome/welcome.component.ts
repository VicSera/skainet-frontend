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

  private user : User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params['name'])
    let pathUsername = this.route.snapshot.params['name'];
    let actualUsername = sessionStorage.getItem('authenticatedUser')

    this.user = this.authenticationService.getLoggedInUser()
    console.log(this.user.firstname)

    if (!pathUsername || pathUsername != actualUsername) {
      this.router.navigate(['welcome', actualUsername]);
    }
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessage = response.message;
  }

  handleErrorResponse(error) {
    this.welcomeMessage = error.error.message;
  }

}
