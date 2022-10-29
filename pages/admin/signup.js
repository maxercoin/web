import { Box, Button, Input, Stack,Text,useMediaQuery } from '@chakra-ui/react'
import React,{useState} from 'react'
import colors from '../../components/utils/colors'
import {useRouter} from 'next/router'
import Head from 'next/head';

function Signup() {
  const [isLargerthan834] = useMediaQuery('(min-width: 834px)');
    const {push:goto} = useRouter()
    const [userName,setUserName] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [authKey,setAuthKey] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [isSubmiting,setIsSubmiting] = useState(false)
    const [error,setError] = useState("")

    const submitForm = async ()=>{
        setIsSubmiting(true)
        // console.log({userName,password,confirmPassword,email,firstName,lastName,authKey});
        if(!userName || !firstName || !lastName || !email || !password || !confirmPassword){
            setError("Please ensure all fields are valid.")
            setIsSubmiting(false)
            return;
        }else{
            setError("")
            if(password != confirmPassword){
                setError("Password must be equal to confirm password.")
                setIsSubmiting(false)
            }else{
                setError("")
                try{
                    const submit = await fetch('/api/admin/auth/signup',{
                          method:'POST',
                          headers:{"Content-Type": "application/json" },
                          body:JSON.stringify({userName,password,confirmPassword,email,firstName,lastName,authKey})
                      })
                  const submitResult = await submit.json();
                  console.log(submitResult)
                  setIsSubmiting(false)
                  if(submitResult.hasOwnProperty('success')){
                    sessionStorage.setItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY,submitResult.token);
                    goto('/admin')

                  }else{
                    setError("User aleady exist or your authentication does not correct.")
                  }
                }catch(e){
                    setIsSubmiting(false)
                    setError("An error occured,Try again later, or check your admin pass key or user already exist.")
                    console.log(e.message)
                }
            }
        }
    }

  return (<>
  <Head>
        <title>MaxerCoin</title>
        <meta name="description" content="Maxer coin cryptocurrency Investment Website Admin Signup page" />
        <link rel="icon" href="/logo.png" />
      </Head>
    <Box display='flex' flexDirection='column' justifyContent='center' placeItems='center' gap='5'  bgGradient={`linear(to-r,${colors.primarycolor},${colors.secondarycolor})`} h='100vh' w='100vw'>
    <Box w={isLargerthan834 ?'60%':'90%'} padding='10' borderRadius='15px' boxShadow={`2px 2px 100px ${colors.primarycolor}`} mb='5' mt='5' border='1px solid #fff' display='flex' flexDirection='column' placeItems='center' gap='5' >
    <Text  fontSize='1.5em' fontWeight='900' color='#fff'>ADMIN SIGN UP </Text>
    <Stack w={isLargerthan834 ?'60%':'100%'} >
        <Input  value={userName} onChange={(e)=>{setUserName(v=>e.target.value.trim().toLowerCase())}} type='text' w='100%' bg='#fff' placeholder='Input your username' />
        <Input value={firstName} onChange={(e)=>{setFirstName(v=>e.target.value.trim())}} type='text' w='100%' bg='#fff' placeholder='Input your first name' />
        <Input value={lastName} onChange={(e)=>{setLastName(v=>e.target.value.trim())}} type='text' w='100%' bg='#fff' placeholder='Input your last name' />
        <Input value={email} onChange={(e)=>{setEmail(v=>e.target.value.trim().toLowerCase())}} type='email' w='100%' bg='#fff' placeholder='Input your  email' />
        <Input value={authKey} onChange={(e)=>{setAuthKey(v=>e.target.value.trim())}} type='text' w='100%' bg='#fff' placeholder='Input admin pass key' />
        <Input value={password} onChange={(e)=>{setPassword(v=>e.target.value.trim())}} type='password' w='100%' bg='#fff' placeholder='Input your password' />
        <Input value={confirmPassword} onChange={(e)=>{setConfirmPassword(v=>e.target.value.trim())}} type='password' w='100%' bg='#fff' placeholder='Confirm password' />
    {error != "" && <Text color='#ff0000'><i>{error}</i></Text>}
    </Stack>
    
    <Button onClick={submitForm} isLoading={isSubmiting} _hover={{bg:colors.secondarycolor,color:'#fff'}}>SIGN UP </Button>
    {/* <Text _hover={{cursor:'pointer',color:colors.deg2color  }} color='#fff'><u><i>Forgot Password</i></u></Text> */}
    <Text  color='#fff'><i>Or</i></Text>
    <Text _hover={{cursor:'pointer',color:colors.deg2color  }} onClick={(e)=>{goto('/admin/login')}} color='#fff'><u><i>Login</i></u></Text>
    
    </Box>
    </Box>
    </>
  )
}

export default Signup
