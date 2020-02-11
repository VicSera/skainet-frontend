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

  // private requests: JoinRequest[]
  private requests: JoinRequest[] = []

  constructor(
    private authenticationService: AuthenticationService,
    private participationService: ParticipationService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.authenticationService.getLoggedInUser().subscribe(
      user => {
        this.getIncomingRequestsForUser(user);
      }
    )
  }

  getIncomingRequestsForUser(user: User) {
    this.participationService.getIncomingRequests(user.id).subscribe(
      requests => this.requests = requests
    )
  }

  acceptRequest(userId: number, tripId: number) {
    console.log('Accept');
    this.participationService.acceptRequest(userId, tripId).subscribe(
      response => this.refresh()
    );
  }

  declineRequest(userId: number, tripId: number) {
    console.log('Decline');
    this.participationService.declineRequest(userId, tripId).subscribe(
      response => this.refresh()
    );
  }

}
