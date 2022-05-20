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
const AccessToken_1 = require("../2_sessions/AccessToken");
const Role_1 = require("../3_models/Role");
const AbstractEndpoint_1 = require("../1_endpoints/AbstractEndpoint");
const SuccessCode_1 = require("../3_models/SuccessCode");
const Resource_1 = require("../3_models/Resource");
const DB_1 = require("../2_sessions/DB");
const Api_1 = require("../2_sessions/Api");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Encryption_1 = require("../2_sessions/Encryption");
const LoginEndpoint_1 = require("../1_endpoints/LoginEndpoint");
const nodemailer_1 = __importDefault(require("nodemailer"));
// const sendgridTransport = require('nodemailer-sendgrid-transport');
dotenv.config({ path: 'config/middleware.env' });
const routes = (0, express_1.default)();
exports.routes = routes;
routes.use((0, cors_1.default)());
routes.use(bodyParser.json());
routes.use(express_1.default.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });
/*
   The routes to using REST, just emmulating the data
*/
DB_1.DB.connect();
// #1 getAll
routes.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const data=Array();
    //  data.push({'no':33,'name':'coffee','price':45});
    //   data.push({'no':45,'name':'milk','price':12});
    //  return res.status(200).json(data);
    const products = yield Api_1.Api.getProducts();
    return res.status(SuccessCode_1.SuccessCode.OK).json(products);
}));
// #2 getById
routes.get('/api/products/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const data1={'no':78,'name':'sugar','price':37};
    // const data2={'no':79,'name':'flour','price':31};
    // if (req.params.uid==='5')
    //  return res.status(200).json(data1);
    // else if (req.params.uid==='6')
    //  return res.status(200).json(data2);
    const product = yield Api_1.Api.GetsingelProduct(req.params.uid);
    return res.status(SuccessCode_1.SuccessCode.OK).json(product);
}));
// #3 insert record
routes.post('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        Api_1.Api.insert(product.no, product.name, product.price, product.barCode);
        return res.status(SuccessCode_1.SuccessCode.Created).json(product);
    }
    catch (e) {
        console.error('could not insert');
    }
}));
// #4 update
routes.put('/api/products/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        console.log(product);
        Api_1.Api.UpdateProduct(req.params.uid, product.name, product.price, product.barCode);
        return res.status(SuccessCode_1.SuccessCode.OK).json("updated");
    }
    catch (e) {
        console.error('could not update');
    }
}));
// #5 delete
routes.delete('/api/products/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Api_1.Api.DeleteProduct(req.params.uid);
    return res.status(SuccessCode_1.SuccessCode.Created).json("Deleted");
}));
/*       AUTHORIZATION DEMO     */
routes.get('/value', (req, res) => {
    // Just proving that the secret i accessable!!!
    const key = process.env.TOKEN_SECRET;
    console.log("The secret key was:" + key);
    const adminToken = AccessToken_1.AccessToken.generateToken(Role_1.Role.admin);
    const decryptedAdminRole = AccessToken_1.AccessToken.userRole(adminToken);
    const regularToken = AccessToken_1.AccessToken.generateToken(Role_1.Role.regular);
    const decryptedRegularRole = AccessToken_1.AccessToken.userRole(regularToken);
    return res.status(SuccessCode_1.SuccessCode.OK).json({ 'done': 'yes' });
});
routes.post('/api/logon', (req, res) => {
    return LoginEndpoint_1.LoginEndpoint.evaluate(req, res);
});
routes.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const hasedPSW = yield Encryption_1.Encryption.createHash(user.password);
        console.log(hasedPSW);
        Api_1.Api.Register(user.userName, hasedPSW, user.email, user.telephone);
        return res.status(SuccessCode_1.SuccessCode.Created).json(user);
    }
    catch (e) {
        console.error('post' + e);
    }
}));
routes.get('/api/bid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const time = new Date();
        const BiddedProduct = req.body;
        // Api.Bid();
        return res.status(SuccessCode_1.SuccessCode.OK).json(time.getTime());
    }
    catch (e) {
        console.error('post' + e);
    }
}));
// route just for admins
routes.get('/customers', (req, res) => {
    try {
        return AbstractEndpoint_1.AbstractEndpoint.produceResponse(SuccessCode_1.SuccessCode.Created, Role_1.Role.anonymous, Resource_1.Resource.customer, req, res);
    }
    catch (_a) {
        console.error('customer get');
    }
});
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