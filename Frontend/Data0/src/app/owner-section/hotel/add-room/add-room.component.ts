import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import { Aminities } from 'src/app/Domain/Owner-Domain/Aminities';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  RoomForm:FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] =['Lunch'];
  allFruits: string[] = ['Snacks', 'Swimming Pool', 'Dinner', 'Garden', 'Gizzer'];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  images: File[] | undefined;
  constructor(private formBuilder:FormBuilder) {
    this.RoomForm = this.formBuilder.group({
      roomCatagory: new FormControl('',[Validators.required]),
      roomType: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      aminitiesList: this.formBuilder.array([
        this.formBuilder.group({
          aminity: new FormControl([])
        })
      ])
    });
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  uploadData(){
    
    const aminitiesList = this.RoomForm.controls['aminitiesList'] as FormArray;
    this.fruits.forEach(x => {
      aminitiesList.push(this.formBuilder.control(x));
    })
    console.log("Aminities",this.RoomForm.value);
  }
}
