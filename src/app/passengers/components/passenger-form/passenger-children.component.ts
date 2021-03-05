import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Child, Passenger} from '../../../../assets/passengers';

@Component({
  selector: 'passenger-children',
  template: `
    <div>
      <table>
        <tr>
          <td class="cwid">
            <input #n type="text" *ngIf="editing" [value]="child.name" (input)="handleNameEdit(n.value)">
            <span *ngIf="!editing">{{child.name}}</span>
          </td>
          <td class="cwid">
            <input #a type="number" *ngIf="editing" [value]="child.age" (input)="handleAgeEdit(a.value)">
            <span *ngIf="!editing">{{child.age}}</span>
          </td>
          <td class="btns">
            <button (click)="toggleEdit()">{{ editing ? 'Done' : 'Edit' }}</button>
            <button (click)="handleRemove(child.name)">Remove</button>
          </td>
        </tr>
      </table>
    </div>


  `,
  styleUrls: ['passenger-edit.component.css']
})
export class PassengerChildrenComponent {

  @Input() child: Child;
  @Output() edit: EventEmitter<Child> = new EventEmitter();
  @Output() editerName: EventEmitter<string> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  childToEmit: Child;

  editing: boolean = false;
  change: boolean = false;

  toggleEdit() {
    if(this.editing && this.change) {
      this.editerName.emit(this.child.name)
      this.edit.emit(this.childToEmit);
    }
    this.editing = !this.editing;
  }

  handleNameEdit(name: string) {
    this.childToEmit = { ...this.child, name: name }
    this.change = true;
  }

  handleAgeEdit(age: string) {
    let num = Number(age);
    this.childToEmit = { ...this.child, age: num };
    this.change = true;
  }

  handleRemove(name: string) {
    this.remove.emit(name);
  }
}
