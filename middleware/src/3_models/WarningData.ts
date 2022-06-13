import {model, Schema, Model, Document} from 'mongoose';

interface IWarningData extends Document {
    WarNo: string;
    BarCode: string;
    Warning: string;
    IsHandled: boolean;
    
}

const ProductSchema: Schema = new Schema({
    WarNo: {type: String, required: true},
    BarCode: {type: String, required: true},
    Warning: {type: String, required: true},
    IsHandled: {type: Boolean, required: true}
});

const WarningData: Model<IWarningData> = model('WarningData', ProductSchema);

export {WarningData,IWarningData}