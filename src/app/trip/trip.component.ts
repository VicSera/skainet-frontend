import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  private enableEdit : boolean = false;
  private loaded = false;

  private trip : Trip = new Trip();
  private user: User = new User();

  constructor(
    private tripService : TripDataService,
    private authenticationService : AuthenticationService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['tripId'];

    this.authenticationService.getLoggedInUser().subscribe(
      user => {
        this.user = user;

        if (this.id != 0) {
          // Trip already exists and needs to be loaded
          this.loadTrip(this.id);
        }
        else {
          // Otherwise create a new trip
          this.newTrip();
        }
      }
    )
  }

  newTrip() {
      this.trip.driver = this.user;

      this.trip.startingLocation = this.trip.driver.home;
      this.trip.maxPassengers = this.trip.driver.carSeats;
      
      this.enableEdit = true;
      this.loaded = true;
  }

  loadTrip(id : number) {
    this.tripService.retrieveTrip(id).subscribe(
      trip => {
        this.trip = trip;

        if (this.trip.driver.id == this.user.id) {
          this.enableEdit = true;
        }

        this.loaded = true;
      },
      error => console.log(error)
    );
  }
}
