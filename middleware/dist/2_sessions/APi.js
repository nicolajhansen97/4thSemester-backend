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
const TreeModel_1 = require("../3_models/TreeModel");
const Measuerment_1 = require("../3_models/Measuerment");
const DataLogger_1 = require("../3_models/DataLogger");
class Api {
    // Tree Crud
    static getTrees() {
        return __awaiter(this, void 0, void 0, function* () {
            const Trees = yield TreeModel_1.TreeModel.find({}, { _id: 0, __v: 0 });
            return Trees;
        });
    }
    static insertTree(No, TreeType, HumidityMin, HumidityMax, TempMin, TempMax, UserId, BarCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const tree = new TreeModel_1.TreeModel({
                No,
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
            const customer = yield TreeModel_1.TreeModel.findOne({ "No": id });
            return customer;
        });
    }
    static GetSingleTrewWithBarcodes(BarCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const tree = yield TreeModel_1.TreeModel.findOne({ "BarCode": BarCode });
            return tree;
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
    // Delete a tree
    static DeleteTree(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TreeModel_1.TreeModel.deleteOne({ "No": id });
            return true;
        });
    }
    // Datalogger
    static getDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield DataLogger_1.DataLogger.find({}, { _id: 0, __v: 0 });
            return device;
        });
    }
    static UpdateDevice(No, BarCode, RaspberryVer, Working, IsPaired) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield DataLogger_1.DataLogger.findOne({ "BarCode": No });
            device.BarCode = BarCode,
                device.RaspberryVer = RaspberryVer,
                device.Working = Working,
                device.IsPaired = IsPaired;
            yield device.save();
        });
    }
    static insertDevice(BarCode, RaspberryVer, Working) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = new DataLogger_1.DataLogger({
                BarCode,
                RaspberryVer,
                Working,
                IsPaired: false
            });
            yield device.save();
            return true;
        });
    }
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