import React,{useRef,useEffect,useState} from 'react'
import {Box, Text,Input,IconButton,Button,useToast} from '@chakra-ui/react'
import {CopyIcon} from '@chakra-ui/icons'
import colors from '../../../utils/colors'
import axios from 'axios'
import user from '../../../../backendUtils/model/model'
function Payuser({close,itemdata,refresh}) {
    const toast = useToast()
    const [transactionId,setTransactionId] = useState('')
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const [userData,setUserData] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    const getuserData = async()=>{
        try{
            const userdata = await axios.get(`/api/user/profile/getsomeuserinfo?username=${itemdata.ownerUserName}`)
            if(userdata.status === 200){
                console.log(userdata.data)
                setUserData(v=>userdata?.data)
                setSuccess("")
            }
        }catch(e){
            setError(e?.response?.data || e?.message || 'An error occured. Please try again later')
        }
    }
    const copyUserWalletAddr = ()=>{
        navigator.clipboard.writeText(userData?.walletAddress)
        toast({
            title: 'Address copied.',
            description: "You have copied the user wallet address.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
    }
    const copyUserAmountDue = ()=>{
        navigator.clipboard.writeText(itemdata?.package?.investAmount)
        toast({
            title: 'Amount copied.',
            description: "You have copied the user Amount Dued.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
    }
    const submittx = async ()=>{
        setError('')
        setSuccess('')
        setIsLoading(true)
        try{
        const submit = await axios({
            url:'/api/admin/approve/userwithdrawal',
            method: 'POST',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)}`},
            data:JSON.stringify({ownerid:itemdata?.ownerid,chainid:'',tx_hash:transactionId,packageid:itemdata?.package?._id,coin:itemdata?.package?.coin})
        })
        if(submit.status === 200){
            setSuccess("User withdrawal sucessfully updated")
            refresh()
        }
        setIsLoading(false)
    }catch(e){
        console.log(e)
        setIsLoading(false);
        setError(e?.response?.data || e?.message || "An error occurred")
    }
    }
    let stopUSeEffect = useRef(false)
    useEffect(()=>{
        if(stopUSeEffect.current === false){
            console.log({itemdata})
            getuserData()
        }
        stopUSeEffect.current = true
    },[])
  return (
    <Box position='fixed'  w='100vw' zIndex='10' h='100vh' bg='rgba(0,0,0,0.5)' display='flex' justifyContent='center' alignItems='center' >
        <Box borderRadius='10px' w='60%' h='70%' bg='#fff' display='flex' justifyContent='space-evenly' flexDirection='column'>
        <Box display='flex' justifyContent='space-between' pl={5} pr={5}>
            <Text fontSize='1.2em' fontWeight='medium'>User: {itemdata?.ownerUserName}</Text>
            <Box display='flex'>
            <Text fontSize='1.2em' fontWeight='medium'>Amount: {itemdata?.package?.investAmount} {itemdata?.package?.coin}</Text>
            <IconButton alignSelf='flex-end' onClick={copyUserAmountDue} justifySelf='flex-start' w='10%' icon={<CopyIcon />}/>
            </Box>
        </Box>
        <Box w='100%' display='flex' justifyContent='center' alignSelf='center' flexDirection='row'>
            <Box w='80%' display='grid'>
            <Text fontSize='1.2em' fontWeight='medium'>User wallet address</Text>
            <Input color='#000' _disabled={{color:'#000'}} value={userData?.walletAddress} disabled borderColor='#000' w='100%'/>
            </Box>
            <IconButton onClick={copyUserWalletAddr} alignSelf='flex-end' justifySelf='flex-start' w='10%' icon={<CopyIcon />}/>
        </Box>
        <Input w='90%' borderColor='#000' alignSelf='center' onChange={(e)=>setTransactionId(e.target.value)} placeholder='Input transaction ID.'/>
        <Box display='flex' justifyContent='space-between'>
        <Button m='2' bg={colors.primarycolor} color='#fff' isLoading={isLoading} onClick={submittx}  _hover={{bg:colors.deg1color,color:'#fff'}}>CONFIRM</Button>
        <Button m='2' bg={colors.deg3color} onClick={close}  _hover={{bg:colors.deg1color,color:'#fff'}}>CLOSE</Button>
        </Box>
           {error != "" && <Text color='#ff0000'>{error}</Text>}
           {success != "" && <Text color='#00ff00'>{success}</Text>}
        </Box>
    </Box>
  )
}

export default Payuser