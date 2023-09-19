import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit{
  @Input()
  image:string="";
  retriewImage:any;
  ngOnInit(): void {
    this.retriewImage = 'data:image/jpg;base64,' +this.image;
  }

}
