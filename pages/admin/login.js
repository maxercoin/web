import { Box, Button, Input, Stack,Text, useMediaQuery } from '@chakra-ui/react'
import React, { useState } from 'react'
import colors from '../../components/utils/colors'
import {useRouter} from 'next/router'
import Head from 'next/head'

function Login() {
  const [isLargerthan834] = useMediaQuery('(min-width: 834px)')
    const {push:goto} = useRouter()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const submitForm = async()=>{
        setIsLoading(true)
        if(!email || !password){
            setError(v=>'Email or password fields cannot be empty');
            setIsLoading(false)
        }else{
            setError('')
            try{
            const submit = await fetch('/api/admin/auth/login',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})
            })
            const submitResponse = await submit.json();
            setIsLoading(false)
            console.log(submitResponse)
            if(submitResponse.hasOwnProperty('success')){
                // console.log(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)
                sessionStorage.setItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY,submitResponse.token);
                goto('/admin')
              }else{
                setError("Invalid username or password.")
              }
        }catch(e){
            console.log(e.message);
            setIsLoading(false)
            setError(v => 'An error occured')
        }
        }
    }
  return (<> 
  <Head>
        <title>MexerCoin</title>
        <meta name="description" content="Mexer coin cryptocurrency Investment Website Admin Login Page" />
        <link rel="icon" href="/logo.png" />
      </Head>   
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' placeItems='center' gap='5' bgGradient={`linear(to-r,${colors.primarycolor},${colors.secondarycolor})`} h='100vh' w='100vw'>
    <Box mb='5' w={isLargerthan834 ?'60%':'90%'} padding='10' borderRadius='15px' boxShadow={`2px 2px 100px ${colors.primarycolor}`} mt='5' border='1px solid #fff' display='flex' flexDirection='column' placeItems='center' gap='5' >
    <Text  fontSize='1.5em' fontWeight='900' color='#fff'>ADMIN LOGIN </Text>
    <Stack w={isLargerthan834 ?'60%' :'100%'} >
        <Input value={email} onChange={(e)=>{setEmail(v=>e.target.value.trim().toLowerCase())}} type='text' w='100%' bg='#fff' placeholder='Input your username or email' />
        <Input value={password} onChange={(e)=>{setPassword(v=>e.target.value.trim())}} type='password' w='100%' bg='#fff' placeholder='Input your password' />
        {error != "" && <Text color='#ff0000'><i>{error}</i></Text>}
    </Stack>
    <Button isLoading={isLoading} onClick={submitForm} _hover={{bg:colors.secondarycolor,color:'#fff'}}>Login </Button>
    <Text _hover={{cursor:'pointer',color:colors.deg2color  }} color='#fff'><u><i>Forgot Password</i></u></Text>
    <Text  color='#fff'><i>Or</i></Text>
    <Text _hover={{cursor:'pointer',color:colors.deg2color  }} onClick={(e)=>{goto('/admin/signup')}} color='#fff'><u><i>Signup</i></u></Text>
    </Box>
    </Box>
    </>
  )
}

export default Login