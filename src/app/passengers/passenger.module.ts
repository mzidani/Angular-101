import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PassengerDashboardComponent } from "./containers/passenger-dashboard.component";
import { PassengerCountComponent } from "./components/passenger-count/passenger-count.component";
import { PassengerListComponent } from "./components/passenger-list/passenger-list.component";
import { PassengerService } from "./passenger.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { PassengerFormComponent } from "./components/passenger-form/passenger-form.component";
import { RouterModule } from "@angular/router";
import { PassengerEditComponent } from "./components/passenger-form/passenger-edit.component";



@NgModule({
  declarations: [
    PassengerDashboardComponent,
    PassengerCountComponent,
    PassengerListComponent,
    PassengerFormComponent,
    PassengerEditComponent
  ],
  imports: [CommonModule, 
            HttpClientModule, 
            FormsModule
  ],
  providers: [PassengerService],
  exports: [PassengerDashboardComponent, PassengerEditComponent],
})
export class PassengersModule {}
