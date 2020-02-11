import { Injectable } from '@angular/core';
import { User } from './data/user-data.service';
import { Trip } from '../list-trips/list-trips.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JoinRequest } from '../classes/request';

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

  getIncomingRequests(userId: number) {
    return this.http.get<JoinRequest[]>(`${environment.apiUrl}/users/${userId}/in-requests`);
  }

  acceptRequest(userId: number, tripId: number) {
    return this.http.put(`${environment.apiUrl}/participations/${userId}/${tripId}/accept`, {})
  }

  declineRequest(userId: number, tripId: number) {
    return this.http.put(`${environment.apiUrl}/participations/${userId}/${tripId}/decline`, {})
  }
}
