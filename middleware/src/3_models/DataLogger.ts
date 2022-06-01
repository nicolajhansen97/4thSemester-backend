import {model, Schema, Model, Document} from 'mongoose';

interface IDataLogger extends Document {
    BarCode: string;
    RaspberryVer: string;
    Working: boolean;
}

const ProductSchema: Schema = new Schema({
    BarCode: {type: String, required: true},
    RaspberryVer: {type: String, required: true},
    Working: {type: Boolean, required: true}
});

const DataLogger: Model<IDataLogger> = model('DataLoggers', ProductSchema);

export {DataLogger,IDataLogger}