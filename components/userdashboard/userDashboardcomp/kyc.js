import { Box, Button, Input,Select,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import colors from '../../utils/colors'
import Image from 'next/image'
import axios from 'axios'
function Kyc() {
  const [selectedFile,setSelectedFile] = useState('')
  const [fileInputState,setFileInputState] = useState('')
  const [previewSource,setPreviewSource] = useState('')
  const [previewBack,setPreviewBack] = useState('')
  const [idtype,setIdType] = useState("Driver's Licence")
  const [idNuber,setIdNumber] = useState('')
  const [error,setError] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const [success,setSuccess] = useState('')
  const handleFileInputChange = (e) => {
    setSuccess('')
    setError('')
    const file = e.target.files[0];
    console.log(file)
    if(file?.type.toLowerCase().search('image') === -1){
      setError("File must be of type image")
      return   
    }
    if(file?.size > (1000 * 1000)){
      setError("Image size must be less than 1Megabytes,kindly resize your image")
      return
    }
    if(file){
    previewFile(file,setPreviewSource);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  }else{
    setPreviewSource('');
  }
};
const previewFile = (file,stateupdate)=>{
  setSuccess('')
  const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          stateupdate(reader.result);
            console.log(reader.result)
        };
}
const handleBackImageInputChange = (e)=>{
  setError('')
  const file = e.target.files[0];
  console.log(file)
  if(file?.type.toLowerCase().search('image') === -1){
    setError("File must be of type image")
    return   
  }
  if(file?.size > (1000 * 1000)){
    setError("Image size must be less than 1Megabytes,kindly resize your image")
    return
  }
  if(file){
    previewFile(file,setPreviewBack);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  }else{
    setPreviewBack('');
  }
}
const submitKycForm = async()=>{
  setIsLoading(true)
  setError('')
  if(idtype === '' || idNuber === '' || previewSource === '' || previewBack === ''){
    setError("All fields are required");
    setIsLoading(false)
    return
  }else{
    try{
  const submitNow = await axios({
    url:'/api/user/profile/uploadkyc',
    method: 'POST',
    headers: {'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_USER_AUTH_KEY)}`},
    data: JSON.stringify({idtype,idNuber,frontSide:previewSource,backSide:previewBack})
  })
  if(submitNow.status === 200){
    setSuccess('Kyc uploaded successfully.')
    setIsLoading(false)
  }
  setIsLoading(false)
}catch(e){
  setError(e?.response?.data || e?.message || e?.response.message || e?.response || "Error, Failed to upload Kyc,")
  setIsLoading(false)
}
}
}
  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='5' w='100%' h='80%'>
      <Box display='flex' mt='2' flexDirection='column' borderRadius='10px' w='80%' h='55%' border='1px solid #fff'>
        
          <Box display='flex' justifyContent='space-between' mt='2' ml='5' gap='5' w='70%'>
          <Text color='#fff' fontWeight='500'>ID TYPE: </Text>
          <Select onChange={(e)=>{setIdType(e.target.value)}} bg='#fff' w='60%'>
            <option>DRIVER{"'"}s LICENCE</option>
            <option>NATIONAL ID CARD</option>
            <option>PASSPORT</option>
          </Select>
          </Box>
          <Box display='flex' justifyContent='space-between'  mt='2' ml='5' gap='5' w='70%'>
          <Text color='#fff' fontWeight='500'>ID Number: </Text>
          <Input bg='#fff' onChange={(e)=>{setIdNumber(e.target.value)}} type='text' w='60%' />
          </Box>
          <Box display='flex' justifyContent='space-between'  mt='2' ml='5' gap='5' w='70%'>
          <Text color='#fff' fontWeight='500'>Upload Front Image: </Text>
          <Box w='60%'>
          <Input onChange={handleFileInputChange} bg='#fff' type='file' w='100%' name="image"/>
          <Text color={colors.deg3color} fontSize='0.8em'>Note: size must be less then or equal to 1mb </Text>
          </Box>
          </Box>
          <Box display='flex' justifyContent='space-between'  mt='2' ml='5' gap='5' w='70%'>
          <Text color='#fff' fontWeight='500'>Upload Back Image: </Text>
          <Box w='60%'>
          <Input onChange={handleBackImageInputChange} bg='#fff' type='file' w='100%' name="image"/>
          <Text color={colors.deg3color} fontSize='0.8em'>Note: size must be less then or equal to 1mb </Text>
          </Box>
          </Box>
          <Button mt='2'  isLoading={isLoading} disabled={isLoading} onClick={submitKycForm} _hover={{bg:colors.deg1color,color:'#fff'}} alignSelf='center'>SUBMIT</Button>
          {error !='' && <Text color='#ff0000' alignSelf='center' fontSize='0.8em'>{error}</Text>}
          {success !='' && <Text color='#00ff00' alignSelf='center' fontSize='0.8em'>{success}</Text>}
      </Box>
      <Box w='80%' display='flex' gap='5' h='50%'>
      {previewSource && <Image src={previewSource} height='250px' width='300px'/>}
      {previewBack && <Image src={previewBack} height='250px' width='300px'/>}
      </Box>
    </Box>
  )
}

export default Kyc