import React from 'react'
import colors from '../../utils/colors'
import { Box,Text,Input,Button } from '@chakra-ui/react'
function Updatepaymentmethod() {
  return (
    <Box display='grid' placeItems='center' w='100%' h='80%'>
    <Box display='flex' alignItems='center' flexDirection='column' borderRadius='10px' w='80%' h='80%' border='1px solid #fff'>
      
        <Box mt='5' ml='5' gap='5' w='90%'>
        <Text color='#fff' fontWeight='500'>Your New Address (Must be BEP20:): </Text>
        <Input bg='#fff' w='60%' />
        </Box>
        <Button mt='5' _hover={{bg:colors.deg1color,color:'#fff'}} alignSelf='center'>SUBMIT</Button>
    </Box>
  </Box>
  )
}

export default Updatepaymentmethod