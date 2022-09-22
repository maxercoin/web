// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
 import bcrypt from 'bcrypt'
import connectDB from '../../../../backendUtils/db/connetMongo'
import admin from '../../../../backendUtils/model/adminModel';
import generateCookieResponses from '../../../../backendUtils/generatejwt';
 export default async function handler(req, res) {
    await connectDB()
    if(req.method?.toLocaleLowerCase() === "post"){
        try{

        const {userName,password,confirmPassword,email,firstName,lastName,authKey} = req.body;
        console.log(process.env.ADMIN_AUTH.trim())
        console.log(authKey)
        if(!userName || !password || !email || !firstName || !lastName || !authKey || !confirmPassword){ 
            res.status(401).send("PLease fill required fields!.")
        }else{
        if(authKey?.trim() !=  process.env.ADMIN_AUTH.trim()) res.status(401).send("You are not authorized.")
        if(!email?.includes("@") || !email?.includes(".") ) res.status(400).send("Your email must be in correct format.")
        if(confirmPassword != password) res.status(401).send("Please confirm entered password.")
        const adminExist = await admin.findOne({$or: [{ email }, { userName }]})
        if(adminExist){ 
            res.status(403).send("Admin already exist, kindly proceed to login")
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            try{
                const createAdmin = await admin.create({
                    userName,
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    activated:true,
                    role:'admin'
                    
                })
                if(createAdmin){
                    const id = createAdmin._id 
                    // res.status(200).send(`Kindly procced to your email to activate your account.`)
                    generateCookieResponses(200, res, id, 'admin');

                }else{
                    res.status(400).send("An error occured.")
                }  
                // res.status(200).send("ha oti sele o")
            }catch(e){
                res.status(400).send(e.message)
                console.log(e.message);
            }
        }
        }
        
    }catch(e){
        res.status(400).send("An error occured.")
    }
    }
 }