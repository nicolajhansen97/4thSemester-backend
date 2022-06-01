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
const Product_1 = require("../3_models/Product");
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
    // Delete a tree
    static DeleteTree(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TreeModel_1.TreeModel.deleteOne({ "No": id });
            return true;
        });
    }
    static UpdateTree(No, TreeType, HumidityMin, HumidityMax, TempMin, TempMax, UserId, BarCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const tree = yield TreeModel_1.TreeModel.findOne({ "No": No });
            tree.TreeType = TreeType;
            tree.HumidityMin = HumidityMin;
            tree.HumidityMax = HumidityMax;
            tree.TempMin = TempMin;
            tree.TempMax = TempMax;
            tree.UserId = UserId;
            tree.BarCode = BarCode;
            yield tree.save();
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
    static UpdateTree(no, TreeType, HumidityMin, HumidityMax, TempMin, TempMax, UserId, BarCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const tree = yield TreeModel_1.TreeModel.findOne({ "no": no });
            tree.TreeType = TreeType;
            yield tree.save();
        });
    }
    static DeleteTree(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TreeModel_1.TreeModel.deleteOne({ "no": id });
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
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map