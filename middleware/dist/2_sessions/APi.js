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
const TreeModel_1 = require("../3_models/TreeModel");
const Measuerment_1 = require("../3_models/Measuerment");
class Api {
    // Tree Crud
    static getTrees() {
        return __awaiter(this, void 0, void 0, function* () {
            const Trees = yield TreeModel_1.TreeModel.find({}, { _id: 0, __v: 0 });
            return Trees;
        });
    }
    static insertTree(TreeType, HumidityMin, HumidityMax, TempMin, TempMax, UserId, BarCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const tree = new TreeModel_1.TreeModel({
                No: "1",
                TreeType,
                HumidityMin,
                HumidityMax,
                TempMin,
                TempMax,
                UserId,
                BarCode
            });
            yield tree.save();
            return true;
        });
    }
    static GetsingelProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield Product_1.Product.findOne({ "no": id });
            return customer;
        });
    }
    static GetSingleTrewWithBarcodes(BarCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const tree = yield TreeModel_1.TreeModel.findOne({ "BarCode": BarCode });
            return tree;
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
    // Datalogger
    // Measuerments
    static getMeasurements() {
        return __awaiter(this, void 0, void 0, function* () {
            const measurement = yield Measuerment_1.Measuerments.find({}, { _id: 0, __v: 0 });
            return measurement;
        });
    }
    static insertMeasuerment(Treeno, Barcode, MeasuermentID, Humidity, Temperature, IsSoilWet, DateOfMes) {
        return __awaiter(this, void 0, void 0, function* () {
            const measurment = new Measuerment_1.Measuerments({
                Treeno,
                Barcode,
                MeasuermentID,
                Humidity,
                Temperature,
                IsSoilWet,
                DateOfMes
            });
            yield measurment.save();
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