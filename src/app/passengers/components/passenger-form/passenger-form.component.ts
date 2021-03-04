import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Passenger } from 'src/assets/passengers';
import { PassengerService } from '../../passenger.service';
import { Location } from '@angular/common'

@Component({
    selector: 'passenger-form',
    template: `
    <h2>Add new passenger</h2>
    <form #f='ngForm' (ngSubmit)=onSubmit(f)>
      Full Name: <input type='text' name='fullName' ngModel required>
      <br>
      <input type='checkbox' name="checkedIn" ngModel> checked in
      <br>
      Date: <input type='date' name='checkInDate' ngModel [disabled]="!f.value.checkedIn">
      
      <br>
      <button type='submit'>Submit</button>
    </form>
    <br>
    <a href=''>Go Back</a>
    `,
    styleUrls: []
})
export class PassengerFormComponent implements OnDestroy{
    
    public passengersSubscription$ : Subscription;

    constructor(private passengerService: PassengerService, private location: Location){

    }

    ngOnDestroy(): void {
        this.passengersSubscription$.unsubscribe;
    }
    
    @Output() passenger: EventEmitter<Passenger> = new EventEmitter();

    goBack(): void {
        this.location.back();
      }
    

    onSubmit(f){
        let pass: Passenger = new Passenger();

        if(f.valid){
            console.log(f.value.fullName);
            pass.fullName = f.value.fullName;
            pass.checkedIn = f.value.checkedIn ? f.value.checkedIn : false;
            console.log(f.value.checkedIn);
            pass.checkInDate=new Date(f.value.checkInDate).getTime();
            //this.passenger.emit(pass);
            this.passengersSubscription$ = this.passengerService.addPassenger(pass).subscribe(() => {
                this.goBack();
            });
            
        }
        
    }
}