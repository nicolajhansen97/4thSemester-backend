// Importing the required modules
import express from 'express';
import * as http from 'http';
import { Api } from '../2_sessions/Api';
import * as WebSocket from 'ws';

const WebSocketServer = express();

// initialize a simple http server
const server = http.createServer(WebSocketServer);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    // connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        // log the received message and send it back to the client
        //split the data in 3 by newline
        const test = message.split('\n', 3)
        console.log(test)
        // convert value1 to boolean
        const wet = test[0] === "true" ? true : false;
        //convert the humidity and temp to floats
        const Hum = parseFloat(test[1].replace( /^\D+/g, ''))
        const temp = parseFloat(test[2].replace( /^\D+/g, ''))

        console.log(wet)
        console.log(Hum)
        console.log(temp)
        
        //send data to database
        Api.insertMeasuerment("","","", Hum, temp, wet, new Date());
        // send back that you got the data.
        ws.send(`Hello, you sent -> ${message}`);

    });

    // send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

export {server}