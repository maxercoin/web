// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
 import bcrypt from 'bcrypt'
 import JWT from 'jsonwebtoken'
import connectDB from '../../../../backendUtils/db/connetMongo'
import admin from '../../../../backendUtils/model/adminModel';
import faq from '../../../../backendUtils/model/faqsModel'
export default async function handler(req, res) {
    await connectDB();
    if(req.method?.toLocaleLowerCase() === "post"){
        try{

        const {title,content} = req.body;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            if(!title || !content) res.status(400).send("Please fill the required fields.")
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                   await faq.create({
                    title,content
                   })
                   res.status(200).send("FAQs updated!")
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

    
    if(req.method?.toLocaleLowerCase() === "delete"){
        try{

        const {faqid} = req.query;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                    const item = await faq.findById(faqid);
                    if(item){
                           await faq.deleteOne({_id:faqid})
                           res.status(200).send("FAQ Deleted!")
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
        const {faqid} = req.query;
        const {title,content} = req.body;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            
            try{
                const authtoken = authHeader.split(" ")[1]
                const decoded = JWT.verify(authtoken, process.env.JWT_SECRET);
                // console.log(decoded);
                const authorizer = await admin.findById(decoded.id);
                if(authorizer){
                    const item = await faq.findById(faqid);
                    if(item){
                        console.log({title,content})
                         const updatedfaq =  await faq.updateOne({_id:item._id},{$set:{title,content}})
                           res.status(200).json(updatedfaq);
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
            const returnedItems = await faq.find();
            const items = returnedItems.map((val)=>{
                const {title,content,_id} = val
                return {
                    title,
                    content,
                    _id
                }
            })
            res.status(200).json({items});
       }catch(e){
        res.status(400).send(e.message);
       }
    }
}