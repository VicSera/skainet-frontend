import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TripDataService } from '../service/data/trip-data.service';
import { Router } from '@angular/router';
import { User } from '../service/data/user-data.service';

export class Trip {
  constructor(
    public id : number,
    public driver : User,
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
    private router : Router,
    private changeDetector : ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('ngOnInitCalled');
    this.refreshTrips();
  }

  deleteTrip(tripId) {
    console.log(`delete trip ${tripId}`)
    this.tripService.deleteTrip(tripId).subscribe(
      response => {
        console.log(response);
        this.message = 'Deleted!';
        this.refreshTrips();
      },
      error => {
        console.log(error)
        this.refreshTrips();
      }
    )
  }

  viewTrip(tripId) {
    console.log(`update trip ${tripId}`);
    this.router.navigate(['trips', tripId]);
  }

  refreshTrips() {
    this.tripService.retrieveAllTrips().subscribe(
      response => {
        this.trips = response;
        this.changeDetector.detectChanges();
        console.log(this.trips);
      }
    );
  }

  addTrip() {
    this.router.navigate(['trips', 0]);
  }

}
