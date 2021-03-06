import {model, Schema, Model, Document} from 'mongoose';

interface IMeasuerments extends Document {
    Treeno:string;
    Barcode: string;
    MeasuermentID:string;
    Humidity: number;
    Temperature: number;
    IsSoilWet: boolean;
    DateOfMes: Date;
}

const ProductSchema: Schema = new Schema({
  Treeno: { type: String, required: true },
  Barcode: { type: String, required: true },
  MeasuermentID: { type: String, required: true },
  Humidity: { type: Number, required: true },
  Temperature: { type: Number, required: true },
  IsSoilWet: { type: Boolean, required: true },
  DateOfMes: {type: Date, required: true}
});

const Measuerments: Model<IMeasuerments> = model('Measuerments', ProductSchema);

export {Measuerments,IMeasuerments}