import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { SuccessCode } from '../3_models/SuccessCode';
import { DB } from '../2_sessions/DB';
import { IProduct } from '../3_models/Product';
import { Api } from '../2_sessions/Api';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { IDataLogger } from '../3_models/DataLogger';
import { IMeasuerments } from '../3_models/Measuerment';
import { IWarningData } from '../3_models/WarningData';
import { ITest, Test } from '../3_models/test';
// const sendgridTransport = require('nodemailer-sendgrid-transport');
import multer from 'multer'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(bodyParser.json());
//routes.use(express.static('public'));
routes.use(express.static('uploads'))
const urlencode = bodyParser.urlencoded({ extended: true });

routes.set('view engine', 'ejs') // testing

const multerStorage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads/')
   },

   filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
   }
});

const fileFilter = (req: any, file: any, cb: any) => {
   if (file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png") {

      cb(null, true);
   } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
   }
}

const upload = multer({ storage: multerStorage, fileFilter: fileFilter })

DB.connect();

routes.post('/lol', upload.array('images', 5), async (req, res, next) => {
   let newProduct = new Test({
      name: req.body.name,
      price: req.body.price,
      images: req.files
   }); await newProduct.save();
   res.send(newProduct);
});

routes.get('/lol', async (req, res) => {
   const d = await Api.getTest();
   res.render('index');
});

/*routes.post('/upload', upload.single('file'), async (req, res, next) => {
   //const body = req.file;
   //const base64Data = Buffer.from(JSON.stringify(body),"base64") //new Buffer(JSON.stringify(body)).toString("base64");
   //const s = await Api.insertTest(base64Data) 
   return res.status(SuccessCode.Created).json("")
});*/

/*routes.get('/upload', async (req, res) => {
   const test: Promise<ITest[]> = await Api.getTest()
   console.log(test)
   //res.render('index', { items: test});
});*/

routes.get('/tests', async (req, res) => {
   const test: Promise<ITest[]> = await Api.getTest()
   return res.status(SuccessCode.OK).json(test);
})
// #1 getAll trees
routes.get('/api/Trees', async (req, res) => {
   const products: Promise<IProduct[]> = await Api.getTrees();
   return res.status(SuccessCode.OK).json(products);
});
// #2 getById trees
routes.get('/api/Trees/:uid', async (req, res) => {
   const product: Promise<IProduct> = await Api.GetsingelProduct(req.params.uid);
   return res.status(SuccessCode.OK).json(product);
});
// #3 insert record
routes.post('/api/Trees', upload.single('file'), async (req, res, next) => {
   try {
      // Get tree NO for autoincrement
      let max = 0;
      const allTrees = await Api.getTrees()
      for (const o of allTrees) {
         if (Number(o.No) > max) {
            max = Number(o.No);
         }
      };
      max++;
      const tree = req.body;
      //const body = req.file;
      //console.log(JSON.stringify(body))
      //const base64Data = Buffer.from(JSON.stringify(body))
      //console.log(base64Data)
      Api.insertTree(
         max.toString(),
         tree.TreeType,
         tree.HumidityMin,
         tree.HumidityMax,
         tree.TempMin,
         tree.TempMax,
         tree.UserId,
         tree.BarCode,
         tree.Image
      );
      return res.status(SuccessCode.Created).json(tree);
   } catch (e) {
      console.error('could not insert' + e);
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
         tree.BarCode,
         tree.ImageSrc
      )
      return res.status(SuccessCode.OK).json("updated")
   } catch (e) {
      console.error('could not update')
   }
})

// delete
routes.delete('/api/Trees/:uid', async (req, res) => {
   Api.DeleteTree(req.params.uid);
   return res.status(SuccessCode.Created).json("Deleted")
})



// Measuerment

routes.get('/api/Measuerment', async (req, res) => {
   const device: Promise<IMeasuerments[]> = await Api.getMeasurements();
   return res.status(SuccessCode.OK).json(device);
});

routes.post('/api/Measuerment', async (req, res) => {
   try {
      const mes = req.body;
      Api.insertMeasuerment(
         mes.Treeno,
         mes.BarCode,
         mes.MeasuermentID,
         mes.Humidity,
         mes.Temperature,
         mes.IsSoilWet,
         mes.DateOfMes = new Date()
      );
      return res.status(SuccessCode.Created).json(mes);
   } catch (e) {
      console.error('could not insert');
   }
})

// DEVICE
// create
routes.post('/api/Device', async (req, res) => {
   try {
      const device = req.body;
      Api.insertDevice(
         device.BarCode,
         device.RaspberryVer,
         true,// device.Working
      );
      return res.status(SuccessCode.Created).json(device);
   } catch (e) {
      console.error('could not insert');
   }
})
// get
routes.get('/api/Device', async (req, res) => {
   const device: Promise<IDataLogger[]> = await Api.getDevice();
   return res.status(SuccessCode.OK).json(device);
});
// delete
routes.delete('/api/Device/:ubarcode', async (req, res) => {
   Api.DeleteDevice(req.params.ubarcode);
   return res.status(SuccessCode.Created).json("Deleted")
})
// update
routes.put('/api/Device/:uid', async (req, res) => {
   try {
      const device = req.body;
      console.log(device)
      Api.UpdateDevice(
         req.params.uid,
         device.BarCode,
         device.RaspberryVer,
         device.Working
      )
      return res.status(SuccessCode.OK).json("updated")
   } catch (e) {
      console.error('could not update')
   }
})
// get with barcode
routes.get('/api/Device/:ubarcode', async (req, res) => {
   const device: Promise<IDataLogger> = await Api.GetDeviceWithBarcode(req.params.ubarcode);
   return res.status(SuccessCode.Created).json(device)
})

// get warning
routes.get('/api/Warning', async (req, res) => {
   const warning: Promise<IWarningData[]> = await Api.getWarnings()
   return res.status(SuccessCode.OK).json(warning);
});
//update Warning
routes.put('/api/Warning/:uid', async (req, res) => {
   try {
      const warning = req.body;
      console.log(warning)
      Api.UpdateWarning(
         req.params.uid,
         warning.BarCode,
         warning.Warning,
         warning.IsHandled
      )
      return res.status(SuccessCode.OK).json("updated")
   } catch (e) {
      console.error('could not update')
   }
})

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
function getProfilePic(name: void) {
   throw new Error('Function not implemented.');
}

