import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Trip } from '../list-trips/list-trips.component';
import { TripDataService } from '../service/data/trip-data.service';
import { User, UserDataService } from '../service/data/user-data.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  private id : number;
  private isNew : boolean;
  private enableEdit : boolean = false;
  private trip : Trip;
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
    this.currentUser = new User(0, "Placeholder", "", "", "", "", "");
    this.driverUser = new User(0, "Placeholder", "", "", "", "", "");
    this.trip = new Trip(0, this.currentUser, new Date(), 3, "", "", true)
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
          this.isNew = true;
          this.enableEdit = true;
        }
      )
    }
  }

  saveChangesToTrip() {
    console.log('Saving...');

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
    console.log(`Requesting trip data for trip ${id}`);
    this.tripService.retrieveTrip(id).subscribe(
      trip => {
        this.trip = trip;
        console.log(trip);
        this.driverUser = this.trip.driver;

        if (this.driverUser.id == this.currentUser.id) {
          this.enableEdit = true;
          console.log('Same user');
        }
        // this.user = this.authenticationService.getLoggedInUser();
        // this.userService.getUser(this.trip.driverId).subscribe(
        //   user => {
        //     this.driverUser = user;

        //     if (this.driverUser.id == this.currentUser.id) {
        //       this.enableEdit = true;
        //       console.log('Same user');
        //     }
        //   }
        // );
      },
      error => console.log(error)
    );
  }
}
