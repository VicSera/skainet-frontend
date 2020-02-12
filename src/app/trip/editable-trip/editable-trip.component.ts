import { Component, OnInit, Input } from '@angular/core';
import { User, UserDataService } from 'src/app/service/data/user-data.service';
import { Trip } from 'src/app/list-trips/list-trips.component';
import { TripDataService } from 'src/app/service/data/trip-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeHelper } from 'src/app/helpers/time-helper';

@Component({
  selector: 'app-editable-trip',
  templateUrl: './editable-trip.component.html',
  styleUrls: ['./editable-trip.component.css']
})
export class EditableTripComponent implements OnInit {

  @Input() private trip : Trip;
  @Input() private user: User;

  private toSkai: boolean = true;

  private inputDate = { year: 2020, month: 1, day: 1 };
  private inputTime = { hour: 12, minute: 0};

  constructor(
    private tripService : TripDataService,
    private router : Router
  ) { }

  ngOnInit() {
    let dateTime = TimeHelper.stringToDateTime(this.trip.dateTime.toString());
    this.inputDate = dateTime.date;
    this.inputTime = dateTime.time;

    if (this.trip.id == 0)
      this.chooseSkai();
    else 
      this.refreshLocation();
  }

  private refreshLocation() {
    if (this.trip.destination == "Skai")
      this.toSkai = true;
    else 
      this.toSkai = false;
  }

  saveChangesToTrip() {
    this.trip.dateTime = new Date(TimeHelper.dateTimeToString(this.inputDate, this.inputTime));

    if (this.trip.id == 0) {
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

  chooseSkai() {
    this.toSkai = true;
    this.trip.destination = "Skai";
  }

  chooseMountain() {
    this.toSkai = false;
    this.trip.destination = "";
  }

  deleteTrip() {
    this.tripService.deleteTrip(this.trip.id).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
    // this.discardChanges()
  }
}
