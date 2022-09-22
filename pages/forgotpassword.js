import { Box, Button, Input, Stack,Text, useMediaQuery } from '@chakra-ui/react'
import React, { useState } from 'react'
import Footercomponent from '../components/footer/footer'
import Headercomponent from '../components/header/header'
import colors from '../components/utils/colors'
import {useRouter} from 'next/router'
import Head from 'next/head'
import axios from 'axios'
function Forgotpassword() {
    const [isLargerthan834] = useMediaQuery('(min-width: 834px)')
    const [login,setLogin] = useState('')
    const [isLoading,setIsLoading] = useState(false) 
    const [otpcode,setOtpCode] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [reqActivateMsg,setReqActivateMsg] = useState(false)
    const [openOtpInput,setOpenOtpInput] = useState(false)
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    
      const {push:goto} = useRouter()
      const changepassword = async()=>{
        setSuccess('')
        setError('')
        setIsLoading(true)
        if(!otpcode || !login || !newPassword){
          setError('Password and Username or email fields cannot be empty.')
          setIsLoading(v=>false)
        }else{
          try{
          const logUser = await axios({
            url:'/api/user/profile/forgotpassword',
            method:'post',
            data:JSON.stringify({login,otp:otpcode,newPassword}),
            headers:{'Content-Type': 'application/json'}
          })
          if(logUser.status === 200){
            goto('/login')
            console.log(logUser)
            setIsLoading(v=>false)
           
          }
          setIsLoading(v=>false)
        }catch(e){
          setIsLoading(v=>false)
          setError(e?.response?.data || e?.message || "An error occured, Try again.")
            console.log(e)
        }
      }
      }
      const getOtp = async()=>{
        setSuccess('')
        setError('')
        setIsLoading(true)
        try{
        const userOtp = await axios.get(`/api/user/profile/forgotpassword?login=${login}`)
        if(userOtp.status === 200){
            setSuccess("Otp sent to your email, proceed to your email and copy it to continue your verification process")
            setOpenOtpInput(true)
        }
        setIsLoading(false)
    }catch(e){
        console.log(e)
        setIsLoading(false)
        setError(e?.response?.data || e?.message || "An error occured, Try again.")
    }
      }
    return (<> 
    <Head>
          <title>MexerCoin</title>
          <meta name="description" content="Mexer coin cryptocurrency Investment Website Forgot Password Page" />
          <link rel="icon" href="/logo.png" />
        </Head>   
      <Headercomponent />
      <Box display='flex' minH='500px' flexDirection='column' placeItems='center' gap='5' bgGradient={`linear(to-r,${colors.primarycolor},${colors.secondarycolor})`} h='max-content' w='100vw'>
      <Box mb='5' w={isLargerthan834 ?'60%':'90%'} padding='10' borderRadius='15px' boxShadow={`2px 2px 100px ${colors.primarycolor}`} mt='5' border='1px solid #fff' display='flex' flexDirection='column' placeItems='center' gap='5' >
      <Text  fontSize='1.5em' fontWeight='900' color='#fff'>FORGOT PASSWORD </Text>
      <Stack w={isLargerthan834 ?'60%' :'100%'} >
          <Input value={login} onChange={(e)=>setLogin(e.target.value)} type='text' w='100%' bg='#fff' placeholder='Input your username or email' />
          {openOtpInput && <Input value={otpcode} onChange={(e)=>setOtpCode(e.target.value)} type='text' w='100%' bg='#fff' placeholder='Input code' />}
          {otpcode.length === 6 && <Input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type='text' w='100%' bg='#fff' placeholder='Input New Password' />}
      </Stack>
      {!openOtpInput && <Button isLoading={isLoading} onClick={getOtp} _hover={{bg:colors.secondarycolor,color:'#fff'}}>GET CODE </Button>}
      {openOtpInput && <Button isLoading={isLoading} onClick={changepassword} _hover={{bg:colors.secondarycolor,color:'#fff'}}>SUBMIT </Button>}
      {success && <Text color='#00ff00'>{success}</Text>}
      {error && <Text color='#ff0000'>{error}</Text>}
      <Text _hover={{cursor:'pointer',color:colors.deg2color  }} onClick={(e)=>goto('/login')} color='#fff'><u><i>Login</i></u></Text>
      <Text  color='#fff'><i>Or</i></Text>
      <Text _hover={{cursor:'pointer',color:colors.deg2color  }} onClick={(e)=>{goto('/signup')}} color='#fff'><u><i>Signup</i></u></Text>
      </Box>
      </Box>
      <Footercomponent />
      </>
    )
}

export default Forgotpassword