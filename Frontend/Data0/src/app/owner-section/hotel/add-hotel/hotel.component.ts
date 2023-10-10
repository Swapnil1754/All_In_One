import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../../Services/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent {
HotelForm:FormGroup;
image:any=File;
constructor(private formBuilder: FormBuilder, private hotelService:HotelService){
  this.HotelForm = new FormGroup({
    ownerName: new FormControl('', [Validators.required]),
    hotelName: new FormControl('',[Validators.required]),
    city: new FormControl('', [Validators.required]),
    rating: new FormControl('',[Validators.required])
    // menus: formBuilder.array([
    //   formBuilder.group({
    //     itemId: new FormControl('', [Validators.required]),
    //     itemName: new FormControl('', [Validators.required]),
    //     price: new FormControl('', [Validators.required]),
    //     ratings: new FormControl('', [Validators.required])
    //   })
    // ]),
    // rooms: formBuilder.array([
    //   formBuilder.group({
    //     roomId: new FormControl('', [Validators.required]),
    //     roomCatagory: new FormControl('', [Validators.required]),
    //     roomType: new FormControl('', [Validators.required]),
    //     price: new FormControl('', [Validators.required]),
    //     aminitiesList: formBuilder.array([
    //       formBuilder.group({
    //         aminity: new FormControl('', [Validators.required])
    //       })
    //     ])
    //   })
    // ])
  })
}
onFileSelected(event){
  const imageFile = event.target.files[0];
  this.image = imageFile;
  console.log("image", this.image)
}
uploadData(){
  var formData = new FormData;
  formData.append("file", this.image);
  formData.append("data",JSON.stringify(this.HotelForm.value));
  this.hotelService.addHotel(formData).subscribe((x:any)=>{
    console.log("Data",formData);
    alert("Hotel Registered Successfully...!!!")
  },error=>{
    alert("Hotel Registration failled...!!!")
  })
}
}
