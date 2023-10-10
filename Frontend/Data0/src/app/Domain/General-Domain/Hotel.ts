import { Menu } from "./Menu";
import { Room } from "./Room";

export class Hotel{
    registrationId: string;
    hotelName: string;
    ownerName: string;
    city: string;
    rating: number;
    image: string;
    menus: Menu[];
    rooms: Room[];
    constructor(){
        this.registrationId="",
        this.hotelName="",
        this.ownerName="",
        this.city="",
        this.rating=0,
        this.image="",
        this.menus=[],
        this.rooms=[]
    }
}