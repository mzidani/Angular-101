import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PassengerEditComponent } from "./passengers/components/passenger-form/passenger-edit.component";
import { PassengerFormComponent } from "./passengers/components/passenger-form/passenger-form.component";
import { PassengerDashboardComponent } from "./passengers/containers/passenger-dashboard.component";
import { PassengersModule } from "./passengers/passenger.module";

const routes = [
  {path:'', component: PassengerDashboardComponent},
  {path: 'edit/:id', component: PassengerEditComponent},
  {path: 'add', component: PassengerFormComponent}
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, PassengersModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
