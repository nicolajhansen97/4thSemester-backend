import {model, Schema, Model, Document} from 'mongoose';

interface IDataLogger extends Document {
    Barcode: string;
    RaspberryVer: string;
    Working: boolean;
}

const ProductSchema: Schema = new Schema({
    Barcode: {type: String, required: true},
    RaspberryVer: {type: String, required: true},
    Woring: {type: Boolean, required: true}
});

const DataLogger: Model<IDataLogger> = model('Product', ProductSchema);

export {DataLogger,IDataLogger}