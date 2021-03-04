import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from 'src/assets/passengers';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  passengersUrl = 'http://localhost:3000/passengers';
  httpOption = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.passengersUrl);
  }

  getPassenger(id: number): Observable<Passenger> {
    const url = `${this.passengersUrl}/${id}`
    return this.http.get<Passenger>(url);
  }

  updatePassenger(passenger: Passenger): Observable<any> {
    const url = `${this.passengersUrl}/${passenger.id}`
    return this.http.put(url, passenger, this.httpOption);
  }

  addPassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(this.passengersUrl, passenger, this.httpOption);
  }

  deletePassenger(passenger: Passenger | number): Observable<Passenger> {
    const id = typeof passenger === 'number' ? passenger : passenger.id;
    const url = `${this.passengersUrl}/${id}`;

    return this.http.delete<Passenger>(url, this.httpOption);
  }

}
