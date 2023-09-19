import { Aminities } from "./Aminities";

export class Room{
    roomId: string;
    roomCatagory: string;
    roomType: string;
    price: number;
    images: string;
    aminitiesList: Aminities[];
    constructor(){
        this.roomId="",
        this.roomCatagory="",
        this.roomType="",
        this.price=0,
        this.images="",
        this.aminitiesList=[]
    }
}