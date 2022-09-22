import React, { useEffect, useState,useRef } from 'react'
import {Box,Text,Button,Skeleton,Stack, Input, SkeletonText,Select} from '@chakra-ui/react'
import colors from '../utils/colors'
import axios from 'axios'
function Buypackagebox({packageId,cancel}) {
    let stopUseEffect = useRef(false)
    const [itemLoaded,setItemLoaded] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [packageData,setPackageData] = useState({})
    const [myBalances,setBalances] = useState([])
    const [paymentMethodData,setPaymentMethodData] = useState({})
    const [password,setPassword] = useState('')
    const [error,setError]  = useState('')
    const [success,setSuccess]  = useState('')
    const getPackageData = async ()=>{
      const packageInfo = await axios.get(`/api/package/getpackageinfo?id=${packageId}`)
      const getMyBalances = await axios.get(`/api/user/profile/getallbalances?address=${sessionStorage.getItem("walletaddr")}`)
      setBalances(getMyBalances.data.result)
      console.log(getMyBalances.data.result)
      setPackageData(packageInfo.data.items)
      setItemLoaded(true)
    }
    
    useEffect(()=>{
        if(stopUseEffect.current === false){
            getPackageData()
        }
        stopUseEffect.current= true
    },[])
    const handleBuyPackage = async()=>{
        setIsLoading(true)
        console.log(paymentMethodData)
        if(password === '' || password === null || password === undefined){
            setError('Password must be present')
            setIsLoading(false)
        }else{
            if(error != '')return
            try{
            
        const refinedUserData = JSON.parse(sessionStorage.getItem("userprofileinfo"))
        const paymentData = {
            ...paymentMethodData,
            ownerid:sessionStorage.getItem('user_id'),
            ownerUserName:refinedUserData.userName,
            packageid:packageId,
            password
        }
        console.log(paymentData)
        const buypackage = await axios({
            url:'/api/user/profile/buypackage',
            method:'post',
            data:JSON.stringify(paymentData),
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_USER_AUTH_KEY)}`}
        })
           if(buypackage.status === 200){
            setSuccess("Package bought successfully")
            setError('')
            setIsLoading(false)
           } else{
                setSuccess('')
                setIsLoading(false)
               setError( "An error occured, Kindly wait for few momment before retrying")
           }
           console.log(buypackage)
    }catch(e){
        console.log(e)
        setIsLoading(false)
        setError(e?.response?.data || e?.message || e?.response.message || e?.response || "An error occured, Kindly wait for few momment before retrying")
    }
    }
    }
    const handleSelectChange = (e)=>{

        setError('')
        let packagedat = {
            bnb:packageData.bnbworth,
            eth:packageData.ethworth,
            usd:packageData.Amount
        } 

        const allValue = e.target.value && JSON.parse(e.target.value)
        const expectedAmount = e.target.value && allValue?.tokenname?.toLowerCase() === 'bnb' ?`${packagedat.bnb} BNB(${allValue.tokennetwork})` :
         allValue?.tokenname?.toLowerCase() === 'usdt' ?`${packagedat.usd} usdt(${allValue.tokennetwork})` :
          allValue?.tokenname?.toLowerCase() === `eth` ?`${packagedat.eth} ETH(${allValue.tokennetwork})` : 'package worth'
        if(allValue.usdval < parseFloat(packageData.Amount)){
        setError(`${allValue.tokenval}${allValue.tokenname} is less than the package price, please send ${expectedAmount} to your wallet address`)
        return
        }
        setPaymentMethodData(allValue)
    }
  return (
    <Box w='100%' h='100%' position='absolute' display='flex' zIndex='10' justifyContent='center' alignItems='center' bg='rgba(0,0,0,0.5)' inset='0'>
        <Box bg='#fff' display='flex' gap='2' flexDirection='column' w='60%' minH='70%' borderRadius='10px'>
        <Stack borderTopRightRadius='10px' borderTopLeftRadius='10px' pt='5' pb='5' gap={2} flexDirection='row' bg={colors.deg2color} color='#fff' justifyContent='center' alignItems='center' >
            <Stack display='flex' alignItems='flex-start' alignSelf='flex-start' borderRight='2px dotted #fff' w='45%'>
            <Text fontWeight='700'>PACKAGE</Text>
            <Skeleton  isLoaded={itemLoaded} height='20px' >
                <Text >NAME: {packageData.Name}</Text>
            </Skeleton>
            <Skeleton isLoaded={itemLoaded} height='20px' >
                <Text>USD: {packageData.Amount}</Text>
            </Skeleton>
            <Skeleton isLoaded={itemLoaded} height='20px' >
            <Text>BNB: {packageData.bnbworth}</Text>
            </Skeleton>
            <Skeleton isLoaded={itemLoaded} height='20px' >
            <Text>ETH: {packageData.ethworth}</Text>
            </Skeleton>
            </Stack>
            <Stack alignSelf='flex-start' alignItems='flex-end' w='45%'>
                <Text fontWeight='700'>My Balances</Text>
           {myBalances.length > 0 && myBalances.map((v)=>
            <Skeleton key={v.name+ "" + v.network} isLoaded={itemLoaded} height='20px' >
                <Text><span style={{fontSize:'1.2em'}}>{parseFloat(v.balance).toFixed(4)}</span> {v.name}{` (${v.network})`}</Text>
            </Skeleton>
            )}
           {myBalances.length < 1 && <Skeleton isLoaded={itemLoaded} height='100px' />}
            </Stack>
        </Stack>
        <Box w='100' h='max-content' >
            <Skeleton  ml='10' display='flex' gap='2' w='80%' isLoaded={itemLoaded} height='20px' >
            <Text fontSize='1.3em' fontWeight='900'>Choose Payment Method</Text>
                <Select borderColor='#000' onChange={handleSelectChange} w='50%' h='40px' border='2px solid #000' >
                    <option></option>
                    {myBalances.map((v,index)=>
                        <option key={`chosenwalettoken${index}`}
                         value={JSON.stringify({tokenval:parseFloat(v.balance).toFixed(4),contract:v?.contract,usdval:parseFloat(v.price * v.balance).toFixed(4),tokenname:v.name,tokennetwork:v.network })}>
                            {parseFloat(v.balance).toFixed(4)} {v.name}{`(${v.network})`} {`$${parseFloat(v.price * v.balance).toFixed(4)}`}
                             </option>
                    )}
                </Select>
            </Skeleton >
            {error !='' && <Text mt='5' ml='10' color='#ff0000' fontSize='0.8em' fontWeight='medium'>{error}</Text>}
            <Skeleton h='20px' mt={error ==='' && '7'} mb='5' w='80%' ml='10' isLoaded={itemLoaded}>
             <Input onChangeCapture={(e)=>setPassword(e.target.value)} ml='10' border='2px solid  #000' borderColor='#000' w='60%' placeHolder='Kindly input your password'/>
            {success !='' && <Text mt='5' ml='10' color='#00ff00' fontSize='1em' fontWeight='medium'>{success}</Text>}
            </Skeleton>
            </Box>
        <Box w='100%' display='flex' justifyContent='space-between' >
        <Button ml='10'isLoading={isLoading} onClick={handleBuyPackage} disabled={isLoading} bg={colors.primarycolor} color='#fff'  _hover={{bg:colors.deg1color,color:'#fff'}}>BUY</Button>
        <Button mr='10' bg={colors.deg3color} onClick={cancel} color='#fff' _hover={{bg:colors.deg1color,color:'#fff'}}>CANCEL</Button>
        </Box>
        </Box>
    </Box>
  )
}

export default Buypackagebox