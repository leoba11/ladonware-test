import { Document } from 'mongoose';

export default interface IProduct extends Document {
    name: string,
    quantity: number,
    category: string,
    price: number,
    inventary: string,
    description: string
}
