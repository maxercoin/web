import React, { useEffect, useRef, useState } from 'react'
import {Box,Accordion,AccordionItem, AccordionButton,AccordionPanel,AccordionIcon,Text,Button} from '@chakra-ui/react'
import Image from 'next/image'
import colors from '../../utils/colors'
import axios from 'axios'
import Walletpop from './walletpop'
function Wallet() {
    const stopUseEffect = useRef(false)
    const [tokenObjs,setTokenObjs] = useState([]);
    const [popInstruction,setPopInstruction] = useState('')
    const [openPop,setOpenPop] = useState(false)
    const [tokenParams,setTokenParams] = useState({})
    const ethLogo = 'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png'
    

    const closePop = ()=>{
        setOpenPop(false)
        setPopInstruction('')
    }
    const sendtoken = (tokencontract,balance,deci,chain,tokenshort)=>{
        setTokenParams({tokencontract,balance,deci,chain,tokenshort})
        setPopInstruction('sendtoken');
        setOpenPop(true)
    }
    const getWalletBalance = async()=>{
        let storedalletBalance = JSON.parse(localStorage.getItem("storedWalletBalance")) || []
        setTokenObjs(storedalletBalance)
        try{
            const walletbalance = await axios.get('/api/user/profile/getallbalances?address='+sessionStorage.getItem("walletaddr"))
            if(walletbalance.status === 200){
                localStorage.setItem("storedWalletBalance",JSON.stringify(walletbalance.data.result)),
                setTokenObjs(walletbalance.data.result)
                console.log(walletbalance.data.result)
            }
        }catch(e){
            console.log(e)
        }

    }
    useEffect(()=>{
        if(stopUseEffect.current === false){
            getWalletBalance();
        }
        stopUseEffect.current = true
    },[])
  return (
    <Box w='100%' minH='90vh' overflowY='scroll' display='grid' placeItems='center'>
        {openPop && <Walletpop tokenData={tokenParams} refreshBal={getWalletBalance} cancel={closePop} instruction={popInstruction} />}
        <Box w='80%' h='80%' border='1px solid #fff' borderRadius='20px'>
        {tokenObjs.length > 0  && <Accordion defaultIndex={[0]} allowMultiple m='5'>
  {tokenObjs.map((v,index)=> <AccordionItem key={`walletKeys${index}`} mb='1'>
      <AccordionButton _hover={{bg:'radial-gradient(ellipse at top,#e66465, #9198e5)'}} bg='radial-gradient(ellipse at top,#e66465, #9198e5)' >
        <Box flex='1' textAlign='left' display='flex' alignItems='center'>
        {v.logo_url && <Image src={v.logo_url} height='50px' width='50px'/>}
         <Text color='#fff' fontSize='1.2em' fontWeight='600'>{v.name+" ("+v.network+")"}</Text>
        </Box>
        {/* <AccordionIcon /> */}
        <Box>
         <Text color='#fff' fontSize='1.2em' textAlign='right' fontWeight='600'>{v.balance+" ("+v.name+")"}</Text>
         <Text color='#fff' fontSize='1em' textAlign='right' fontWeight='600'>{v.price != '' && ("$" +(parseFloat(v.price) * parseFloat(v.balance) ))}</Text>
        </Box>
        
      </AccordionButton>
    <AccordionPanel pb={4} display='flex' justifyContent='center' gap='10'>
    <Button bg={colors.deg3color} color='#fff' onClick={(e)=>{setOpenPop(true)}} _hover={{bg:colors.deg1color,color:'#fff'}}>DEPOSIT</Button>
    <Button bg={colors.deg2color} color='#fff' onClick={(e)=>{sendtoken(v.contract,v.balance,v.decimals,v.network,v.name)}} _hover={{bg:colors.deg1color,color:'#fff'}}>WITHDRAW</Button>
    </AccordionPanel>
  </AccordionItem>)}
</Accordion>}
{tokenObjs.length === 0 && <Text fontSize='1.5em' fontWeight='900' textAlign='center' color='#fff'>Loading...</Text>}
        </Box>
    </Box>
  )
}

export default Wallet