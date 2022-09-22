// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
 import bcrypt from 'bcrypt'
 import JWT from 'jsonwebtoken'
import connectDB from '../../../../backendUtils/db/connetMongo'
import admin from '../../../../backendUtils/model/adminModel';
import user from '../../../../backendUtils/model/model'
import buypackageModel from '../../../../backendUtils/model/buypackageModel'
import kyc from '../../../../backendUtils/model/kycModel'
import statuses from '../../../../backendUtils/statuses';
import kycstatus from '../../../../backendUtils/kycstatus';

export default async function handler(req,res){
    try{
        await connectDB()
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                     
                    if(req.method?.toLocaleLowerCase() === 'get'){
                        try{
                        const allkyc = await kyc.find({status:kycstatus[1]}).populate("owner");
                        if(allkyc.length > 0){
                            res.status(200).json(allkyc)
                        }else{
                            res.status(404).send('No KYC found')

                        }
                    }catch(e){
                        console.log(e)
                        res.status(400).send("An error occurred: " + e?.message)
                    }
                    }
                    if(req.method?.toLocaleLowerCase() === 'post'){
                        const {id} = req.body;
                        let userkyc = await kyc.findById(id);
                        if(userkyc){
                            const updateKyc = await kyc.updateOne({_id:id},{$set:{status:kycstatus[2]}})
                            res.status(200).send("Kyc updated successfully")
                        }else{
                            res.status(404).send('No KYC found')

                        }
                    }

                }else{

                    res.status(403).send("Failed! You are not authorized to perform this action.");
                }
            }catch(e){
                res.status(400).send(e.message);
            }

        }
        else{res.status(403).send("Kindly provide a valid Authorization header");}

        
        }catch(e){
            res.status(400).send(e.message)
        }
}