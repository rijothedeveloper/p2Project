import { ProducerInterface } from "./ProducerInterface";

export interface ItemInterface {
    id?:number,
    category:string,
    description:string,
    image?:string,
    name:string,
    rating?:number,
    producer?: ProducerInterface;
    //producer_id?:number
    producerId?:number

}