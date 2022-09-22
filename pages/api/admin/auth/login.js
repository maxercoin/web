// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
import bcrypt from 'bcrypt'
import connectDB from '../../../../backendUtils/db/connetMongo';
import admin from '../../../../backendUtils/model/adminModel';
import generateCookieResponses from '../../../../backendUtils/generatejwt';
export default async function handler(req, res) {
    try{
    await connectDB()
    if(req.method?.toLocaleLowerCase() === "post"){
        const {email,password} = req.body;
        if(!email || !password) res.status(400).send("Kindly fill the require fields.");
        const getAdmin = await admin.findOne({$or: [{ email }, { userName:email }]})
        if(getAdmin && (await  bcrypt.compare(password,getAdmin.password))){
        //    res.status(200).send("Authorized!")
           const id = getAdmin._id 
           generateCookieResponses(200, res, id, 'admin');
        }else{
            res.status(400).send("Incorrect Password or username")
        }
        
    }
}catch(e){
    console.log(e.message)
    res.status(400).send(e.message)
}
}  