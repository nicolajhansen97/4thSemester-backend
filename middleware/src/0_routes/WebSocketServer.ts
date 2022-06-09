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
    ws.on('message', async (message: string) => {

        // log the received message and send it back to the client
        // split the data in 3 by newline
        const test = message.split('\n')

        // for showing -> will delete later
        console.log(test)

        const option = test[0]
        const barcode = test[1]

        // check if mesuarment or warning or Want data.
        if (option === "M") {
            // convert value1 to boolean
            const wet = test[2] === "true" ? true : false;
            // convert the humidity and temp to floats
            const Hum = parseFloat(test[3].replace(/^\D+/g, ''))
            const temp = parseFloat(test[4].replace(/^\D+/g, ''))

            // for showing -> will delete later
            console.log(barcode)
            console.log(wet)
            console.log(Hum)
            console.log(temp)

            // get treeNo
            const treeNo = await Api.GetSingleTrewWithBarcodes(barcode);

            // measuermentID
            let MeasuermentIDs = 0
            const MeasuermentsD = await Api.getMeasurements()
            MeasuermentsD.forEach(() => {
                MeasuermentIDs++
            });
            // send data to database
            Api.insertMeasuerment(treeNo.No, barcode, MeasuermentIDs + "", Hum, temp, wet, new Date());
        } else if (option === "W") {
            const WarningData = test[2]
            console.log("Warning: " + WarningData)

            switch (WarningData) {
                case "ack":
                    ws.send("ack")
                    break;
                case "deviceBroken":
                    ws.send("deviceBroken")
                    break;
                default:
                    ws.send("ack")
                    break;
            }
            //get higest number
            let max = 0;
            const allWarnings = await Api.getWarnings()
            for (const o of allWarnings) {
                if (Number(o.WarNo) > max) {
                    max = Number(o.WarNo);
                }
            };
            max++;
            //send warning to database
            Api.insertWarning(max.toString(), barcode, WarningData, false);

        } else if (option === "D") {
            console.log("Data wanted")

            const DataWanted = test[2]
            if (DataWanted === "T") {
                const tree = await Api.GetSingleTrewWithBarcodes(barcode);
                ws.send(JSON.stringify(tree))
            }
        }else if (option === "C"){
            console.log("Device Wanted")
            const device = await Api.GetDeviceWithBarcode(barcode)
            ws.send(JSON.stringify(device))
        }

        // send back that you got the data.
        // ws.send(`Hello, you sent -> ${message}`);

    });

    // send immediatly a feedback to the incoming connection
    // ws.send('Hi there, I am a WebSocket server');
});

export { server }