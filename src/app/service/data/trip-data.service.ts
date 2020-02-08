import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/list-trips/list-trips.component';
import { User } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http : HttpClient
  ) { }

  retrieveAllTrips() {
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
    delete trip.id;

    return this.http.post<Trip>('http://localhost:8080/trips', trip);
  }
}
