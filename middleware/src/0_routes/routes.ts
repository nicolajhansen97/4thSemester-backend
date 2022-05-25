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
import { LoginEndpoint } from '../1_endpoints/LoginEndpoint';
import { IBiddedProduct } from '../3_models/BiddedProducts';

import nodemailer from 'nodemailer';
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
routes.get('/api/products', async (req,res) => {
      const products:Promise<IProduct[]> = await Api.getProducts();
      return res.status(SuccessCode.OK).json(products);
});
// #2 getById
routes.get('/api/products/:uid', async (req,res) => {
         const product:Promise<IProduct> = await Api.GetsingelProduct(req.params.uid);
        return res.status(SuccessCode.OK).json(product);
});
// #3 insert record
routes.post('/api/products', async (req,res) => {
   try{
      const product = req.body;
      Api.insert(product.no, product.name, product.price, product.barCode);
      return res.status(SuccessCode.Created).json(product);
   } catch(e) {
      console.error('could not insert');
   }
})
// #4 update
routes.put('/api/products/:uid',async (req, res)=>{
   try{
      const product = req.body;
      console.log(product)
      Api.UpdateProduct(req.params.uid, product.name, product.price, product.barCode)
      return res.status(SuccessCode.OK).json("updated")
   }catch(e){
      console.error('could not update')
   }
})
// #5 delete
routes.delete('/api/products/:uid', async (req, res) =>{
   Api.DeleteProduct(req.params.uid);
   return res.status(SuccessCode.Created).json("Deleted")
}
)
/*       AUTHORIZATION DEMO     */
routes.get('/value', (req,res) => {

       // Just proving that the secret i accessable!!!
       const key = process.env.TOKEN_SECRET;
       console.log("The secret key was:" + key);

       const adminToken:string = AccessToken.generateToken(Role.admin);

       const decryptedAdminRole:Role = AccessToken.userRole(adminToken);

       const regularToken:string = AccessToken.generateToken(Role.regular);

       const decryptedRegularRole:Role = AccessToken.userRole(regularToken);

       return res.status(SuccessCode.OK).json({'done':'yes'});
});

routes.post('/api/logon', (req,res)=>{
   return LoginEndpoint.evaluate(req,res);
});

 routes.post('/api/register', async (req,res) =>{
   try{
      const user:IUser = req.body;
      const hasedPSW:string = await Encryption.createHash(user.password);
      console.log(hasedPSW);
      Api.Register(user.userName, hasedPSW, user.email, user.telephone);
      return res.status(SuccessCode.Created).json(user);
   }catch(e){
      console.error('post'+e);
   }
 })

 routes.get('/api/bid', async (req,res) =>{
   try{
     const time:Date = new Date();
     const BiddedProduct:IBiddedProduct = req.body;
     // Api.Bid();
     return res.status(SuccessCode.OK).json(time.getTime())
   }catch(e){
      console.error('post'+e);
   }
 })

 // route just for admins
 routes.get('/customers', (req,res) => {
   try{
      return AbstractEndpoint.produceResponse(SuccessCode.Created,Role.anonymous,Resource.customer, req,res);
   }catch{
      console.error('customer get');
   }
 });

 routes.get('/encrypt', async (req, res) => {
   const salt:number = 17; // The number of hashing rounds
   const orginalText:string ="this text must be hidden";
   const encryptedText:string = await bcrypt.hash(orginalText, salt);

   console.log("Orginal: " + orginalText);
   console.log("Encrypted: " + encryptedText);
   if (await bcrypt.compare("this text must be hidden", encryptedText)){
      console.log('psw accepted')
   }else{
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
routes.get('*', (req,res) =>{
   return res.status(404).send('no such route');
});

export {routes}
