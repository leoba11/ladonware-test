import mongoose, { Schema } from 'mongoose';
import IProduct from '../interfaces/product';

const ProductSchema: Schema = new Schema(
  {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        category: {type: String, required: false },
        price: {type: Number, required: false},
        inventary: {type: String, required: false},
        description: {type: String, required: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
