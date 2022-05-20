import { User } from '../3_models/User';
import { IUser } from '../3_models/User';
import { nodeModuleNameResolver } from 'typescript';
import { Product, IProduct } from '../3_models/Product';
import { Encryption } from './Encryption';

class Api {
    static async getProducts():Promise<any>{
        const customers: IProduct[] = await Product.find({},{_id:0,__v:0});
        return customers;
    }

    static async insert(no:string,name:string, price:number, barCode:string):Promise<boolean>{
        const product: IProduct = new Product({
            no,
            name,
            price,
            barCode
        });
        await product.save();
        return true;
    }

    static async GetsingelProduct(id:string):Promise<any>{
        const customer: IProduct = await Product.findOne({"no":id})
        return customer;
    }

    static async UpdateProduct(id:string, name:string, price:number, barCode:string):Promise<any>{
        const product = await Product.findOne({"no":id})
        product.name = name;
        product.price = price;
        product.barCode = barCode;
        await product.save();
    }

    static async DeleteProduct(id: string):Promise<any>{
        await Product.deleteOne({"no":id})
        return true
    }

    static async Register(userName:string,password:string, email:string, telephone:string):Promise<boolean>{
        try{
        const userStatus:boolean = false;
        const user: IUser = new User({
            userName,
            password,
            email,
            telephone,
            userStatus
        });
        await user.save();
    }catch(e){
        console.error('API register'+e);
    }
        return true;
    }

    static async Login(userName:string, password:string):Promise<boolean>{
        try{
            const user: IUser = await User.findOne({"userName":userName});
            if (await Encryption.compareHash(password, user.password)){
                return true;
            }

        }catch(e){
            console.error('login '+e)
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
export {Api}