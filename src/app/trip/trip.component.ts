import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Trip } from '../list-trips/list-trips.component';
import { TripDataService } from '../service/data/trip-data.service';
import { User, UserDataService } from '../service/data/user-data.service';
import { AuthenticationService } from '../service/authentication.service';
import { TimeHelper } from '../helpers/time-helper';

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

  private currentUser : User;
  private driverUser : User;

  constructor(
    private tripService : TripDataService,
    private userService : UserDataService,
    private authenticationService : AuthenticationService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['tripId'];
    this.currentUser = new User();
    this.driverUser = new User();
    this.trip = new Trip()
    if (this.id != 0) {
      // Trip already exists and needs to be loaded
      this.isNew = false;
      this.authenticationService.getLoggedInUser().subscribe(
        user => {
          this.currentUser = user;
          this.loadTrip(this.id);
        }
      )
    }
    else {
      this.authenticationService.getLoggedInUser().subscribe(
        response => {
          this.currentUser = response;
          this.driverUser = response;
          this.trip.driver = this.currentUser;
          
          let dateTime = TimeHelper.stringToDateTime(this.trip.dateTime.toString());
          this.inputDate = dateTime.date;
          this.inputTime = dateTime.time;

          this.trip.startingLocation = this.driverUser.home;
          this.trip.maxPassengers = this.driverUser.carSeats;
          
          this.isNew = true;
          this.enableEdit = true;
        }
      )
    }

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
      },
      error => console.log(error)
    );
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
}
