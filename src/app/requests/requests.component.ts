import { Component, OnInit } from '@angular/core';
import { JoinRequest } from '../classes/request';
import { ParticipationService } from '../service/participation.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../service/data/user-data.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  private user = new User()

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.getLoggedInUser().subscribe(
      user => this.user = user
    )
  }
}
