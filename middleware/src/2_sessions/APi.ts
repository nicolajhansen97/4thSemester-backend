import { User } from '../3_models/User';
import { IUser } from '../3_models/User';
import { nodeModuleNameResolver } from 'typescript';
import { Product, IProduct } from '../3_models/Product';
import { Encryption } from './Encryption';
import { TreeModel, ITreeModel } from '../3_models/TreeModel';

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
            No:"2",
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

    static async GetsingelProduct(id: string): Promise<any> {
        const customer: IProduct = await Product.findOne({ "no": id })
        return customer;
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

    static async UpdateProduct(id: string, name: string, price: number, barCode: string): Promise<any> {
        const product = await Product.findOne({ "no": id })
        product.name = name;
        product.price = price;
        product.barCode = barCode;
        await product.save();
    }

    static async DeleteProduct(id: string): Promise<any> {
        await Product.deleteOne({ "no": id })
        return true
    }

    // Datalogger

    // Measuerments



    static async Register(userName: string, password: string, email: string, telephone: string): Promise<boolean> {
        try {
            const userStatus: boolean = false;
            const user: IUser = new User({
                userName,
                password,
                email,
                telephone,
                userStatus
            });
            await user.save();
        } catch (e) {
            console.error('API register' + e);
        }
        return true;
    }

    static async Login(userName: string, password: string): Promise<boolean> {
        try {
            const user: IUser = await User.findOne({ "userName": userName });
            if (await Encryption.compareHash(password, user.password)) {
                return true;
            }

        } catch (e) {
            console.error('login ' + e)
        }
        return false;
    }
    /*
    static async Bid():Promise<boolean>{
        try{
            return true;
        }catch(e){

        }
    }
    */
}
export { Api }