import {model, Schema, Model, Document} from 'mongoose';

interface IBiddedProduct extends Document {
    userID: string;
    ProductID: string;
    timeStamp: Date;
}

const ProductSchema: Schema = new Schema({
  timeStamp: { type: Date, required: true },
  userID: { type: String, required: true },
  ProductID: { type: String, required: true }
});

const BiddedProduct: Model<IBiddedProduct> = model('BiddedProduct', ProductSchema);

export {BiddedProduct,IBiddedProduct}