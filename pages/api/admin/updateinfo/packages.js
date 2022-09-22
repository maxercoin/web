// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import connectDB from '../../../../backendUtils/db/connetMongo'
import admin from '../../../../backendUtils/model/adminModel';
import packageModel from '../../../../backendUtils/model/packageModel'
import { calcBNBPrice,calcETHPrice } from '../../../../backendUtils/wallet/functions';
export default async function handler(req, res) {
    await connectDB();
    if(req.method?.toLocaleLowerCase() === "post"){
        try{

        const {Name,Amount,roi,yieldPeriod,primarycolor,textsColor} = req.body;
       
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            if(!Name || !Amount || !roi || !yieldPeriod){
                res.status(400).send("Please fill the required fields.")
            }else{
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                  const packageCreated = await packageModel.create({
                    Name,Amount,roi,yieldPeriod,primarycolor,textsColor
                   })
                   console.log(packageCreated)
                   res.status(200).json(packageCreated);
                
                }else{

                    res.status(200).send("Failed! You are not authorized to perform this action.");
                }
            }catch(e){
                res.status(400).send(e.message);
            }

        }
    }
        else{res.status(403).send("Kindly provide a valid Authorization header");}

        
        }catch(e){
            res.status(400).send(e.message)
        }

    }

    
    if(req.method?.toLocaleLowerCase() === "delete"){
        try{

        const {packageid} = req.query;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                    const item = await packageModel.findById(packageid);
                    if(item){
                           await packageModel.deleteOne({_id:packageid})
                           res.status(200).send("Package Deleted!")
                    }
                }else{

                    res.status(200).send("Failed! You are not authorized to perform this action.");
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

    if(req.method?.toLocaleLowerCase() === "patch"){
        try{
        const {packageid} = req.query;
        const {Name,Amount,roi,yieldPeriod,primarycolor,textsColor} = req.body;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                    const item = await packageModel.findById(packageid);
                    if(item){
                           await packageModel.updateOne({_id:packageid},{$set:{
                            Name,Amount,roi,yieldPeriod,primarycolor,textsColor
                           }})
                           res.status(200).send("Package Updated!")
                    }
                }else{

                    res.status(200).send("Failed! You are not authorized to perform this action.");
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

    if(req.method?.toLocaleLowerCase() === "get"){
       try{
            const bnbprice = await calcBNBPrice()
            const ethprice = await calcETHPrice()
            const returnedItems = await packageModel.find();
            const items = returnedItems.map((val)=>{
                let {
                    Name,Amount,roi,yieldPeriod,primarycolor,textsColor,_id
                   } = val
                   const bnbworth =(parseFloat(Amount) / parseFloat(bnbprice)).toFixed(5)
                   const ethworth =(parseFloat(Amount) / parseFloat(ethprice)).toFixed(5)
                   yieldPeriod = yieldPeriod/(1000*60*60 * 24)
                return{
                    Name,Amount,roi,yieldPeriod,primarycolor,textsColor,_id,bnbworth,ethworth
                   }
            })
            res.status(200).json({items});
       }catch(e){
        res.status(400).send(e.message);
       }
    }
}