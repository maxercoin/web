import { Box,Text,Input,Button } from '@chakra-ui/react'
import React,{useState} from 'react'
import colors from '../../utils/colors'
import axios from 'axios'
function Updateprofile() {
  const stopUseEffect = useRef(false)
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [initialpassword,setInitialPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const changePassword = async()=>{
    setSuccess('')
    setError('')
    setIsLoading(true)
    try{
    const updatePassword = await axios({
      method: 'POST',
      url:'/api/user/profile/updatepassword',
      headers: {'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_USER_AUTH_KEY)}`},
      data:JSON.stringify({initialpassword,newPassword})
    })
    if(updatePassword.status === 200){
      setSuccess('Password updated successfully')
    }
    setIsLoading(false)
  }catch(err){
    setSuccess('')
    setError(err?.response?.data || err?.message || "An error occurred,Please try again later")
    setIsLoading(false)
  }
  }
useEffect(()=>{
  if(stopUseEffect.current === false){
    const profileObj = JSON.parse(sessionStorage.getItem('userprofileinfo'))
    console.log(profileObj)
    setFirstName(profileObj.firstName)
    setLastName(profileObj.lastName)
  }
  stopUseEffect.current = true
},[])
  return (
    <Box w='100%' h='80%' display='grid' placeItems='center'>
      <Box display='flex' gap='5' flexDirection='column' w='80%' h='90%' borderRadius='10px' border='1px solid #fff'>
        <Box alignItems='center' justifyContent='space-between' display='flex' w='93%' pl='5' pt={5} gap={5}>
          <Text color='#fff' fontSize='1em'  fontWeight='500' >First Name:</Text>
          <Input value={firstName} disabled color='#000' bg='#fff' w='75%'/>
        </Box>
        <Box alignItems='center' justifyContent='space-between' display='flex' w='93%' pl='5' pt={5} gap={5}>
          <Text color='#fff' fontSize='1em'  fontWeight='500' >Last Name:</Text>
          <Input value={lastName} disabled color='#000' bg='#fff' w='75%'/>
        </Box>
        <Box alignItems='center' justifyContent='space-between' display='flex' w='93%' pl='5' pt={5} gap={5}>
          <Text color='#fff' fontSize='1em'  fontWeight='500' >Initial Password:</Text>
          <Input type={'password'} onChange={(e)=>setInitialPassword(e.target.value)} color='#000' bg='#fff' w='75%'/>
        </Box>
        <Box alignItems='center' justifyContent='space-between' display='flex' w='93%' pl='5' pt={5} gap={5}>
          <Text color='#fff' fontSize='1em'  fontWeight='500' >New Password:</Text>
          <Input type={'password'} onChange={(e)=>setNewPassword(e.target.value)} color='#000' bg='#fff' w='75%'/>
        </Box>
        <Button  onClick={changePassword} alignSelf='center' disabled={isLoading} isLoading={isLoading} _hover={{bg:colors.deg1color,color:'#fff'}} w='50%'>SUBMIT</Button>
          {success && <Text color='#00ff00' fontSize='1em'  fontWeight='500' >{success}</Text>   }
          {error && <Text color='#00ff00' fontSize='1em'  fontWeight='500' >{error}</Text>   }
      </Box>
    </Box>
  )
}

export default Updateprofile