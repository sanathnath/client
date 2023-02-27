import { Photo } from "./Photo";

export interface Product{
    id: number;
    title: string;
    thumbnail: string;
    price: string;
    discount: string;
    quantity: string;
    description: string;
    photos: Photo[]
}