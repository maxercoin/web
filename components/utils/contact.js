import React from 'react'
import {Box,Button,Input,Stack,Text, Textarea} from '@chakra-ui/react'
import colors from './colors'
function Contact() {
  return (
    <Box id='contactus' mb='5' display='flex' flexDirection='column' alignItems='center' w='100%' mt='5'>
        <Text color='#fff' fontWeight='bold' textAlign='center' textShadow='1px 2px #000' fontSize='1.5em'>CONTACT US</Text>
        <Stack display='flex' padding={1} paddingBottom={3} flexDirection='column' alignItems='center'spacing={4} w='70%' mt='2' border='1px solid #fff' borderRadius='5px'>
          
        <Input type='text' w='100%' bg='#fff' placeholder='Input your name: ' />
        <Input type='email' w='100%' bg='#fff' placeholder='Input your email: ' />
        <Textarea bg='#fff' placeholder='Your Message' />
        <Button _hover={{bg:colors.secondarycolor,color:'#fff'}} w='40%'>SUBMIT</Button>
        </Stack>
    </Box>
  )
}

export default Contact