import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/list-trips/list-trips.component';
import { User } from './user-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

constructor(
    private http : HttpClient
  ) { }

  retrieveAllTrips() {
    return this.http.get<Trip[]>(`${environment.apiUrl}/trips`);
  }

  retrieveTrip(tripId) {
    return this.http.get<Trip>(`${environment.apiUrl}/trips/${tripId}`);
  }

  deleteTrip(tripId) {
    return this.http.delete(`${environment.apiUrl}/trips/${tripId}`);
  }

  updateTrip(trip : Trip) {
    return this.http.put<Trip>(`${environment.apiUrl}/trips/${trip.id}`, trip);
  }

  createTrip(trip : Trip) {
    delete trip.id;

    return this.http.post<Trip>(`${environment.apiUrl}/trips`, trip);
  }
}
