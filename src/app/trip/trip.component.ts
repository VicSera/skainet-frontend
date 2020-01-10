import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Trip } from '../list-trips/list-trips.component';
import { TripDataService } from '../service/data/trip-data.service';
import { User, UserDataService } from '../service/data/user-data.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  private id : number;
  trip : Trip;
  user : User;

  constructor(
    private tripService : TripDataService,
    private userService : UserDataService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['tripId'];

    if (this.id == 0) {
      // create new trip instead of editing an existing one
      this.trip = new Trip(this.id, 0, new Date(), 3, "", "", true)
    }
    else {
      this.trip = new Trip(this.id, this.id, new Date(), 0, '', '', false);
      this.user = new User(this.id, "", "", "", "", "");
      this.loadTrip(this.id);
    }
  }

  saveChangesToTrip() {
    console.log('Saving...');

    if (this.id == 0) {
      this.tripService.createTrip(this.trip).subscribe(
        response => console.log(response)
      )
    }
    else {
      this.tripService.updateTrip(this.trip).subscribe(
        response => console.log(response)
      )
    }

    this.router.navigate(['/trips']);
  }

  discardChanges() {
    this.router.navigate(['/trips']);
  }

  loadTrip(id : number) {
    this.tripService.retrieveTrip(id).subscribe(
      response => {
        this.trip = response;
        console.log(`Requesting user data for user ${this.trip.driverId}`);
        this.userService.getUser(this.trip.driverId).subscribe(
          response => {
            console.log("Message received");
            this.user = response;
            console.log(this.user);
          }
        );
      }
    );
  }
}
