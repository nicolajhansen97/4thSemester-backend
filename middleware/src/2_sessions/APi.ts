import { User } from '../3_models/User';
import { IUser } from '../3_models/User';
import { nodeModuleNameResolver } from 'typescript';
import { Product, IProduct } from '../3_models/Product';
import { Encryption } from './Encryption';
import { TreeModel, ITreeModel } from '../3_models/TreeModel';
import { Measuerments, IMeasuerments } from '../3_models/Measuerment';
import { IDataLogger, DataLogger } from '../3_models/DataLogger';
import { StringMap } from 'ts-jest';
class Api {
    // Tree Crud
    static async getTrees(): Promise<any> {
        const Trees: ITreeModel[] = await TreeModel.find({}, { _id: 0, __v: 0 });
        return Trees;
    }

    static async insertTree(
        No: string,
        TreeType: string,
        HumidityMin: number,
        HumidityMax: number,
        TempMin: number,
        TempMax: number,
        UserId: string,
        BarCode: string,
        ImageSrc: Buffer
    ): Promise<boolean> {
        const tree: ITreeModel = new TreeModel({
            No,
            TreeType,
            HumidityMin,
            HumidityMax,
            TempMin,
            TempMax,
            UserId,
            BarCode,
            ImageSrc
        });
        await tree.save();
        return true;
    }

    static async GetsingelProduct(id: string): Promise<any> {
        const customer: ITreeModel = await TreeModel.findOne({ "No": id })
        return customer;
    }

    static async GetSingleTrewWithBarcodes(BarCode: string): Promise<any> {
        const tree: ITreeModel = await TreeModel.findOne({ "BarCode": BarCode })
        return tree;
    }

    static async UpdateTree(No: string, TreeType: string, HumidityMin: number, HumidityMax: number, TempMin: number, TempMax: number,
        UserId: string, BarCode: string, ImageSrc: Buffer): Promise<any> {
        const tree = await TreeModel.findOne({ "No": No })
        tree.TreeType = TreeType;
        tree.HumidityMin = HumidityMin;
        tree.HumidityMax = HumidityMax;
        tree.TempMin = TempMin;
        tree.TempMax = TempMax;
        tree.UserId = UserId;
        tree.BarCode = BarCode;
        tree.ImageSrc = ImageSrc;
        await tree.save();
    }


    // Delete a tree
    static async DeleteTree(id: string): Promise<any> {
    await TreeModel.deleteOne({ "No": id })
    return true
}

    // Datalogger

	static async getDevice(): Promise<any> {
        const device: IDataLogger[] = await DataLogger.find({}, { _id: 0, __v: 0 });
        return device;
    }

    static async UpdateDevice(No: string, BarCode: string, RaspberryVer: string, Working: boolean, IsPaired: boolean): Promise<any> {
        const device = await DataLogger.findOne({ "BarCode": No })
        device.BarCode = BarCode,
        device.RaspberryVer = RaspberryVer,
        device.Working = Working,
        device.IsPaired = IsPaired
        await device.save();
    }

    static async insertDevice(
        BarCode: string,
        RaspberryVer: string,
        Working: boolean
    ):Promise<boolean>{
        const device: IDataLogger = new DataLogger({
            BarCode,
            RaspberryVer,
            Working,
            IsPaired: false
        });
        await device.save();
        return true;
    }

    static async DeleteDevice(Barcode: string): Promise<any> {
        await DataLogger.deleteOne({ "BarCode": Barcode })
        return true
    }

    static async GetDeviceWithBarcode(BarCode: string): Promise<any> {
        const device: IDataLogger = await DataLogger.findOne({ "BarCode": BarCode })
        return device;
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