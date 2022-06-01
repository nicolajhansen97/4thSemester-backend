import { User } from '../3_models/User';
import { IUser } from '../3_models/User';
import { nodeModuleNameResolver } from 'typescript';
import { Product, IProduct } from '../3_models/Product';
import { Encryption } from './Encryption';
import { TreeModel, ITreeModel } from '../3_models/TreeModel';
import { Measuerments, IMeasuerments } from '../3_models/Measuerment';
import { IDataLogger, DataLogger } from '../3_models/DataLogger';
class Api {
    // Tree Crud
    static async getTrees(): Promise<any> {
        const Trees: ITreeModel[] = await TreeModel.find({}, { _id: 0, __v: 0 });
        return Trees;
    }

    static async insertTree(
        TreeType: string,
        HumidityMin: number,
        HumidityMax: number,
        TempMin: number,
        TempMax: number,
        UserId: string,
        BarCode: string
    ): Promise<boolean> {
        const tree: ITreeModel = new TreeModel({
            No: "1",
            TreeType,
            HumidityMin,
            HumidityMax,
            TempMin,
            TempMax,
            UserId,
            BarCode
        });
        await tree.save();
        return true;
    }

    static async GetsingelProduct(id: string): Promise<any> {
        const customer: IProduct = await Product.findOne({ "no": id })
        return customer;
    }

    static async GetSingleTrewWithBarcodes(BarCode: string): Promise<any> {
        const tree: ITreeModel = await TreeModel.findOne({ "BarCode": BarCode })
        return tree;
    }

    static async UpdateTree(
        no:string,
        TreeType:string,
        HumidityMin:number,
        HumidityMax:number,
        TempMin:number,
        TempMax:number,
        UserId:string,
        BarCode:string
        ): Promise<any> {
        const tree = await TreeModel.findOne({ "no": no })
        tree.TreeType = TreeType;
        await tree.save();
    }

    static async DeleteTree(id: string): Promise<any> {
        await TreeModel.deleteOne({ "no": id })
        return true
    }

    // Datalogger

	static async getDevice(): Promise<any> {
        const device: IDataLogger[] = await DataLogger.find({}, { _id: 0, __v: 0 });
        return device;
    }

    static async insertDevice(
        BarCode: string,
        RaspberryVer: string,
        Working: boolean
    ):Promise<boolean>{
        const device: IDataLogger = new DataLogger({
            BarCode,
            RaspberryVer,
            Working
        });
        await device.save();
        return true;
    }

    // Measuerments

    static async getMeasurements(): Promise<any> {
        const measurement: IMeasuerments[] = await Measuerments.find({}, { _id: 0, __v: 0 });
        return measurement;
    }

    static async insertMeasuerment(
        Treeno: string,
        Barcode: string,
        MeasuermentID: string,
        Humidity: number,
        Temperature: number,
        IsSoilWet: boolean,
        DateOfMes: Date
    ): Promise<boolean> {
        const measurment: IMeasuerments = new Measuerments({
            Treeno,
            Barcode,
            MeasuermentID,
            Humidity,
            Temperature,
            IsSoilWet,
            DateOfMes
        });
        await measurment.save();
        return true;
    }
}
export { Api }