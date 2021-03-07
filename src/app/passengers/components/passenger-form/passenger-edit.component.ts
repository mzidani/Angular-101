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
        <input type='text' name="id" [(ngModel)]='passenger.id' hidden>
        <tr>
          <td>
            Full Name:
          </td>
          <td>
            <input type='text' name='fullName' [(ngModel)]='passenger.fullName' required>
          </td>
        </tr>
        <tr>
          <input type='checkbox' name="checkedIn" [(ngModel)]='passenger.checkedIn' (ngModelChange)="setDate(passenger.checkedIn)"> checked in
        </tr>
        <tr  *ngIf="f.value.checkedIn">
          <td>
            Date:
          </td>
          <td>
            <input type='date' value='{{ passenger.checkInDate ? (passenger.checkInDate | date: "yyyy-MM-dd") : "" }}'>
            <input type="text" name='checkInDate' [(ngModel)]="passenger.checkInDate" hidden>
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

            <input type="text" name="children" [(ngModel)]="passenger.children" hidden>
            <passenger-children *ngFor="let child of passenger.children" [child]="child" (edit)="editChild($event)" (editerName)="getName($event)" (remove)="removeChild($event)"></passenger-children>

          </div>
      <div *ngIf="!adding">
        <h4>Add a child:</h4>
        <table>
          <tr>
            <td class="cwid">
              <input type="text" (input)="handleChildName($event)" placeholder="name" [value]="cname">
            </td>
            <td class="cwid">
              <input type="number" (input)="handleChildAge($event)" placeholder="age" [value]="cage">
            </td>
            <td class="btns">
              <button type="button" (click)="addChild()">Add</button>
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
        if(f.valid){
            this.passengerService.updatePassenger(f.value).subscribe();
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

  setDate(checkedIn: boolean) {
    if(checkedIn) {
      this.passenger.checkInDate = new Date().getTime();
      console.log(this.passenger.checkInDate);
    }
  }

  handleChildName(name: any) {
    this.cname = name.target.value;
  }

  handleChildAge(age: any) {
    this.cage = age.target.value;
  }
}
