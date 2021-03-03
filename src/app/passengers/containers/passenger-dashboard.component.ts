import { Component, OnInit } from "@angular/core";

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
      (edit)="editPassenger($event)"
      (remove)="removePassenger($event)"
    ></passenger-list>
  `,
  styleUrls: ["./passenger-dashboard.component.css"],
})
export class PassengerDashboardComponent implements OnInit {
  public passengers;

  constructor(private passengerService: PassengerService) {}

  ngOnInit() {
    this.passengers = this.passengerService.getPassengers();
  }

  editPassenger(passenger: Passenger) {
    this.passengers = this.passengers.map((p) => {
      if (p.id === passenger.id) {
        return Object.assign({}, p, passenger);
      }
      return p;
    });
  }

  removePassenger(id: number) {
    this.passengers = this.passengers.filter(
      (passenger) => passenger.id !== id
    );
  }
}
