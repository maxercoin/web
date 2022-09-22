// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
import bcrypt from 'bcrypt'
import user from '../../../../../backendUtils/model/model';
import connectDB from '../../../../../backendUtils/db/connetMongo';
import { sendConfirmationEmail } from '../../../../../backendUtils/mailer/mail';
 export default async function handler(req, res) {
    try{
    await connectDB()
    if(req.method?.toLocaleLowerCase() === "get"){

        const {hash} = req.query;
        if(!hash) res.status(404).send("Nothing to verify");
        if(!(await user.findById(hash))) res.status(404).send("User does not exist");
        const updateUser = user.findByIdAndUpdate(
            hash,
            {
                $set:{activated:true}
            },
            (err,docs)=>{
                if(err) res.status(400).send(err);
                if(docs) res.status(200).send("Success!")
            }
            )
            console.log(updateUser)
        
    }
         
    }catch(err){
    res.status(400).send(err.message);    
}
}