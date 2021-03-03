import { Passenger, passengers } from "src/assets/passengers";

export class PassengerService {
  constructor() {}

  public getPassengers(): Passenger[] {
    return passengers;
  }
}
