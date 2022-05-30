const headerkey:string = 'x-access-token';

class HTTPHeader{
     public static getToken(request:any):string{
        return request.headers[headerkey];
     }
     public static setToken(response:any,token:string):any{
        return response.setHeader(headerkey, token);
     }
}
export {HTTPHeader}