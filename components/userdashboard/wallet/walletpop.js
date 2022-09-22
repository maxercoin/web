import React,{useState,useRef} from 'react'
import {Box,IconButton,Text,Input,useToast,Button} from '@chakra-ui/react'
import {CopyIcon} from '@chakra-ui/icons'
import colors from '../../utils/colors'
import axios from 'axios'
import Link from 'next/link'
function Walletpop({tokenData,instruction,cancel,tokenContract,refreshBal}) {
  const toast = useToast()
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')
  const [password,setPassword] = useState('')
  const [recievingAddr,setRecievingAddr] = useState('')
  const [txHash,setTxHash] = useState("")
  const [amount,setAmount] = useState(0)
  const [isLoading,setIsloading] = useState(false)
  const amountInput = useRef()
  
  const copyWalletAddr = () =>{
    navigator.clipboard.writeText(sessionStorage.getItem("walletaddr"))
    toast({
      title: 'Wallet Address copied successfully',
      description: "Wallet Address copied Successfully.",
      status: 'success',
      duration: 3600,
      isClosable: true,
    })
  } 

  const initiateSendTx = async()=>{
    setIsloading(true)
    console.log(amount)
    console.log(tokenData.balance)
    if(!amountInput.current.value){
      setError('Amount input cannot be empty')
      setIsloading(false)
      return

    }
    if(  amount > tokenData.balance ){
      setError('Your account balance is lower than amount you intend to send.')
      setIsloading(false)
      return
    }else{
      if(password === '' || recievingAddr === ''){
        setError("Password or recieving address cannot be empty.")
        setIsloading(false)
        return
      }else{
        setSuccess('')
        setError('');
        try{
        const sendTx = await axios({
          method:"post",
          url:"/api/user/profile/sendtoken",
          headers: {'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_USER_AUTH_KEY)}`},
          data:JSON.stringify({...tokenData,amount,password,receivingAddr:recievingAddr,fromAddr:sessionStorage.getItem("walletaddr")})
        })
        if(sendTx.status === 200){
          console.log(sendTx)
          setTxHash(sendTx.data.result.transactionHash)
          setSuccess("Transaction sent successfully, if not relecting, Kindly wait a while before trying again.")
          refreshBal()
          setIsloading(false)
        }
      }catch(e){
        console.log(e)
        setSuccess('')
        setIsloading(false)
        // setError(e?.response?.data?.result?.error ||"An error occured, Please try again")
      }
      }
    }
  }

 
  return (
    <Box w='100%' h='100%' zIndex='10' position='absolute' display='grid' placeItems='center' inset='0' bg='rgba(0,0,0,0.6)'>
        <Box w='60%' minH='60%' display='flex'  alignItems='center' justifyContent='center' border='1px solid #fff' bg='#fff' borderRadius='10px'>
            {instruction != 'sendtoken' && <Box w='100%' display='grid' gap='5' placeItems='center'><Box  display='flex'  alignItems='center' justifyContent='center' w='80%'>
              <Input value={sessionStorage.getItem("walletaddr")} borderColor='#000' w='80%' diabled />
              <IconButton onClick={copyWalletAddr} icon={<CopyIcon />}/>
              </Box>
                <Button bg={colors.deg3color} onClick={cancel} color='#fff' _hover={{bg:colors.deg1color,color:'#fff'}}>CLOSE</Button>
              </Box>}
            {instruction === 'sendtoken' && <Box display='flex' w='80%' gap='5' flexDirection='column'>
              <Text>Balance {tokenData.balance}</Text>
              <Input ref={amountInput} type='number' onChange={(e)=>{setAmount(parseFloat(e.target.value))}} borderColor='#000' placeholder='Kindly input token amount to transfer'/>
              <Input type='text' onChange={(e)=>{setRecievingAddr(e.target.value)}} borderColor='#000' placeholder='Kindly input recieving wallet address here'/>
              <Input type='password' onChange={(e)=>{setPassword(e.target.value)}} borderColor='#000' placeholder='Kindly input your password'/>
              {success != '' && <Box>
              <Text fontSize='0.9em' color='#00ff00' fontWeight='500'><i>{success}</i></Text>
              <Link target='_' style={{cursor:'pointer'}} href={`https://testnet.bscscan.com/tx/${txHash}`} fontSize='0.7em' color='#00ff00' fontWeight='500'><u><i> {txHash}</i></u></Link>
              </Box>
              }
              {error != '' && <Text fontSize='1.2em' color='#ff0000' fontWeight='500'><i>{error}</i></Text>}
              <Box display='flex' w='100%'  alignItems='center'  gap='10' flexDirection='row' justifyContent='center'  >
                <Button isLoading={isLoading} disabled={isLoading} bg={colors.primarycolor} color='#fff' onClick={initiateSendTx} _hover={{bg:colors.deg1color,color:'#fff'}}>SEND</Button>
                <Button bg={colors.deg3color} onClick={cancel} color='#fff' _hover={{bg:colors.deg1color,color:'#fff'}}>CANCEL</Button>
              </Box>
            </Box>}
        </Box>
    </Box>
  )
}

export default Walletpop