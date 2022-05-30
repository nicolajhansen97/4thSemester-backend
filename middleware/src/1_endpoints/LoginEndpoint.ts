import { Request, Response } from "express";
import { FailureCode } from "../3_models/FailureCode";
import { Api } from "../2_sessions/Api";
import { SuccessCode } from "../3_models/SuccessCode";
import { IUser } from "../3_models/User";

class LoginEndpoint{
    static async evaluate(request:Request, response:Response) {
        try{
            const user:IUser = request.body;
            const isAuthorized:boolean = await Api.Login(user.userName,user.password);
            if(isAuthorized){
              console.log("Logged IN")
               return response.status(SuccessCode.OK).json("authorized");
            }else{
              console.log("Not Logged IN")
              return response.status(FailureCode.Unauthorized).json("Unauthorized");
            }
         } catch(e){
           console.error(e);
         }
       }
    }

export {LoginEndpoint}