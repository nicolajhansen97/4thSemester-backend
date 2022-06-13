import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { SuccessCode } from '../3_models/SuccessCode';
import { DB } from '../2_sessions/DB';
import { Api } from '../2_sessions/Api';
import { IDataLogger } from '../3_models/DataLogger';
import { IMeasuerments } from '../3_models/Measuerment';
import { IWarningData } from '../3_models/WarningData';
import { ITest, Test } from '../3_models/test';
import multer from 'multer'
import { ITreeModel } from '../3_models/TreeModel';

dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(bodyParser.json());
//routes.use(express.static('public'));
routes.use(express.static('uploads'))

DB.connect();

/* Image Setup Code for routes */
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

/* Image Testing Routes */

routes.post('/api/upload', upload.array('images', 5), async (req, res, next) => {
   let newProduct = new Test({
      name: req.body.name,
      price: req.body.price,
      images: req.files
   }); await newProduct.save();
   res.send(newProduct);
});

routes.get('/api/upload', async (req, res) => {
   const d = await Api.getTest();
   res.render('index');
});

routes.get('/api/upload2', async (req, res) => {
   const test: Promise<ITest[]> = await Api.getTest()
   return res.status(SuccessCode.OK).json(test);
})

/*       Tree Routes      */

//Get Trees
routes.get('/api/Trees', async (req, res) => {
   const products: Promise<ITreeModel[]> = await Api.getTrees();
   return res.status(SuccessCode.OK).json(products);
});
//Get Tree by id
routes.get('/api/Trees/:uid', async (req, res) => {
   const product: Promise<ITreeModel> = await Api.GetsingelTree(req.params.uid);
   return res.status(SuccessCode.OK).json(product);
});
//Create Tree
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
//Update Tree
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

//Delete Tree
routes.delete('/api/Trees/:uid', async (req, res) => {
   Api.DeleteTree(req.params.uid);
   return res.status(SuccessCode.Created).json("Deleted")
})

/*       Measuerment Routes      */

//Get Measuerments
routes.get('/api/Measuerment', async (req, res) => {
   const device: Promise<IMeasuerments[]> = await Api.getMeasurements();
   return res.status(SuccessCode.OK).json(device);
});
//Create Measuerments
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
/*       Device Routes      */

//Create Device
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
//Get Devices
routes.get('/api/Device', async (req, res) => {
   const device: Promise<IDataLogger[]> = await Api.getDevice();
   return res.status(SuccessCode.OK).json(device);
});
//Delete Device
routes.delete('/api/Device/:ubarcode', async (req, res) => {
   Api.DeleteDevice(req.params.ubarcode);
   return res.status(SuccessCode.Created).json("Deleted")
})
//Update Device
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
//Get Device with barcode
routes.get('/api/Device/:ubarcode', async (req, res) => {
   const device: Promise<IDataLogger> = await Api.GetDeviceWithBarcode(req.params.ubarcode);
   return res.status(SuccessCode.Created).json(device)
})

/*       WARNING Routes     */

//Get Warnings
routes.get('/api/Warning', async (req, res) => {
   const warning: Promise<IWarningData[]> = await Api.getWarnings()
   return res.status(SuccessCode.OK).json(warning);
});
//Update Warning
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

/* DEFUALT ROUTE */

// the default (all other non-existing routes)
routes.get('*', (req, res) => {
   return res.status(404).send('no such route');
});

export { routes }