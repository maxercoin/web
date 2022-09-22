// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
 import VerifyJwtAuth from "../../../../backendUtils/jwtauthverify";
 import bcrypt from 'bcrypt'
import connectDB from '../../../../backendUtils/db/connetMongo';
import user from "../../../../backendUtils/model/model";
import buypackageModel from "../../../../backendUtils/model/buypackageModel";
import { encryptPrivateKey,deecrtyptAccountPrivateKey,getTransactionHistory,sendtoken,getAllBalances } from "../../../../backendUtils/wallet/functions";
export default async function handler(req,res){
    await connectDB()
    const param = req.query.params;
    if(param[0] === 'updatepassword'){
        const userid = VerifyJwtAuth(req.headers)
        if(!userid) {
            res.status(401).send("Not authorized")
        }else{
        if(req.body){
            const {initialpassword,newPassword} = req.body;
            if(!newPassword || !initialpassword) {
                res.status(400).send("Please enter passwords");
            }
            const owner = await user.findById(userid)
            if(!owner) {
                res.status(404).send("User does not exist")
            }else{
                try{
                const bcryptVerification = await bcrypt.compare(initialpassword,owner.password);
                    const newPasswordHash = await bcrypt.hash(newPassword, 10);
                    const updateUserPassword = await user.updateOne({_id:owner._id},{$set:{password:newPasswordHash}})
                    res.status(200).json({updateUserPassword,messsage:"Password updated successfully."})   
            }catch(err){
                console.log(err.message)
                    res.status(400).send('An error occurred while updating the password, try again later.')
            }
        }
            
        }else{
            res.status(403).send("Body must be present!")
        }
    }
    }
    if(param[0] === 'getusertransactionhistory'){
        const {user_id} = req.body;
        if(!user_id)res.status(400).send("User id absent");
        const userdata = await buypackageModel.findOne({ownerid: user_id});
        if(userdata){
            const usertxHist = userdata.history
            res.status(200).json(usertxHist)
        }else{
            res.status(400).send("There no transaction record for this user.")
        }
    }
    if(param[0] === 'getuserpackages'){
        const {user_id} = req.body;
        // console.log({user_id})
        if(!user_id)res.status(400).send("User id absent");
        const userdata = await buypackageModel.findOne({ownerid: user_id});
        if(userdata){
            const userpackages = userdata.packages
            res.status(200).json(userpackages)
        }else{
            res.status(400).send("There no transaction record for this user.")
        }
    }
    if(param[0] === 'getuserpackageBalances'){
        const {user_id} = req.query;
        // console.log({user_id})
        if(!user_id)res.status(400).send("User id absent");
        const userdata = await buypackageModel.findOne({ownerid: user_id});
        if(userdata){
            const {Balance} = userdata
            res.status(200).json(Balance)
        }else{
            res.status(400).send("There no transaction record for this user.")
        }
    }
    if(param[0] === 'getusertransactionprofile'){
        const {user_id} = req.body;
        if(!user_id)res.status(400).send("User id absent");
        const userdata= await buypackageModel.findOne({ownerid: user_id});
        if(userdata){
            const {ownerid,ownerUserName,packagesBought,Balance,roi,profit,investments,historyTxIds} = userdata
            const usertxprofile = {ownerid,ownerUserName,packagesBought,Balance,roi,profit,investments,historyTxIds}
            res.status(200).json(usertxprofile)
        }else{
            res.status(400).send("There no transaction record for this user.")
        }
    }
    if(param[0] === 'getuserprofile'){
        const {user_id} = req.query;
        if(!user_id)res.status(400).send("User id absent");
        const userdata= await user.findOne({_id: user_id});
        if(userdata){
            const {userName,referrer,firstName,lastName,email,walletAddress} = userdata
            res.status(200).json({userName,referrer,firstName,lastName,email,walletAddress})
        }else{
            res.status(400).send("There no transaction record for this user.")
        }
    }
    if(param[0] === 'getsomeuserinfo'){
        const {username} = req.query;
        if(!username)res.status(400).send("Username absent");
        const userdata= await user.findOne({userName: username});
        if(userdata){
            const {userName,referrer,firstName,lastName,email,walletAddress} = userdata
            res.status(200).json({userName,referrer,firstName,lastName,email,walletAddress})
        }else{
            res.status(400).send("There no transaction record for this user.")
        }
    }
    if(param[0]==="getallbalances"){
        // try{
            const {address} = req.query;
            const result = await getAllBalances(address)
            res.status(200).json({result});
        // }catch(e){
        //     res.status(400).json(e)
        // }
    }
    // if(param[0]==="sendtoken"){
    //     try{
    //         const {privKey,tokencontract,amount,chain,tokenshort,receivingAddr,fromAddr,deci,pasword} = req.body;
    //         const result = await sendtoken(privKey,tokencontract,amount,chain,tokenshort,receivingAddr,fromAddr,deci)
    //         res.status(200).json({result});
    //     }catch(e){
    //         res.status(400).json(e)
    //     }
    // }
    if(param[0]==="getSecreteKey"){
        // try{
            const {password} = req.body;
            const userid = VerifyJwtAuth(req.headers)
            console.log(userid)
            const secreteKey = await user.findById(userid)
            // const {privKey,tokencontract,amount,chain,tokenshort,receivingAddr,fromAddr,deci} = req.body;
            // const result = await sendtoken({privKey,tokencontract,amount,chain,tokenshort,receivingAddr,fromAddr,deci})
           
            const key = await deecrtyptAccountPrivateKey(secreteKey.walletkeyStore,password)
            res.status(200).json({key});
        // }catch(e){
        //     res.status(400).json({e})
        // }
    }


    if(param[0] === 'sendtoken'){
        const userid = VerifyJwtAuth(req.headers)
        if(!userid || typeof userid === Object) {
            res.status(401).send("Not authorized, Kindly logout and login again to retry the transaction.")
        }else{
        if(req.body){
            let {tokencontract,amount,chain,tokenshort,receivingAddr,fromAddr,deci,password} = req.body;
            if(!password) {
                res.status(400).send("Please enter passwords");
            }
            const owner = await user.findById(userid)
            if(!owner) {
                res.status(404).send("User does not exist")
            }else{
                try{
                    const walletAccountPassword = owner.email + owner.userName
                const bcryptVerification = await bcrypt.compare(password,owner.password);
                if(!bcryptVerification){
                    res.status(404).send("incorrect password")
                }else{
                    amount = parseFloat(amount)
                    deci = parseInt(deci)
                    const {privateKey} = await deecrtyptAccountPrivateKey(owner.walletkeyStore,walletAccountPassword)
                    console.log({privateKey,tokencontract,amount,chain,tokenshort,receivingAddr,fromAddr,deci})
                    const result = await sendtoken(privateKey,tokencontract,amount,chain,tokenshort,receivingAddr,fromAddr,deci)
                    if( result.hasOwnProperty("error")){
                        res.status(400).json({result});
                    }else{
                        console.log(result)
                        res.status(200).json({result});
                    }
                }
                
            }catch(err){
                    res.status(400).send('An error occurred while performing transaction, try again later.')
            }
        }
            
        }else{
            res.status(403).send("Body must be present!")
        }
    }
    }
if(param[0] === 'gettransactionhistory'){
    const {txhash,network} = req.query;
    if(!txhash || !network){
        res.status(400).send("Transactionn hash and Network has to be provided");
    }else{
        try{
            const txHist = await getTransactionHistory(txhash,network);
            res.status(200).json(txHist)
        }catch(e){
            res.status(404).json(e)
        }
    }
}
}