import { Component, OnInit, Input } from '@angular/core';
import { ParticipationService } from 'src/app/service/participation.service';

@Component({
  selector: 'app-request-panel',
  templateUrl: './request-panel.component.html',
  styleUrls: ['./request-panel.component.css']
})
export class RequestPanelComponent implements OnInit {

  @Input() tripId: number;

  private waitingUsers = [];
  private acceptedUsers = [];
  private declinedUsers = [];

  constructor(
    private participationService: ParticipationService
  ) { }

  ngOnInit() {
    this.refreshRequests()
  }

  refreshRequests() {
    this.participationService.getRequestsForTrip(this.tripId).subscribe(
      usersByStatus => {
        this.waitingUsers = usersByStatus['waiting'];
        this.acceptedUsers = usersByStatus['accepted'];
        this.declinedUsers = usersByStatus['declined'];

        console.log('Fetched requests');
      }
    )
  }

  accept(userId: number) {
    this.participationService.acceptRequest(userId, this.tripId).subscribe(
      () => this.refreshRequests()
    );
  }

  decline(userId: number) {
    this.participationService.declineRequest(userId, this.tripId).subscribe(
      () => this.refreshRequests()
    );
  }
}
