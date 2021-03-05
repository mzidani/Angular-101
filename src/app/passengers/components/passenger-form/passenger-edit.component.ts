import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Child, Passenger} from 'src/assets/passengers';
import { PassengerService } from '../../passenger.service';

@Component({
    selector: 'passenger-edit',
    template: `
    <h3>Edit passenger</h3>
    <br>

    <form #f='ngForm' (ngSubmit)='onSubmit(f)'>
      <table>
        <input type='hidden' name="id" [(ngModel)]='passenger.id' [value]='passenger.id'>
        <tr>
          <td>
            Full Name:
          </td>
          <td>
            <input type='text' name='fullName' [(ngModel)]='passenger.fullName' required [value]='passenger.fullName' >
          </td>
        </tr>
        <tr>
          <input type='checkbox' name="checkedIn" [(ngModel)]='passenger.checkedIn' [checked]='passenger.checkedIn'> checked in
        </tr>
        <tr>
          <td>
            Date:
          </td>
          <td>
            <input type='date' name='checkInDate' ngModel value='{{ passenger.checkInDate ? (passenger.checkInDate | date: "yyyy-MM-dd") : "" }}' [disabled]="!f.value.checkedIn">
          </td>
        </tr>
      </table>
        <br>
        <br>
          <div *ngIf="passenger.children && passenger.children.length > 0">
            <h4>Children :</h4>
            <table>
              <tr>
                <th class="cwid" style="font-weight: bold">Name</th>
                <th class="cwid" style="font-weight: bold">Age</th>
              </tr>
            </table>

            <passenger-children *ngFor="let child of passenger.children" [child]="child" (edit)="editChild($event)" (editerName)="getName($event)" (remove)="removeChild($event)"></passenger-children>

          </div>
      <div *ngIf="!adding">
        <h4>Add a child:</h4>
        <table>
          <tr>
            <td class="cwid">
              <input type="text" [(ngModel)]="cname" name="cname" placeholder="name">
            </td>
            <td class="cwid">
              <input type="number" [(ngModel)]="cage" name="cage" placeholder="age">
            </td>
            <td class="btns">
              <button (click)="addChild()">Add</button>
            </td>
          </tr>
        </table>
      </div>
        <br>
        <button type='submit'>Submit</button>
    </form>
    <br>
    <br>
    <span style='color:green'>{{message}}</span>
    <br>
    <a href=''>Go Back</a>
    `,
    styleUrls: ['passenger-edit.component.css']
})
export class PassengerEditComponent implements OnInit{
    //value='{{ passenger.checkInDate ? (passenger.checkInDate | date: "yyyy-MM-dd") : "" }}' [disabled]="!f.value.checkedIn" [required]="f.value.checkedIn"

    public passenger: Passenger = new Passenger();

    childName: string = '';
    adding: boolean = false;

    constructor(private route: ActivatedRoute, private passengerService: PassengerService) {}

    message: string = '';

    cname: string = '';
    cage: string = '';

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
            console.log(pass.checkInDate);
            if(!pass.checkInDate && pass.checkedIn) {
              pass.checkInDate = this.passenger.checkInDate;
            }
            console.log(this.passenger.checkInDate);
            pass.children = this.passenger.children;
            console.log(pass.children);
            this.passengerService.updatePassenger(pass).subscribe();
            this.message = 'Passenger edited';
        }

    }

  editChild(newchild: Child) {
    let name: string = this.childName;
    console.log(name);
    console.log(newchild);
    this.passenger.children
      .filter((child) =>
        child.name == name
      )
      .map((child) =>
      {
      child.name = newchild.name;
      child.age = newchild.age
    });
    console.log(this.passenger.children);
  }

  getName(name: string) {
    this.childName = name;
  }


  removeChild(name: string) {
    this.passenger.children = this.passenger.children.filter((child) => child.name != name);
  }

  addChild() {
      if(this.cname && this.cage){
        if(!this.passenger.children){
          this.passenger.children = [];
        }
        this.passenger.children.push({name: this.cname, age: Number(this.cage)});
      }
      this.cname = '';
      this.cage = '';
  }
}
