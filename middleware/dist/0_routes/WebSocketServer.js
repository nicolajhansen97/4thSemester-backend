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
exports.server = void 0;
// Importing the required modules
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const Api_1 = require("../2_sessions/Api");
const WebSocket = __importStar(require("ws"));
const WebSocketServer = (0, express_1.default)();
// initialize a simple http server
const server = http.createServer(WebSocketServer);
exports.server = server;
// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    // connection is up, let's add a simple simple event
    ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        // log the received message and send it back to the client
        // split the data in 3 by newline
        const test = message.split('\n');
        // for showing -> will delete later
        console.log(test);
        const option = test[0];
        const barcode = test[1];
        // check if mesuarment or warning or Want data.
        if (option === "M") {
            // convert value1 to boolean
            const wet = test[2] === "true" ? true : false;
            // convert the humidity and temp to floats
            const Hum = parseFloat(test[3].replace(/^\D+/g, ''));
            const temp = parseFloat(test[4].replace(/^\D+/g, ''));
            // for showing -> will delete later
            console.log(barcode);
            console.log(wet);
            console.log(Hum);
            console.log(temp);
            // get treeNo
            const treeNo = yield Api_1.Api.GetSingleTrewWithBarcodes(barcode);
            // measuermentID
            let MeasuermentIDs = 0;
            const MeasuermentsD = yield Api_1.Api.getMeasurements();
            MeasuermentsD.forEach(() => {
                MeasuermentIDs++;
            });
            // send data to database
            Api_1.Api.insertMeasuerment(treeNo.No, barcode, MeasuermentIDs + "", Hum, temp, wet, new Date());
        }
        else if (option === "W") {
            const WarningData = test[2];
            console.log("Warning: " + WarningData);
            switch (WarningData) {
                case "ack":
                    ws.send("ack");
                    break;
                case "bad":
                    ws.send("bad");
                    break;
                default:
                    break;
            }
        }
        else if (option === "D") {
            console.log("Data wanted");
            const DataWanted = test[2];
            if (DataWanted === "T") {
                const tree = yield Api_1.Api.GetSingleTrewWithBarcodes(barcode);
                ws.send(JSON.stringify(tree));
            }
        }
        // send back that you got the data.
        // ws.send(`Hello, you sent -> ${message}`);
    }));
    // send immediatly a feedback to the incoming connection
    // ws.send('Hi there, I am a WebSocket server');
});
//# sourceMappingURL=WebSocketServer.js.map