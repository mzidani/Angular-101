import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "src/assets/passengers";

@Component({
  selector: "passenger-list",
  template: `
  <span
      class="status"
      [ngClass]="{
        'checked-in': passenger.checkedIn,
        'checked-out': !passenger.checkedIn
      }"
    ></span>
    <input
      type="text"
      [value]="passenger.fullName"
      *ngIf="editing"
      (input)="handleFullNameEdit($event)"
    />
    <span *ngIf="!editing">{{ passenger.fullName }}</span>
    <div class="checkin-date">
      Check in date :
      {{
        passenger.checkInDate
          ? (passenger.checkInDate | date: "y MMMM d" | uppercase)
          : "not checked in"
      }}
    </div>
    <div class="children">Children : {{ passenger.children?.length || 0 }}</div>
    <div class="action">
      <!--<button (click)="toggleEdit()">{{ editing ? "done" : "edit" }}</button>-->
      <a href='/edit/{{passenger.id}}'><button>Edit</button></a>
      <button (click)="handleRemove(passenger.id)">remove</button>
    </div>
  `,
  styleUrls: ["./passenger-list.component.css"],
})
export class PassengerListComponent {
  @Input() passenger: Passenger;
  @Output() edit: EventEmitter<Passenger> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();
  editing: boolean = false;
  passengerToEmit: Passenger;

  ngOnInit() {
    console.log(this.passenger);
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.passengerToEmit);
    }
    this.editing = !this.editing;
  }

  handleFullNameEdit(event: any) {
    this.passengerToEmit = { ...this.passenger, fullName: event.target.value };
  }

  handleRemove(id: number) {
    this.remove.emit(id);
  }

}
