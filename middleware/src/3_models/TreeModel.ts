import {model, Schema, Model, Document} from 'mongoose';

interface ITreeModel extends Document {
    No: string;
    TreeType: string;
    HumidityMin: number;
    HumidityMax: number;
    TempMin: number;
    TempMax: number;
    UserId: string;
    BarCode: string;
    ImageSrc: Buffer
}

const ProductSchema: Schema = new Schema({
  No : {type: String, required: false },
  TreeType : {type: String, required: true },
  HumidityMin : {type: Number, required: true },
  HumidityMax : {type: Number, required: true },
  TempMin : {type: Number, required: true },
  TempMax : {type: Number, required: true },
  UserId : {type: String, required: true },
  BarCode: { type: String, required: true },
  ImageSrc: {type: Buffer, required: false}
});

const TreeModel: Model<ITreeModel> = model('TreeModel', ProductSchema);

export {TreeModel,ITreeModel}