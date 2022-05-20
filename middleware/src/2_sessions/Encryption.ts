import bcrypt from 'bcrypt';


const salt:number = 5; // The number of hashing rounds

class Encryption {

static async createHash(orginalText:string):Promise<any>{

    return bcrypt.hash(orginalText, salt);
}

static async compareHash(clearText:string, encryptedText:string):Promise<boolean> {
    if(bcrypt.compare(clearText, encryptedText))
    {
        return true;
    }else{
        return false;
    }

}
}

export {Encryption}

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