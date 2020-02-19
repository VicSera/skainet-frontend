import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/service/data/user-data.service';
import { JoinRequest } from 'src/app/classes/request';
import { ParticipationService } from 'src/app/service/participation.service';

@Component({
  selector: 'app-in-requests',
  templateUrl: './in-requests.component.html',
  styleUrls: ['./in-requests.component.css']
})
export class InRequestsComponent implements OnInit {

  @Input() private user: User
  private requests: JoinRequest[]

  constructor(
    private participationService: ParticipationService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.participationService.getIncomingRequests(this.user.id).subscribe(
      requests => this.requests = requests
    )
  }

  acceptRequest(userId: number, tripId: number) {
    this.participationService.acceptRequest(userId, tripId).subscribe(
      response => this.refresh()
    );
  }

  declineRequest(userId: number, tripId: number) {
    this.participationService.declineRequest(userId, tripId).subscribe(
      response => this.refresh()
    );
  }
}
