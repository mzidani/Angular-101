import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Passenger } from "src/assets/passengers";
import { PassengerService } from "../passenger.service";

@Component({
  selector: "component-dashboard",
  template: `
    <h3>AirLine passengers</h3>
    <passenger-counter [items]="passengers"></passenger-counter>
    <passenger-list
      *ngFor="let passenger of passengers"
      [passenger]="passenger"
      (remove)="removePassenger($event)"
    ></passenger-list>
    <hr>
    <!--<passenger-form (passenger)="addPassenger($event)"></passenger-form>-->
    <a href='add'><button>Add new passenger</button></a>
  `,
  styleUrls: ["./passenger-dashboard.component.css"],
})
export class PassengerDashboardComponent implements OnInit, OnDestroy {
  passengers: Passenger[];
  public passengersSubscription$ : Subscription;

  constructor(private passengerService: PassengerService) {
    //this.passengerService.getPassengers().subscribe(items => this.passengers = items);
  }
  ngOnDestroy(): void {
    this.passengersSubscription$.unsubscribe();
  }

  ngOnInit() {
    this.passengersSubscription$ = this.passengerService.getPassengers().subscribe(items => this.passengers = items);
  }

  /*
  editPassenger(passenger: Passenger) {

    this.passengersSubscription$ = this.passengerService.updatePassenger(passenger).subscribe(() => {
      this.passengers = this.passengers.map((p) => {
        if (p.id === passenger.id) {
          return Object.assign({}, p, passenger);
        }
        return p;
      });
    });
  }
*/
  removePassenger(id: number) {

    this.passengersSubscription$ = this.passengerService.deletePassenger(id).subscribe(() => {
      this.passengers = this.passengers.filter(
        (passenger) => passenger.id !== id
      );
    });
  }
/*
  addPassenger(passenger: Passenger) {

    this.passengersSubscription$ = this.passengerService.addPassenger(passenger).subscribe(() => {
      this.passengers.push(passenger);
    });
  }*/
}
