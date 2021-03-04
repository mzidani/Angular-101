import { isNgTemplate } from "@angular/compiler";
import { Component, Input } from "@angular/core";
import { INSPECT_MAX_BYTES } from "buffer";
import { Passenger } from "src/assets/passengers";
@Component({
  selector: "passenger-counter",
  template: ` <div>
    Checked In passengers : {{ countPassenger() }} / {{ countLength() }}
  </div>
  `,
})
export class PassengerCountComponent {
  @Input() items?: Passenger[];

  countLength(): number {
    return this.items?.length;
  }

  countPassenger(): number {
    return this.items?.filter((passenger) => passenger.checkedIn).length;
  }
}
