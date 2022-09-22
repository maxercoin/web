// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req 
 * @param {import('next').NextApiResponse} res 
 */
import VerifyJwtAuth from "../../../../backendUtils/jwtauthverify";
import connectDB from '../../../../backendUtils/db/connetMongo';
import user from "../../../../backendUtils/model/model";
import buypackageModel from "../../../../backendUtils/model/buypackageModel";
import statuses from "../../../../backendUtils/statuses";
import kyc from "../../../../backendUtils/model/kycModel";
import kycstatus from "../../../../backendUtils/kycstatus"
export default async function handler(req, res) { 
    await connectDB()
    if(req.method?.toLocaleLowerCase() === "post"){
        const {packageid} = req.body;
        console.log({packageid})
        const userid = VerifyJwtAuth(req.headers)
        if(!userid) {
            res.status(401).send("Not authorized")
        }else{
        const verify = await kyc.findOne({ownerid:userid})
        if(!verify || verify.status === kycstatus[1] || verify.status === kycstatus[0]) {
            res.status(400).send("Kindly proceed to the KYC verification tab and submit your ID and get Verified before your proceed.")
        }else{
        if(!packageid) res.status(403).send("Package not specified");
        const userdata = await buypackageModel.findOne({ownerid:userid})
        if(userdata){
            let {hasPendingWithdrawal,packages} = userdata;
            if(packages.length > 0){
            if(hasPendingWithdrawal === false) hasPendingWithdrawal = true;
            const packagetoUpdate = packages.find(v => {
                const refinedId = `${v._id}`.split("(")[0];
                return refinedId === packageid
            });
            // console.log({packages})
            if(packagetoUpdate){
                let packagestoUpdate = packages;
                const packagetoUpdateIndex = packagestoUpdate.findIndex(v => {
                 const refinedId = `${v._id}`.split("(")[0];
                return refinedId === packageid
            });
            const {Name,roi,investAmount,Balance,yieldPeriod,profit,coin} = packagetoUpdate
                packagestoUpdate[packagetoUpdateIndex] = {
                    Name,roi,investAmount,Balance,yieldPeriod,profit,coin,
                        status:statuses[1]
                    }
                    const updateUserPackages = await buypackageModel.updateOne({ownerid:userid},
                                                {$set:{hasPendingWithdrawal,
                                                    packages:packagestoUpdate }})
                                                    console.log(updateUserPackages)
                    res.status(200).send("Your withdrawal request has been successfully sent.")
                
            }else{
                res.status(404).send("Package not found.")
            }
            }else{
                res.status(400).send("user has no package to sell")
            }

        }else{
            res.status(403).send('User has no transaction record.')
        }
    }
        }
    }
}