import { User } from '../3_models/User';
import { IUser } from '../3_models/User';
import { nodeModuleNameResolver } from 'typescript';
import { Product, IProduct } from '../3_models/Product';
import { Encryption } from './Encryption';
import { TreeModel, ITreeModel } from '../3_models/TreeModel';
import { Measuerments, IMeasuerments } from '../3_models/Measuerment';
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

// Delete a tree
static async DeleteTree(id: string): Promise<any> {
    await TreeModel.deleteOne({ "No": id })
    return true
}


static async UpdateTree(No: string, TreeType: string, HumidityMin: number, HumidityMax: number, TempMin: number, TempMax: number,
    UserId: string, BarCode: string): Promise<any> {
    const tree = await TreeModel.findOne({ "No": No })
    tree.TreeType = TreeType;
    tree.HumidityMin = HumidityMin;
    tree.HumidityMax = HumidityMax;
    tree.TempMin = TempMin;
    tree.TempMax = TempMax;
    tree.UserId = UserId;
    tree.BarCode = BarCode;
    await tree.save();
}

    static async GetsingelProduct(id: string): Promise<any> {
        const customer: IProduct = await Product.findOne({ "no": id })
        return customer;
    }

    static async GetSingleTrewWithBarcodes(BarCode: string): Promise<any> {
        const tree: ITreeModel = await TreeModel.findOne({ "BarCode": BarCode })
        return tree;
    }


    // Datalogger

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