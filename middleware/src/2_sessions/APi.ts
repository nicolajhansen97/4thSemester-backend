import { TreeModel, ITreeModel } from '../3_models/TreeModel';
import { Measuerments, IMeasuerments } from '../3_models/Measuerment';
import { IDataLogger, DataLogger } from '../3_models/DataLogger';
import { IWarningData, WarningData } from '../3_models/WarningData';
import { ITest, Test } from '../3_models/test';


class Api {
    /*          TREE APIS's         */
    
    //Get Trees Api
    static async getTrees(): Promise<any> {
        const Trees: ITreeModel[] = await TreeModel.find({}, { _id: 0, __v: 0 });
        return Trees;
    }
    //Create Tree api 
    static async insertTree(
        No: string,
        TreeType: string,
        HumidityMin: number,
        HumidityMax: number,
        TempMin: number,
        TempMax: number,
        UserId: string,
        BarCode: string,
        Image: Buffer
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
            Image
        });
        console.log(Image);
        await tree.save();
        return true;
    }
    //Get Tree with id api
    static async GetsingelTree(id: string): Promise<any> {
        const tree: ITreeModel = await TreeModel.findOne({ "No": id })
        return tree;
    }
    //Get Tree with barcode api
    static async GetSingleTreeWithBarcodes(BarCode: string): Promise<any> {
        const tree: ITreeModel = await TreeModel.findOne({ "BarCode": BarCode })
        return tree;
    }
    //Update Tree Api
    static async UpdateTree(No: string, TreeType: string, HumidityMin: number, HumidityMax: number, TempMin: number, TempMax: number,
        UserId: string, BarCode: string, Image: Buffer): Promise<any> {
        const tree = await TreeModel.findOne({ "No": No })
        tree.TreeType = TreeType;
        tree.HumidityMin = HumidityMin;
        tree.HumidityMax = HumidityMax;
        tree.TempMin = TempMin;
        tree.TempMax = TempMax;
        tree.UserId = UserId;
        tree.BarCode = BarCode;
        tree.Image = Image;
        await tree.save();
    }

    // Delete Tree api
    static async DeleteTree(id: string): Promise<any> {
        await TreeModel.deleteOne({ "No": id })
        return true
    }

    /*          Device APIS's         */

    //Get deices api
    static async getDevice(): Promise<any> {
        const device: IDataLogger[] = await DataLogger.find({}, { _id: 0, __v: 0 });
        return device;
    }
    //Update Device api
    static async UpdateDevice(No: string, BarCode: string, RaspberryVer: string, Working: boolean): Promise<any> {
        const device = await DataLogger.findOne({ "BarCode": No })
        device.BarCode = BarCode,
            device.RaspberryVer = RaspberryVer,
            device.Working = Working,
            await device.save();
    }
    //Create Device api
    static async insertDevice(
        BarCode: string,
        RaspberryVer: string,
        Working: boolean
    ): Promise<boolean> {
        const device: IDataLogger = new DataLogger({
            BarCode,
            RaspberryVer,
            Working
        });
        await device.save();
        return true;
    }
    //Delete Device api
    static async DeleteDevice(Barcode: string): Promise<any> {
        await DataLogger.deleteOne({ "BarCode": Barcode })
        return true
    }
    //Get Device with Barcode api
    static async GetDeviceWithBarcode(BarCode: string): Promise<any> {
        const device: IDataLogger = await DataLogger.findOne({ "BarCode": BarCode })
        return device;
    }

    /*          Measuerment APIS's         */

    //Get Measuerments api
    static async getMeasurements(): Promise<any> {
        const measurement: IMeasuerments[] = await Measuerments.find({}, { _id: 0, __v: 0 });
        return measurement;
    }

    //Create Measuerment
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

    /*          Warning APIS's         */

    //Create Warning api
    static async insertWarning(
        WarNo: string,
        BarCode: string,
        Warning: string,
        IsHandled: boolean
    ): Promise<boolean> {
        const warning: IWarningData = new WarningData({
            WarNo,
            BarCode,
            Warning,
            IsHandled
        });
        await warning.save();
        return true;
    }
    //Get Warnings api
    static async getWarnings(): Promise<any> {
        const warning: IWarningData[] = await WarningData.find({}, { _id: 0, __v: 0 });
        return warning;
    }
    //Update Warning
    static async UpdateWarning(No: string, BarCode: string, Warning: string, IsHandled: boolean): Promise<any> {
        const warning = await WarningData.findOne({ "WarNo": No })
        warning.BarCode = BarCode,
            warning.Warning = Warning,
            warning.IsHandled = IsHandled
        await warning.save();
    }

     /*          image Test APIS's         */

    static async getTest(): Promise<any> {
        const d: ITest[] = await Test.find({}, { _id: 0, __v: 0 });
        return d
    }

    static async insertTest(
        name: string,
        price: string,
        Image: Object
    ): Promise<boolean> {
        const warning: ITest = new Test({
            name,
            price,
            Image
        });
        await warning.save();
        return true;
    }
}
export { Api }