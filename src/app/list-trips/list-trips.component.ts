import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { TripDataService } from '../service/data/trip-data.service';
import { Router } from '@angular/router';

export class Trip {
  constructor(
    public id : number,
    public driverId : number,
    public date: Date,
    public maxPassengers: number,
    public location: string,
    public comment: string,
    public go: boolean
  ) {}
}

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css']
})
export class ListTripsComponent implements OnInit {

  trips = []
  message : String = ''

  constructor(
    private tripService : TripDataService,
    private router : Router
  ) { }

  ngOnInit() {
    this.refreshTrips()
  }

  deleteTrip(tripId) {
    console.log(`delete trip ${tripId}`)
    this.tripService.deleteTrip(tripId).subscribe(
      response => {
        console.log(response);
        this.message = 'Deleted!';
        this.refreshTrips();
      }
    )
  }

  viewTrip(tripId) {
    console.log(`update trip ${tripId}`);
    this.router.navigate(['trips', tripId]);
  }

  refreshTrips() {
    this.tripService.retrieveAllTrips('placeholder').subscribe(
      response => {
        console.log(response);
        this.trips = response;
      }
    );
  }

  addTrip() {
    this.router.navigate(['trips', 0]);
  }

}
