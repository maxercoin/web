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
import statuses from '../../../../backendUtils/statuses';

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
                            const getAllWithdrawalRequests = await buypackageModel.find({hasPendingWithdrawal:true});
                            if(getAllWithdrawalRequests){
                                res.status(200).json(getAllWithdrawalRequests)
                            }else{
                                res.status(400).send("No withdrawal requests available");
                            }
                        }
                        if(req.method?.toLocaleLowerCase() === 'post'){
                            const {ownerid,chainid,tx_hash,packageid,coin} = req.body;
                            if(!ownerid  || !tx_hash) res.status(400).send("Please fill in required fields");
                            const client = await user.findById(ownerid); 
                            if(client){
                                // const verifyReciever = await checkIfCurrectUser(chainid,tx_hash,client.walletAddress);
                                // if(!verifyReciever.error){
                                    const getuser = await buypackageModel.findOne({ownerid});
                                    if(getuser){
                                        const {packages} = getuser;
                                        let currPackages = packages
                                       let packagetoUpdateIndex = packages.findIndex(v => {
                                        const refinedId = `${v._id}`.split("(")[0];
                                       return refinedId === packageid
                                   });
                                   console.log({packageid})
                                   console.log(currPackages)
                                   const balanceToEffectIndex = getuser.Balance.findIndex((v)=>v.coin === coin)
                                   let {Balance} = getuser
                                   Balance[balanceToEffectIndex] = {Amount:Balance[balanceToEffectIndex].Amount - currPackages[packagetoUpdateIndex].Balance,coin,...Balance[balanceToEffectIndex]}
                                       currPackages[packagetoUpdateIndex].status = statuses[2];
                                       const firstPendWithdrawal = currPackages.find( v => v.status === statuses[1]);
                                       const hasPendingWithdrawal = firstPendWithdrawal ? true : false;
                                       const historyTxIds = [...getuser.historyTxIds,tx_hash]
                                       const history = [...getuser.history,{
                                        ownerid,
                                        ownerUserName:client.userName,
                                        package:currPackages[packagetoUpdateIndex].Name,
                                        instructionType:'sell',
                                        instruction:`Sold ${currPackages[packagetoUpdateIndex].Name} at ${currPackages[packagetoUpdateIndex].Balance} ${currPackages[packagetoUpdateIndex].coin}`,
                                        txBscId:tx_hash,
                                        ownerSendingOrRecievingAddress:client.walletAddress,
                                        paymentdate:Date.now().toString(),
                                        value_quote:currPackages[packagetoUpdateIndex].Balance,
                                        coin:currPackages[packagetoUpdateIndex].coin
                                       }]
                                        const updateUserPackage = await buypackageModel.updateOne({ownerid},{packages:currPackages,history,historyTxIds,hasPendingWithdrawal,Balance})
                                        res.status(200).send("Update successful.")
                                    }else{
                                        res.status(400).send("user not found");
                                    }

                                // }else{
                                //     res.status(verifyReciever.error_code).json(verifyReciever.error_message);
                                // }

                            }else{
                                res.status(400).send("An error occured. User not found")
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


const checkIfCurrectUser = async(chainid,txId,ownerAddr)=>{
    const result = await fetch(`https://api.covalenthq.com/v1/${chainid}/transaction_v2/${txId}/?quote-currency=USD&format=JSON&no-logs=false&key=${process.env.COINS_API_KEY}`)
    const tx = await result.json()
    if(tx.error) {
     const {error,error_code,error_message} = tx
     return {
         error,
         error_code,
         error_message
     }
    } const {successful,from_address,
        to_address:token_smart_contract,
        value_quote,block_signed_at,tx_hash,block_height,log_events,value:bnb_amount} = tx.data.items[0]
if(log_events.length > 0){
        const {sender_contract_decimals:token_contract_decimals,
            sender_name:token_name,
            sender_contract_ticker_symbol:token_contract_ticker_symbol, 
            decoded:decodedData} = log_events[0]
        const {params:decodedDataParams} = decodedData;
        const txAmount = parseInt(decodedDataParams[decodedDataParams.length - 1].value)
        const to_address = decodedDataParams[decodedDataParams.length - 2].value
        const realAmount = token_contract_decimals != 0 ? txAmount / ( 10 ** token_contract_decimals) : parseInt(txAmount);
        if(to_address != ownerAddr){
            return {
                error:true,
                error_code:403,
                error_message:"Kindly check recieving address, this user isn't the recieving address of this transaction."
            }
        }
            return {
                    error:false,realAmount,token_name,token_contract_ticker_symbol,
                    token_contract_decimals,from_address,to_address,
                    token_smart_contract,value_quote,successful,
                    block_signed_at,tx_hash,block_height
                    }
}else{
    // res.status(200).json(tx)
    const token_contract_ticker_symbol = chainid === '56' ? 'BNB' : chainid === '1' ? 'ETH' : '';
    const token_name = chainid === '56' ? 'BNB' : chainid === '1' ? 'ETH' : '';
    const to_address = token_smart_contract;
    const token_contract_decimals = chainid === '56' ? 18 : chainid === '1' ? 18 : 1;
    const realAmount = parseInt(bnb_amount) / (10 ** token_contract_decimals)
    if(to_address != ownerAddr){
        return {
            error:true,
            error_code:403,
            error_message:"Kindly check recieving address, this user isn't the recieving address of this transaction."
        }
    }
    return{
        error:false,realAmount,token_name,token_contract_ticker_symbol,
        token_contract_decimals,from_address,to_address,
        value_quote,successful,
        block_signed_at,tx_hash,block_height
        }
}
}