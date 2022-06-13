import {model, Schema, Model, Document} from 'mongoose';

interface ITest extends Document {
  name: string;
  price: String;
  images: Object;
}

const ProductSchema: Schema = new Schema({
  name: {type: String, required: true},
  price: {type: String, required: true},
  images: { type: Buffer, required: true},
});

const Test: Model<ITest> = model('test', ProductSchema);

export {Test,ITest}