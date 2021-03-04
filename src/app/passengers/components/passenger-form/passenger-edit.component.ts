import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Passenger } from 'src/assets/passengers';
import { PassengerService } from '../../passenger.service';

@Component({
    selector: 'passenger-edit',
    template: `
    <h3>Edit passenger</h3>
    <br>
    <form #f='ngForm' (ngSubmit)='onSubmit(f)'>
        <input type='hidden' name="id" [(ngModel)]='passenger.id' [value]='passenger.id'>
        Full Name: <input type='text' name='fullName' [(ngModel)]='passenger.fullName' required [value]='passenger.fullName' >
        <br>
        <input type='checkbox' name="checkedIn" ngModel [checked]='passenger.checkedIn'> checked in
        <br>
        Date: <input type='date' name='checkInDate' ngModel [value]="08-26-1996" [disabled]="!f.value.checkedIn" >
        <br>
        <button type='submit'>Submit</button>
    </form>
    <span style='color:green'>{{message}}</span>
    <br>
    <a href=''>Go Back</a>
    `,
    styleUrls: []
})
export class PassengerEditComponent implements OnInit{
    //value='{{ passenger.checkInDate ? (passenger.checkInDate | date: "yyyy-MM-dd") : "" }}' [disabled]="!f.value.checkedIn" 

    public passenger: Passenger = new Passenger();

    constructor(private route: ActivatedRoute, private passengerService: PassengerService) {}

    message: string = '';

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const id = Number(routeParams.get('id'))
        console.log(id);
        this.passengerService.getPassenger(id).subscribe(value => this.passenger=value);
    }

    
    onSubmit(f){
        let pass: Passenger = new Passenger();

        if(f.valid){
            console.log(f.value.fullName);
            pass.id = f.value.id;
            pass.fullName = f.value.fullName;
            pass.checkedIn = f.value.checkedIn ? f.value.checkedIn : false;
            pass.checkInDate=new Date(f.value.checkInDate).getTime();
            console.log(pass);
            this.passengerService.updatePassenger(pass).subscribe();
            this.message = 'Passenger edited';
        }
        
    }

}