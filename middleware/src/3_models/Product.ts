import {model, Schema, Model, Document} from 'mongoose';

interface IProduct extends Document {
    no:string;
    name: string;
    price:number;
    barCode: string;
}

const ProductSchema: Schema = new Schema({
  no: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  barCode: { type: String, required: true }
});

const Product: Model<IProduct> = model('Product', ProductSchema);

export {Product,IProduct}