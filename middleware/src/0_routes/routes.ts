import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AccessToken } from '../2_sessions/AccessToken';
import { Role } from '../3_models/Role';

import { AbstractEndpoint } from '../1_endpoints/AbstractEndpoint';
import { SuccessCode } from '../3_models/SuccessCode';
import { Resource } from '../3_models/Resource';
import { DB } from '../2_sessions/DB';
import { IProduct } from '../3_models/Product';
import { Api } from '../2_sessions/Api';
import bcrypt from 'bcrypt';
import { IUser } from '../3_models/User';
import { Encryption } from '../2_sessions/Encryption';
import { FailureCode } from '../3_models/FailureCode';
import { IBiddedProduct } from '../3_models/BiddedProducts';

import nodemailer from 'nodemailer';
import { IDataLogger } from '../3_models/DataLogger';
// const sendgridTransport = require('nodemailer-sendgrid-transport');

dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(bodyParser.json());
routes.use(express.static('public'));
const urlencode = bodyParser.urlencoded({ extended: true });

/*
   The routes to using REST, just emmulating the data
*/
DB.connect();

// #1 getAll
routes.get('/api/Trees', async (req, res) => {
   const products: Promise<IProduct[]> = await Api.getTrees();
   return res.status(SuccessCode.OK).json(products);
});
// #2 getById
routes.get('/api/Trees/:uid', async (req, res) => {
   const product: Promise<IProduct> = await Api.GetsingelProduct(req.params.uid);
   return res.status(SuccessCode.OK).json(product);
});
// #3 insert record
routes.post('/api/Trees', async (req, res) => {
   try {
      const tree = req.body;
      Api.insertTree(
         tree.TreeType,
         tree.HumidityMin,
         tree.HumidityMax,
         tree.TempMin,
         tree.TempMax,
         tree.UserId,
         tree.BarCode
      );
      return res.status(SuccessCode.Created).json(tree);
   } catch (e) {
      console.error('could not insert');
   }
})
// #4 update
routes.put('/api/Trees/:uid', async (req, res) => {
   try {
      const tree = req.body;
      console.log(tree)
      Api.UpdateTree(
         req.params.uid,
         tree.TreeType,
         tree.HumidityMin,
         tree.HumidityMax,
         tree.TempMin,
         tree.TempMax,
         tree.UserId,
         tree.BarCode
         )
      return res.status(SuccessCode.OK).json("updated")
   } catch (e) {
      console.error('could not update')
   }
})
// #5 delete
routes.delete('/api/Trees/:uid', async (req, res) => {
   Api.DeleteTree(req.params.uid);
   return res.status(SuccessCode.Created).json("Deleted")
}
)

routes.post('/api/Device', async (req, res) => {
   try {
      const device = req.body;
      Api.insertDevice(
         device.BarCode,
         "1",// device.RaspberryVer,
         true,// device.Working
      );
      return res.status(SuccessCode.Created).json(device);
   } catch (e) {
      console.error('could not insert');
   }
})

routes.get('/api/Device', async (req, res) => {
   const device: Promise<IDataLogger[]> = await Api.getDevice();
   return res.status(SuccessCode.OK).json(device);
});


/*       AUTHORIZATION DEMO     */

routes.get('/encrypt', async (req, res) => {
   const salt: number = 17; // The number of hashing rounds
   const orginalText: string = "this text must be hidden";
   const encryptedText: string = await bcrypt.hash(orginalText, salt);

   console.log("Orginal: " + orginalText);
   console.log("Encrypted: " + encryptedText);
   if (await bcrypt.compare("this text must be hidden", encryptedText)) {
      console.log('psw accepted')
   } else {
      console.log('psw not accepted')
   }
   res.status(200).json("done")
})


routes.get('/sendmail', async (req, res) => {
   const testAccount = await nodemailer.createTestAccount();

   // Transporter object using SMTP transport
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: process.env.GMAIL_USER,
         pass: process.env.PASSWORD,
      },
   });

   // sending mail with defined transport object
   const info = await transporter.sendMail({
      from: '"Bobby Bricks" <bricksbobby123@gmail.com>', // sender address
      to: "bricksbobby123@gmail.com", //
      subject: "lololol", // subject line
      text: "Bla bla bla", // text body
      // html: "<p> some html </p>" // html in the body
   });

   console.log('sent message :', info.messageId);
   res.status(201).json('sent message');
});


// the default (all other non-existing routes)
routes.get('*', (req, res) => {
   return res.status(404).send('no such route');
});

export { routes }
