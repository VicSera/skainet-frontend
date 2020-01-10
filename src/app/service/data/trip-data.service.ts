import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/list-trips/list-trips.component';

class TripWithoutId {
  // public driverId : number;
  public date: Date;
  public maxPassengers: number;
  public location: string;
  public comment: string;
  public go: boolean;

  constructor(trip : Trip) {
    // this.driverId = trip.driverId;
    this.date = trip.date;
    this.maxPassengers = trip.maxPassengers;
    this.location = trip.location;
    this.comment = trip.comment;
    this.go = trip.go;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http : HttpClient
  ) { }

  retrieveAllTrips(username : String) {
    return this.http.get<Trip[]>(`http://localhost:8080/trips`);
  }

  retrieveTrip(tripId) {
    return this.http.get<Trip>(`http://localhost:8080/trips/${tripId}`);
  }

  deleteTrip(tripId) {
    return this.http.delete(`http://localhost:8080/trips/${tripId}`);
  }

  updateTrip(trip : Trip) {
    return this.http.put<Trip>(`http://localhost:8080/trips/${trip.id}`, trip);
  }

  createTrip(trip : Trip) {
    let tripWithoutId = new TripWithoutId(trip);

    return this.http.post<TripWithoutId>('http://localhost:8080/trips', tripWithoutId);
  }
}
