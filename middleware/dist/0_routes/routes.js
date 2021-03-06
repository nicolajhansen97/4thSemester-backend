"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const SuccessCode_1 = require("../3_models/SuccessCode");
const DB_1 = require("../2_sessions/DB");
const Api_1 = require("../2_sessions/Api");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// const sendgridTransport = require('nodemailer-sendgrid-transport');
dotenv.config({ path: 'config/middleware.env' });
const routes = (0, express_1.default)();
exports.routes = routes;
routes.use((0, cors_1.default)());
routes.use(bodyParser.json());
routes.use(express_1.default.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });
routes.set('view engine', 'ejs'); // testing
routes.get('/test', (req, res) => {
    res.render('index');
}); // testing
/*
   The routes to using REST, just emmulating the data
*/
DB_1.DB.connect();
// #1 getAll
routes.get('/api/Trees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Api_1.Api.getTrees();
    return res.status(SuccessCode_1.SuccessCode.OK).json(products);
}));
// #2 getById
routes.get('/api/Trees/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Api_1.Api.GetsingelProduct(req.params.uid);
    return res.status(SuccessCode_1.SuccessCode.OK).json(product);
}));
// #3 insert record
routes.post('/api/Trees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get tree NO for autoincrement
        let max = 0;
        const allTrees = yield Api_1.Api.getTrees();
        for (const o of allTrees) {
            if (Number(o.No) > max) {
                max = Number(o.No);
            }
        }
        ;
        max++;
        const tree = req.body;
        Api_1.Api.insertTree(max.toString(), tree.TreeType, tree.HumidityMin, tree.HumidityMax, tree.TempMin, tree.TempMax, tree.UserId, tree.BarCode, tree.ImageSrc);
        return res.status(SuccessCode_1.SuccessCode.Created).json(tree);
    }
    catch (e) {
        console.error('could not insert');
    }
}));
// #4 update
routes.put('/api/Trees/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tree = req.body;
        console.log(tree);
        Api_1.Api.UpdateTree(req.params.uid, tree.TreeType, tree.HumidityMin, tree.HumidityMax, tree.TempMin, tree.TempMax, tree.UserId, tree.BarCode, tree.ImageSrc);
        return res.status(SuccessCode_1.SuccessCode.OK).json("updated");
    }
    catch (e) {
        console.error('could not update');
    }
}));
// delete
routes.delete('/api/Trees/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Api_1.Api.DeleteTree(req.params.uid);
    return res.status(SuccessCode_1.SuccessCode.Created).json("Deleted");
}));
// Measuerment
routes.get('/api/Measuerment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield Api_1.Api.getMeasurements();
    return res.status(SuccessCode_1.SuccessCode.OK).json(device);
}));
routes.post('/api/Measuerment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mes = req.body;
        Api_1.Api.insertMeasuerment(mes.Treeno, mes.BarCode, mes.MeasuermentID, mes.Humidity, mes.Temperature, mes.IsSoilWet, mes.DateOfMes = new Date());
        return res.status(SuccessCode_1.SuccessCode.Created).json(mes);
    }
    catch (e) {
        console.error('could not insert');
    }
}));
// DEVICE
// create
routes.post('/api/Device', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const device = req.body;
        Api_1.Api.insertDevice(device.BarCode, device.RaspberryVer, true);
        return res.status(SuccessCode_1.SuccessCode.Created).json(device);
    }
    catch (e) {
        console.error('could not insert');
    }
}));
// get
routes.get('/api/Device', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield Api_1.Api.getDevice();
    return res.status(SuccessCode_1.SuccessCode.OK).json(device);
}));
// delete
routes.delete('/api/Device/:ubarcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Api_1.Api.DeleteDevice(req.params.ubarcode);
    return res.status(SuccessCode_1.SuccessCode.Created).json("Deleted");
}));
// update
routes.put('/api/Device/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const device = req.body;
        console.log(device);
        Api_1.Api.UpdateDevice(req.params.uid, device.BarCode, device.RaspberryVer, device.Working, device.IsPaired);
        return res.status(SuccessCode_1.SuccessCode.OK).json("updated");
    }
    catch (e) {
        console.error('could not update');
    }
}));
// get with barcode
routes.get('/api/Device/:ubarcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device = yield Api_1.Api.GetDeviceWithBarcode(req.params.ubarcode);
    return res.status(SuccessCode_1.SuccessCode.Created).json(device);
}));
/*       AUTHORIZATION DEMO     */
routes.get('/encrypt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = 17; // The number of hashing rounds
    const orginalText = "this text must be hidden";
    const encryptedText = yield bcrypt_1.default.hash(orginalText, salt);
    console.log("Orginal: " + orginalText);
    console.log("Encrypted: " + encryptedText);
    if (yield bcrypt_1.default.compare("this text must be hidden", encryptedText)) {
        console.log('psw accepted');
    }
    else {
        console.log('psw not accepted');
    }
    res.status(200).json("done");
}));
routes.get('/sendmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const testAccount = yield nodemailer_1.default.createTestAccount();
    // Transporter object using SMTP transport
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.PASSWORD,
        },
    });
    // sending mail with defined transport object
    const info = yield transporter.sendMail({
        from: '"Bobby Bricks" <bricksbobby123@gmail.com>',
        to: "bricksbobby123@gmail.com",
        subject: "lololol",
        text: "Bla bla bla", // text body
        // html: "<p> some html </p>" // html in the body
    });
    console.log('sent message :', info.messageId);
    res.status(201).json('sent message');
}));
// the default (all other non-existing routes)
routes.get('*', (req, res) => {
    return res.status(404).send('no such route');
});
//# sourceMappingURL=routes.js.map