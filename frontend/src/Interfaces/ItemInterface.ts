export interface ItemInterface {
    id?:number,
    category:string,
    description:string,
    image?:string,
    name:string,
    rating?:number,
    producer_id:number
    producer?: ProducerInterface;
}