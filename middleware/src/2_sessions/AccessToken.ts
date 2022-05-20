import jsonwebtoken from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { Role } from '../3_models/Role';

const expiresIn:string = '2h';

const maxAttempts:number = 3;

class AccessToken{

   // (1) Create an ACCESS TOKEN (with JWT) containing the user ROLE
   static generateToken(role:Role):string{
      const token = jsonwebtoken.sign({'role':role}, process.env.TOKEN_SECRET, { expiresIn });
      console.log(token);
      return token;
   }

   // (2) Read the user role from the ACCESS TOKEN
   static userRole(token:string):Role{
      const decodedToken:any = jwtDecode(token);
      console.log(decodedToken.role);
      return decodedToken.role;
   }

   // (3) Create a new login token (with JWT) setting the attempt counter to 1
   static generateNewAttemptToken():string{
      const token = jsonwebtoken.sign({'counter':1},process.env.TOKEN_SECRET, {expiresIn});
      return token;
   }

   // (4) Evaluate the current number of attempts from the ACCESS TOKEN
   static canRetryLogin(token:string):boolean{
      const decodedToken:any = jwtDecode(token);
      const numberOfAttempts:number = decodedToken.counter;
      console.log("number of attempts "+ numberOfAttempts+ " max number of attempts "+maxAttempts)
      if (numberOfAttempts >= maxAttempts)
         return false;
      return true;
   }
   // (5)
   static updateNumberOfAttempts(token:string):string{
      const decodedToken:any = jwtDecode(token);
      let numberOfAttempts:number = decodedToken.counter;
      numberOfAttempts = numberOfAttempts +1;
      return jsonwebtoken.sign({'counter':numberOfAttempts}, process.env.TOKEN_SECRET, { expiresIn });
   }
}
export {AccessToken}