import connectDB from "../../../backendUtils/db/connetMongo";
import packageModel from "../../../backendUtils/model/packageModel";
import buypackageModel from "../../../backendUtils/model/buypackageModel";
import { calcBNBPrice,calcETHPrice } from "../../../backendUtils/wallet/functions";
import statuses from '../../../backendUtils/statuses'
export default async function handler (req,res){
    await connectDB()
    const param = req.query.params;
    if(param[0] === "getpackageinfo"){
        const {id} = req.query
        if(!id){
            res.status(400).send("Id has to be provided")
        }else{
            const bnbprice = await calcBNBPrice()
            const ethprice = await calcETHPrice()
            const packageDetail = await packageModel.findById(id)
            if(packageDetail){
                try{
                let {
                    Name,Amount,roi,yieldPeriod,primarycolor,textsColor,_id
                   } = packageDetail
                const bnbworth =(parseFloat(Amount) / parseFloat(bnbprice)).toFixed(5)
                const ethworth =(parseFloat(Amount) / parseFloat(ethprice)).toFixed(5)
                yieldPeriod = yieldPeriod/(1000*60*60 * 24)
                let items = {Name,Amount,roi,yieldPeriod,primarycolor,textsColor,_id,bnbworth,ethworth} 
                res.status(200).json({items});
                
            }catch(e){
                res.status(400).send(e.message);
            }
            }else{
                res.status(400).send("An error occurred");
            }
        }
    }
    if(param[0] === "getwithdrawalrequests"){
        try{
        let {limit,skip} = req.query
        limit = parseInt(limit)
        skip= parseInt(skip)
        console.log({skip})
        const withdrawrequests = await buypackageModel.find({hasPendingWithdrawal:true})
        if(withdrawrequests.length > 0){
            const requestsPackages =  await buypackageModel.aggregate([
                {$match:{hasPendingWithdrawal:{$eq:true}}},
                {$unwind:"$packages"},
                {$match:{"packages.status":statuses[1]}},
                {$project:{package:"$packages",ownerUserName:"$ownerUserName",ownerid:"$ownerid"}},
                // {$skip:skip},
                // {$limit:limit},
            ]);
            const total = await buypackageModel.aggregate(
                [
                    {$match:{hasPendingWithdrawal:{$eq:true}}},
                   {
                    $unwind:"$packages"
                }
                ,{$group:{_id:"$packages.status",total:{$sum:1}}},
                
                ]
            );
            const totalusers = await buypackageModel.countDocuments({hasPendingWithdrawal:true})
            const returned = requestsPackages.length;
            const totalcounts = total.filter(v=>v._id === statuses[1])[0]?.total
        const result = {requestsPackages,totalcounts,limit,skip,returned,totalusers}
        res.status(200).json(result)
    }else{
        res.status(400).send('No packages found')
    }
        }catch(e){
            console.log(e)
    res.status(400).send('No packages found')
        }
    }
    if(param[0] === "getactivepackages"){
        try{
        let {limit,skip} = req.query
        limit = parseInt(limit)
        skip= parseInt(skip)
        const withdrawrequests = await buypackageModel.find()
                                    
        if(withdrawrequests.length > 0){
            const requestsPackages =  await buypackageModel.aggregate([
                {$unwind:"$packages"},
                {$match:{"packages.status":statuses[0]}},
                {$project:{package:"$packages",ownerUserName:"$ownerUserName",ownerid:"$ownerid"}},
                // {$skip:skip},
                // {$limit:limit},
            ]);
            const total = await buypackageModel.aggregate(
                [
                    {$match:{hasPendingWithdrawal:{$eq:true}}},
                   {
                    $unwind:"$packages"
                }
                ,{$group:{_id:"$packages.status",total:{$sum:1}}},
                
                ]
            );
            const returned = requestsPackages.length;
            const totalcounts = total.filter(v=>v._id === statuses[0])[0]?.total
        const result = {requestsPackages,totalcounts,limit,skip,returned}
        res.status(200).json(result)
    }else{
        res.status(400).send('No packages found')
    }
        }catch(e){
            console.log(e)
    res.status(400).send('No packages found')
        }
    }
    if(param[0] === "getwithdrawnpackages"){
        try{
        let {limit,skip} = req.query
        limit = parseInt(limit)
        skip= parseInt(skip)
        const withdrawrequests = await buypackageModel.find()
                                
        if(withdrawrequests.length > 0){
            const requestsPackages =  await buypackageModel.aggregate([
                {$unwind:"$packages"},
                {$match:{"packages.status":statuses[2]}},
                {$project:{package:"$packages",ownerUserName:"$ownerUserName",ownerid:"$ownerid"}},
                // {$skip:skip},
                // {$limit:limit},
            ]);
            console.log({requestsPackages})   
            const total = await buypackageModel.aggregate(
                [
                    {$match:{hasPendingWithdrawal:{$eq:true}}},
                   {
                    $unwind:"$packages"
                }
                ,{$group:{_id:"$packages.status",total:{$sum:1}}},
                
                ]
            );
            const returned = requestsPackages.length;
            const totalcounts = total.filter(v=>v._id === statuses[2])[0]?.total
        const result = {requestsPackages,totalcounts,limit,skip,returned}
        res.status(200).json(result)
    }else{
        res.status(400).send('No packages found')
    }
        }catch(e){
            console.log(e)
    res.status(400).send('No packages found')
        }
    }
}