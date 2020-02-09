import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Trip } from '../list-trips/list-trips.component';
import { TripDataService } from '../service/data/trip-data.service';
import { User, UserDataService } from '../service/data/user-data.service';
import { AuthenticationService } from '../service/authentication.service';
import { TimeHelper } from '../helpers/time-helper';
import { ParticipationService } from '../service/participation.service';
import { RequestStatus } from '../enums/request-status.enum';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  private id : number;
  private isNew : boolean;
  private enableEdit : boolean = false;

  private toSkai: boolean = true;

  private trip : Trip;

  private inputDate = { year: 2020, month: 1, day: 1 };
  private inputTime = { hour: 12, minute: 0};

  private dateString;
  private timeString;

  private currentUser : User;
  private driverUser : User;

  private buttonText = 'Join';
  private requestStatus = RequestStatus.NONE;
  private buttonClass = 'btn join'

  constructor(
    private tripService : TripDataService,
    private userService : UserDataService,
    private participationService: ParticipationService,
    private authenticationService : AuthenticationService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['tripId'];
    this.currentUser = new User();
    this.driverUser = new User();
    this.trip = new Trip()
    this.authenticationService.getLoggedInUser().subscribe(
      user => {
        this.currentUser = user;

        if (this.id != 0) {
          // Trip already exists and needs to be loaded
          this.isNew = false;
          this.loadTrip(this.id);
        }
        else {
          // Otherwise create a new trip
          this.newTrip();
        }
      }
    )

    this.chooseSkai();
  }

  saveChangesToTrip() {
    this.trip.dateTime = new Date(TimeHelper.dateTimeToString(this.inputDate, this.inputTime));

    if (this.isNew) {
      this.tripService.createTrip(this.trip).subscribe()
    }
    else {
      this.tripService.updateTrip(this.trip).subscribe()
    }

    this.router.navigate(['/trips']);
  }

  discardChanges() {
    this.router.navigate(['/trips']);
  }

  newTrip() {
      this.driverUser = this.currentUser;
      this.trip.driver = this.currentUser;
      
      let dateTime = TimeHelper.stringToDateTime(this.trip.dateTime.toString());
      this.inputDate = dateTime.date;
      this.inputTime = dateTime.time;

      this.trip.startingLocation = this.driverUser.home;
      this.trip.maxPassengers = this.driverUser.carSeats;
      
      this.isNew = true;
      this.enableEdit = true;
  }

  loadTrip(id : number) {
    this.tripService.retrieveTrip(id).subscribe(
      trip => {
        this.trip = trip;
        this.driverUser = this.trip.driver;

        let dateTime = TimeHelper.stringToDateTime(this.trip.dateTime.toString());
        this.inputDate = dateTime.date;
        this.inputTime = dateTime.time;

        this.trip.startingLocation = this.driverUser.home;

        if (this.driverUser.id == this.currentUser.id) {
          this.enableEdit = true;
        }
        else {
          this.dateString = TimeHelper.dateToString(dateTime.date);
          this.timeString = TimeHelper.timeToString(dateTime.time);
          this.updateJoinButton();
        }
      },
      error => console.log(error)
    );
  }

  updateJoinButton() {
    this.participationService.getStatus(this.currentUser, this.trip).subscribe(
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

  chooseSkai() {
    this.toSkai = true;
    this.trip.destination = "Skai";
  }

  chooseMountain() {
    this.toSkai = false;
    this.trip.destination = "";
  }

  deleteTrip() {
    console.log(`Deleting trip ${this.id}`);

    this.tripService.deleteTrip(this.id).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
    // this.discardChanges()
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

    this.participationService.requestJoin(this.currentUser, this.trip).subscribe(
      response => {
        console.log(response);
        this.updateJoinButton();
      }
    )
  }

  cancelRequest() {
    console.log('Canceling join request');

    this.participationService.cancelRequest(this.currentUser, this.trip).subscribe(
      response => {
        console.log(response);
        this.updateJoinButton();
      }
    )
  }
}
