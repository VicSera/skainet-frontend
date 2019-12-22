import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';

export class Trip {
  constructor(
    public tripId : number,
    public driverId : number,
    public date: Date,
    // public time: Time,
    public numPassengers: number,
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

  trips = [
    new Trip(1, 1, new Date(), 10, 'Gara', 'No Comment', true),
    new Trip(2, 2, new Date(), 6, 'Taietura', 'Asd Qwe', false),
    new Trip(3, 2, new Date(), 1, 'Gara', 'No Comment', false),
    new Trip(4, 3, new Date(), 4, 'Floresti', 'No Comment', true),
    new Trip(5, 1, new Date(), 6, 'Floresti', 'No Comment', true)
  ]

  constructor() { }

  ngOnInit() {
  }

}
