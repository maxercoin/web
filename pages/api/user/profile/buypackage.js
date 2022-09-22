import buypackageModel from "../../../../backendUtils/model/buypackageModel";
import connectDB from '../../../../backendUtils/db/connetMongo';
import user from "../../../../backendUtils/model/model";
import VerifyJwtAuth from "../../../../backendUtils/jwtauthverify";
import packageModel from "../../../../backendUtils/model/packageModel"
import statuses from "../../../../backendUtils/statuses";
import bcrypt from 'bcrypt'
import {calcBNBPrice,calcETHPrice,sendtoken,deecrtyptAccountPrivateKey,getTransactionHistory} from '../../../../backendUtils/wallet/functions'
export default async function handler(req, res){
    const platformRecieveAddress = process.env.ADMIN_ADDRESS || "0x9a07F3eB8cd8B972aa511EbBB98ba1E4dfA504f1"
    await connectDB()
    if(req.method?.toLocaleLowerCase() === "post"){
        try{
        const userid = VerifyJwtAuth(req.headers)
        if(!userid) {
            res.status(401).send("Not authorized")
        }else{  
        const {ownerid,ownerUserName,packageid,tokenname,password,tokennetwork,contract} = req.body;
        if( !ownerid || !packageid || !password,!tokennetwork){
            res.status(400).send("Kindly fill necessary details.")
            return
        }
        let paymentmethod = tokenname
        try{
            const boughtPackage = await packageModel.findById(packageid);
            const owner = await user.findById(ownerid)
            const bcryptVerification = await bcrypt.compare(password,owner.password);
        if(!owner) res.status(400).send("user not found.")
        const walletAccountPassword = owner.email + owner.userName
        const {privateKey} = await deecrtyptAccountPrivateKey(owner.walletkeyStore,walletAccountPassword)
        const packagePrice = paymentmethod.toLowerCase() === 'bsc' ? boughtPackage.Amount/(await calcBNBPrice()):
        paymentmethod.toLowerCase() === 'eth' ? boughtPackage.Amount/(await calcETHPrice()) : boughtPackage.Amount;
        try{
            const sendTokenNow = await sendtoken(privateKey,contract,packagePrice,tokennetwork,paymentmethod,platformRecieveAddress,owner.walletAddress,18)
            console.log(sendTokenNow)
            if(sendTokenNow.hasOwnProperty('error')){
                res.status(400).send("An error occurred while sending transaction, kindly ensure you have enough balance to cover for the gas fee")
            }else{
            // const tx = await getTransactionHistory(sendTokenNow.transactionHash,tokennetwork,packagePrice)
        
        // if(tx.error) {
        //     res.status(tx.error_code).send(tx.error_message)
        // }else{
            const {
                status:successful,
                from:from_address,
                transactionHash:tx_hash,
                transactionIndex: block_height
                } = sendTokenNow;
                const {to:to_address} = sendTokenNow
                const block_signed_at = Date.now()
                const value_quote = packagePrice
                // console.table(tx)
                if(successful){
                    
                    if(!owner) res.status(404).send("User does not exist")
                    // if(owner.walletAddress.toLowerCase() != from_address.toLowerCase()) res.status(404).send("You are not the owner of the sending wallet. if there a mix up. kindly send a mail to us.")
                    // if(to_address.toLowerCase() != platformRecieveAddress.toLowerCase() ) {
                    //     console.log(to_address)
                    //     res.status(400).send(`We are not the reciever of this transaction. Kindly confirm that you sent to ${platformRecieveAddress}` )
                    // }
                    const txIdExists = await buypackageModel.find({
                        historyTxIds:{
                            $elemMatch:{$eq:tx_hash}
                        }
                    })
                    if(!boughtPackage){
                        res.status(404).send("Package does not exist!")
                    }else{
                        if(txIdExists.length > 0){
                            res.status(400).send("Transaction has already been used to buy a package.")
                        }else{
                            const userTransactionProfile = await buypackageModel.findOne({$and:[{ownerid},{ownerUserName}]})
                            if(userTransactionProfile){
                                let currBalance = userTransactionProfile.Balance
                                const balanceIndex = userTransactionProfile.Balance.findIndex(v => v.coin === paymentmethod )
                                console.log({balanceIndex})
                                const packagePrice = value_quote;
                                if(balanceIndex > -1){
                                    currBalance[balanceIndex] = {...currBalance[balanceIndex],coin:paymentmethod,Amount:currBalance[balanceIndex].Amount + parseInt(packagePrice)}
                                    console.log(currBalance[balanceIndex])
                                }
                                const coin = paymentmethod
                                    const updatedBalance = balanceIndex > -1 ? currBalance :[...currBalance,
                                        {Amount:packagePrice, coin:paymentmethod}];
                                    const updatePackage = await buypackageModel.updateOne({_id:userTransactionProfile._id},{$set:{
                                        ownerid,ownerUserName   ,
                                        packagesBought:[...userTransactionProfile.packagesBought,boughtPackage.Name],
                                        packages:[...userTransactionProfile.packages,{
                                            Name:boughtPackage.Name,
                                            roi:boughtPackage.roi,
                                            investAmount:packagePrice,
                                            Balance:packagePrice,
                                            yieldPeriod:boughtPackage.yieldPeriod,
                                            nextYieldDate: await new Date((Date.now() + (boughtPackage.yieldPeriod))).getTime(),
                                            status:statuses[0],
                                            coin
                                        }],
                                        hasPendingWithdrawal:false,
                                        Balance: updatedBalance,
                                        roi:boughtPackage.roi,
                                        yieldPeriod:boughtPackage.yieldPeriod,
                                        nextYieldDate: await new Date((Date.now() + (boughtPackage.yieldPeriod))).getTime(),
                                        historyTxIds:[...userTransactionProfile.historyTxIds,tx_hash],
                                        history:[...userTransactionProfile.history,
                                            {ownerid,ownerUserName
                                            ,package:boughtPackage.Name
                                            ,instructionType:`Bought ${boughtPackage.Name} worth ${packagePrice}`,
                                            instruction:'Buy',
                                            txBscId:tx_hash,
                                            ownerSendingOrRecievingAddress:from_address,
                                            paymentdate:block_signed_at,
                                            block_height:block_height,
                                            value_quote,
                                            coin
                                        }]
                                    }})
                                    console.log(updatePackage)
                                    res.status(200).send(`You have successfully purchased ${boughtPackage.Name} worth ${packagePrice} ${paymentmethod}`);
                            }else{
                                const packagePrice = value_quote;
                                const coin = paymentmethod
                                const balance = {Amount:packagePrice, coin:paymentmethod}
                                const addTransactionProfile = await buypackageModel.create({
                                    ownerid,ownerUserName,
                                    packagesBought:[boughtPackage.Name],
                                    packages:[{
                                        Name:boughtPackage.Name,
                                        roi:boughtPackage.roi,
                                        investAmount:packagePrice,
                                        Balance:packagePrice,
                                        yieldPeriod:boughtPackage.yieldPeriod,
                                        nextYieldDate: await new Date((Date.now() + (boughtPackage.yieldPeriod))).getTime(),
                                        status:statuses[0],
                                        coin
                                    }],
                                    Balance:[balance],
                                    roi:boughtPackage.roi,
                                    yieldPeriod:boughtPackage.yieldPeriod,
                                    nextYieldDate: await new Date((Date.now() + ( boughtPackage.yieldPeriod))).getTime(),
                                    historyTxIds:[tx_hash],
                                    hasPendingWithdrawal:false,
                                    history:[
                                        {ownerid,ownerUserName
                                            ,package:boughtPackage.Name
                                            ,instructionType:`Bought ${boughtPackage.Name} worth ${packagePrice}`,
                                            instruction:'Buy',
                                            txBscId:tx_hash,
                                            ownerSendingOrRecievingAddress:from_address,
                                            paymentdate:block_signed_at,
                                            block_height:block_height,
                                            value_quote,
                                            coin
                                        },
                                           
                                    ]
                                })
                                res.status(200).send(`You have successfully purchased ${boughtPackage.Name} worth ${packagePrice} ${paymentmethod}`);
                            }
                         }
                        }
                }else{
                    res.status(400).send("Looks like your transaction wasn't sucessfull. Kindly check and retry again.")
                }
        // }
    }
    }catch(e){
        res.status(400).send('An error occurred while performing transaction, Kindly Try again later.')
    }
}catch(e){
        res.status(400).json(e)
        // res.status(400).send('An error occurred while performing transaction, try again later or check your password.')
    }
}
        }catch(e){
            console.log(e.message);
        }
    }

    if(req.method?.toLocaleLowerCase() === "get"){
        const {type,txid,chainid} = req.query;
        if(type === "gettx"){
         const result = await fetch(`https://api.covalenthq.com/v1/${chainid}/transaction_v2/${txid}/?quote-currency=USD&format=JSON&no-logs=false&key=ckey_44bd86931e2844efa2f9a4be814`)
           const tx = await result.json()
           if(tx.error) {
            res.status(tx.error_code).send(tx.error_message)
        }else{
            // res.status(200).json(tx)
            const {successful,from_address,
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
                    res.status(200).json({
                                realAmount,token_name,token_contract_ticker_symbol,
                                token_contract_decimals,from_address,to_address,
                                token_smart_contract,value_quote,successful,
                                block_signed_at,tx_hash,block_height
                                })
            }else{
                // res.status(200).json(tx)
                const token_contract_ticker_symbol = chainid === '56' ? 'BNB' : chainid === '1' ? 'ETH' : '';
                const token_name = chainid === '56' ? 'Binance Smart Chain(BEP20)' : chainid === '1' ? 'EUTEHRIUM' : '';
                const to_address = token_smart_contract;
                const token_contract_decimals = chainid === '56' ? 18 : chainid === '1' ? 18 : 1;
                const realAmount = parseInt(bnb_amount) / (10 ** token_contract_decimals)
                res.status(200).json({
                    realAmount,token_name,token_contract_ticker_symbol,
                    token_contract_decimals,from_address,to_address,
                    value_quote,successful,
                    block_signed_at,tx_hash,block_height
                    })
            }
            
        }
        }
        if(type === "trypretx"){
            const finres = await getTransactionDetails(txid,chainid)
            const statusvalue = finres.error ? 400 : 200;
            res.status(statusvalue).json(finres)
        }
    }
    
}

const getTransactionDetails = async(txId,chainid,packageAmount)=> {
    const result = await fetch(`https://api.covalenthq.com/v1/${chainid}/transaction_v2/${txId}/?quote-currency=USD&format=JSON&no-logs=false&key=${process.env.COINS_API_KEY}`)
           const tx = await result.json()
           if(tx.error) {
            const {error,error_code,error_message} = tx
            return {
                error,
                error_code,
                error_message
            }
        }else{
            const {successful,from_address,
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
                if(realAmount > packageAmount){
                    return {
                        error:true,
                        error_code:403,
                        error_message:"Amount is less than investment amount."
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
            if(realAmount > packageAmount){
                    return {
                        error:true,
                        error_code:403,
                        error_message:"Amount is less than investment amount."
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
        
}