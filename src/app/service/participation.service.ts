import { Injectable } from '@angular/core';
import { User } from './data/user-data.service';
import { Trip } from '../list-trips/list-trips.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  constructor(
    private http: HttpClient
  ) { }

  requestJoin(user: User, trip: Trip) {
    return this.http.post(`${environment.apiUrl}/participations`, {userId: user.id, tripId: trip.id});
  }

  cancelRequest(user: User, trip: Trip) {
    return this.http.delete(`${environment.apiUrl}/participations/${user.id}/${trip.id}`);
  }

  getStatus(user: User, trip: Trip) {
    return this.http.get(`${environment.apiUrl}/participations/${user.id}/${trip.id}`);
  }
}
