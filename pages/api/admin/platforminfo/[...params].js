import user from "../../../../backendUtils/model/model";
import connectDB from "../../../../backendUtils/db/connetMongo";
import admin from '../../../../backendUtils/model/adminModel';
import buypackageModel from "../../../../backendUtils/model/buypackageModel";
import JWT from 'jsonwebtoken'
import { result } from "lodash";
export default async function handler(req,res){
    await connectDB()
    const param = req.query.params;
    // console.log(param);
    // res.status(200).json(param)
    if(param[0] === 'totalusers'){
      const userscount = await  user.countDocuments({})
        if(userscount){
            res.status(200).send(userscount)
        }else{
            res.status(400).send('An error occurred.')
        }
    }
    if(param[0] === 'getprofile' && req.method.toLowerCase() === 'get'){
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                    const {userName,firstName,lastName,email} = authorizer;
                   res.status(200).json({userName,firstName,lastName,email})
                }else{

                    res.status(403).send("Failed! You are not authorized to perform this action.");
                }
            }catch(e){
                res.status(400).send(e.message);
            }
        }else{
            res.status(403).send("Kindly provide a valid Authorization header");
        }
    }
    if(param[0] === 'getallbalances' && req.method.toLowerCase() === 'get'){
        try{
            const total = await buypackageModel.aggregate(
                [
                   {
                    $unwind:"$packages"
                }
                ,{$group:{_id:"$packages.status",total:{$sum:"$packages.Balance"}}},
                
                ]
            );
            res.status(200).json(total)
        }catch(e){
            res.status(400).send("An error occured")
        }
    }
}