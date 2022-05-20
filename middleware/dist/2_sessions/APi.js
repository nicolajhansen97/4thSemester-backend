"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const User_1 = require("../3_models/User");
const Product_1 = require("../3_models/Product");
const Encryption_1 = require("./Encryption");
class Api {
    static getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const customers = yield Product_1.Product.find({}, { _id: 0, __v: 0 });
            return customers;
        });
    }
    static insert(no, name, price, barCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new Product_1.Product({
                no,
                name,
                price,
                barCode
            });
            yield product.save();
            return true;
        });
    }
    static GetsingelProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield Product_1.Product.findOne({ "no": id });
            return customer;
        });
    }
    static UpdateProduct(id, name, price, barCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findOne({ "no": id });
            product.name = name;
            product.price = price;
            product.barCode = barCode;
            yield product.save();
        });
    }
    static DeleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Product_1.Product.deleteOne({ "no": id });
            return true;
        });
    }
    static Register(userName, password, email, telephone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userStatus = false;
                const user = new User_1.User({
                    userName,
                    password,
                    email,
                    telephone,
                    userStatus
                });
                yield user.save();
            }
            catch (e) {
                console.error('API register' + e);
            }
            return true;
        });
    }
    static Login(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ "userName": userName });
                if (yield Encryption_1.Encryption.compareHash(password, user.password)) {
                    return true;
                }
            }
            catch (e) {
                console.error('login ' + e);
            }
            return false;
        });
    }
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map