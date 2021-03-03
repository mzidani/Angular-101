import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PassengerDashboardComponent } from "./containers/passenger-dashboard.component";
import { PassengerCountComponent } from "./components/passenger-count/passenger-count.component";
import { PassengerListComponent } from "./components/passenger-list/passenger-list.component";
import { PassengerService } from "./passenger.service";

@NgModule({
  declarations: [
    PassengerDashboardComponent,
    PassengerCountComponent,
    PassengerListComponent,
  ],
  imports: [CommonModule],
  providers: [PassengerService],
  exports: [PassengerDashboardComponent],
})
export class PassengersModule {}
