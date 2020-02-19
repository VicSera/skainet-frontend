import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/service/data/user-data.service';
import { ParticipationService } from 'src/app/service/participation.service';
import { JoinRequest } from 'src/app/classes/request';
import { Trip } from 'src/app/list-trips/list-trips.component';

@Component({
  selector: 'app-out-requests',
  templateUrl: './out-requests.component.html',
  styleUrls: ['./out-requests.component.css']
})
export class OutRequestsComponent implements OnInit {

  @Input() private user: User
  private requests: JoinRequest[]

  constructor(
    private participationService: ParticipationService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.participationService.getRequestsByUser(this.user.id).subscribe(
      requests => this.requests = requests
    )
  }

  cancelRequest(trip: Trip) {
    this.participationService.cancelRequest(this.user, trip).subscribe(
      response => this.refresh()
    )
  }

}
