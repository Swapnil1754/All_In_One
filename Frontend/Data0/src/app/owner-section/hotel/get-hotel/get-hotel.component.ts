import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/Domain/General-Domain/Hotel';
import { HotelService } from 'src/app/Services/hotel.service';

@Component({
  selector: 'app-get-hotel',
  templateUrl: './get-hotel.component.html',
  styleUrls: ['./get-hotel.component.css']
})
export class GetHotelComponent implements OnInit{
  getHotelForm: FormGroup;
  thumbnail: any;
  constructor(private formBuilder:FormBuilder, private hotelService: HotelService,private activate: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.getHotelForm = formBuilder.group({
      registrationId: new FormControl('', []),
      hotelName: new FormControl('',[]),
      ownerName: new FormControl('',[]),
      city: new FormControl('',[]),
      rating: new FormControl('',[]),
      image: new FormControl('',[]),
      menus: formBuilder.array([
        formBuilder.group({
          itemName: new FormControl('',[]),
          price: new FormControl('',[]),
          ratings: new FormControl('',[]),
          image: new FormControl('',[])
        }
        )
      ]),
      rooms: formBuilder.array([
        formBuilder.group({
          roomId: new FormControl('',[]),
          roomCatagory: new FormControl('',[]),
          roomType: new FormControl('',[]),
          price: new FormControl('',[]),
          images: new FormControl('',[]),
          aminitiesList: formBuilder.array([
            formBuilder.group({
              aminity: new FormControl('',[])
            })
          ])
        })
      ])
    })
  }
  data:any;
  hotel: Hotel[] = [];
  ngOnInit(): void {
    localStorage.setItem('ownerName', 'Swapnil Sutar');
    this.activate.paramMap.subscribe((x)=>{
      let a = localStorage.getItem('ownerName');
      this.hotelService.getHotelByOwnerName(a).subscribe(b=>{
        this.hotel=b;
        this.hotel.forEach(element => {
        this.data='data:image/jpg;base64,' +element.image;
        console.log('Hotel', element.hotelName);
        this.getHotelForm.get('registrationId')?.setValue(element.registrationId);
        this.getHotelForm.get('hotelName')?.setValue(element.hotelName);
        this.getHotelForm.get('ownerName')?.setValue(element.ownerName);
        this.getHotelForm.get('city')?.setValue(element.city);
        let imageData = 'data:image/jpeg;base64,'+element.image;
        console.log('image', imageData)
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(imageData);
        })
      })
    })
  }
}
