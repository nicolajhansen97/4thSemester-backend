"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryption = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 5; // The number of hashing rounds
class Encryption {
    static createHash(orginalText) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.hash(orginalText, salt);
        });
    }
    static compareHash(clearText, encryptedText) {
        return __awaiter(this, void 0, void 0, function* () {
            if (bcrypt_1.default.compare(clearText, encryptedText)) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.Encryption = Encryption;
/*
routes.get('/encrypt', async (req, res) => {
    const salt:number = 17; // The number of hashing rounds
    const orginalText:string ="this text must be hidden";
    const encryptedText:string = await bcrypt.hash(orginalText, salt);

    console.log("Orginal: " + orginalText);
    console.log("Encrypted: " + encryptedText);

    if(await bcrypt.compare("this text must be hidden", encryptedText))
    {
    console.log('psw accepted');
    }else{
       console.log('pst now accepted')
    }
    res.status(200).json("done");
 })
 */ 
//# sourceMappingURL=Encryption.js.map