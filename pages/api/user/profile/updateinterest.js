import buypackageModel from "../../../../backendUtils/model/buypackageModel";
import connectDB from '../../../../backendUtils/db/connetMongo';
import user from "../../../../backendUtils/model/model";
import VerifyJwtAuth from "../../../../backendUtils/jwtauthverify";
import packageModel from "../../../../backendUtils/model/packageModel"
import statuses from "../../../../backendUtils/statuses";

export default async function handler(req, res) {
   await connectDB();
   try{
   if(req.method?.toLocaleLowerCase() === "get"){
    const allBoughtPackages = await buypackageModel.find();
    for(let i = 0; i < allBoughtPackages.length; i++) {
        if(allBoughtPackages[i].packages.length > 0){
            let userRunningPackage = allBoughtPackages[i].packages;
            let userBalance = allBoughtPackages[i].Balance;
            for(let j = 0; j < userRunningPackage.length; j++){
                let {Name,roi,investAmount,status,coin,yieldPeriod,nextYieldDate,lastYieldDate} = userRunningPackage[j];
                const yieldDateCheck = new Date(nextYieldDate)
                const checkCoinBalanceIndex = userBalance.findIndex(v=> v.coin === userRunningPackage[j].coin);
                const today = isToday(yieldDateCheck)
                console.log({today})
                   if(today && userRunningPackage[j].status === statuses[0]) { 
                    const todayProfit = (userRunningPackage[j].Balance * (userRunningPackage[j].roi/100))
                    const nextBalance = todayProfit + userRunningPackage[j].Balance;
                    const profit = nextBalance - userRunningPackage[j].investAmount;
                    nextYieldDate = nextYieldDate + yieldPeriod;
                    console.log({nextYieldDate,yieldPeriod,removeOneDay:nextYieldDate - yieldPeriod})
                    userBalance[checkCoinBalanceIndex] = {
                        ...userBalance[checkCoinBalanceIndex],
                        coin:userRunningPackage[j].coin,
                        Amount:userBalance[checkCoinBalanceIndex]?.Amount + todayProfit};
                        userRunningPackage[j] = {
                        Name,roi,investAmount,status,coin,
                        profit,Balance:nextBalance,yieldPeriod,nextYieldDate
                        }
              }
            }
                const updateUserPackages = await buypackageModel.updateOne({_id:allBoughtPackages[i]._id},
                    {$set:{packages:userRunningPackage,Balance:userBalance}})
                    // console.log({updateUserPackages})
                    
        }
    }
    res.status(200).send("Completed")
   }
}catch(err){
    // res.status(400).send("An error Occured")
    res.status(400).send(err?.message)
}
}

const isToday = (someDate) => {
    const today = new Date()
    console.log({
        day: someDate.getDate(),
        month: someDate.getMonth() + 1,
        year: someDate.getFullYear()
    })
    return someDate.getDate() === today.getDate()+1 &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }