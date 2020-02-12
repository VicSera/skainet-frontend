import { Component, OnInit, Input } from '@angular/core';
import { RequestStatus } from 'src/app/enums/request-status.enum';
import { Trip } from 'src/app/list-trips/list-trips.component';
import { User, UserDataService } from 'src/app/service/data/user-data.service';
import { TripDataService } from 'src/app/service/data/trip-data.service';
import { ParticipationService } from 'src/app/service/participation.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeHelper } from 'src/app/helpers/time-helper';

@Component({
  selector: 'app-readonly-trip',
  templateUrl: './readonly-trip.component.html',
  styleUrls: ['./readonly-trip.component.css']
})
export class ReadonlyTripComponent implements OnInit {

  @Input() private trip : Trip;
  @Input() private user: User;

  private dateString;
  private timeString;

  private buttonText = 'Join';
  private requestStatus = RequestStatus.NONE;

  constructor(
    private participationService: ParticipationService,
    private authenticationService : AuthenticationService,
    private router : Router
  ) { }

  ngOnInit() {
    let dateTime = TimeHelper.stringToDateTime(this.trip.dateTime.toString());
    this.dateString = TimeHelper.dateToString(dateTime.date);
    this.timeString = TimeHelper.timeToString(dateTime.time);

    this.updateJoinButton();
  }

  updateJoinButton() {
    this.participationService.getStatus(this.user, this.trip).subscribe(
      status => {
        this.handleStatusResponse(status)
      },
      error => {
        this.requestStatus = RequestStatus.NONE;
        this.buttonText = 'Join';
      }
    )
  }

  handleStatusResponse(status) {
    // console.log(status);

    switch(status) {
      case 'WAITING': 
        this.requestStatus = RequestStatus.WAITING; 
        break;
      case 'ACCEPTED': 
        this.requestStatus = RequestStatus.ACCEPTED; 
        break;
      case 'DECLINED': 
        this.requestStatus = RequestStatus.DECLINED; 
        break;
    }

    console.log(this.requestStatus);

    this.buttonText = status;
  }

  handleJoinButtonPress() {
    if (this.requestStatus == RequestStatus.NONE) {
      this.requestToJoin();
    }
    else if (this.requestStatus == RequestStatus.WAITING || this.requestStatus == RequestStatus.ACCEPTED) {
      this.cancelRequest();
    }
  }

  requestToJoin() {
    console.log('Sending join request');

    this.participationService.requestJoin(this.user, this.trip).subscribe(
      response => {
        console.log(response);
        this.updateJoinButton();
      }
    )
  }

  cancelRequest() {
    console.log('Canceling join request');

    this.participationService.cancelRequest(this.user, this.trip).subscribe(
      response => {
        console.log(response);
        this.updateJoinButton();
      }
    )
  }

  back() {
    this.router.navigate(["/trips"]);
  }
}
