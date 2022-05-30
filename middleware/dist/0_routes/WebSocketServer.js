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
    ws.on('message', (message) => {
        // log the received message and send it back to the client
        // save data if it is data
        // console.log('received: %s', m);
        const test = message.split('\n', 3);
        console.log(test);
        const wet = test[0] === "true" ? true : false;
        const Hum = parseFloat(test[1].replace(/^\D+/g, ''));
        const temp = parseFloat(test[2].replace(/^\D+/g, ''));
        console.log(wet);
        console.log(Hum);
        console.log(temp);
        Api_1.Api.insertMeasuerment("", "", "", Hum, temp, wet, new Date());
        // send back that you got the data.
        ws.send(`Hello, you sent -> ${message}`);
    });
    // send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});
//# sourceMappingURL=WebSocketServer.js.map