import React from 'react'
import { Box, Button, Input,Select,Text } from '@chakra-ui/react'
import colors from '../../utils/colors'
function Requestpayment() {
  return (
    <Box display='grid' placeItems='center' w='100%' h='80%'>
    <Box display='flex' flexDirection='column' borderRadius='10px' w='80%' h='80%' border='1px solid #fff'>
      
    <Box justifyContent='space-between'  display='flex' mt='5' ml='5' gap='5' w='70%'>
        <Text color='#fff' fontWeight='500'>BALANCE: </Text>
          <Box w='60%'>
           <Text color='#fff' fontWeight='500'>$0 </Text>
          </Box>
        </Box>
        <Box justifyContent='space-between' display='flex' mt='5' ml='5' gap='5' w='70%'>
        <Text color='#fff' fontWeight='500'>Payment Type: </Text>
        <Select bg='#fff' w='60%'>
          <option>USDT</option>
          <option>BNB</option>
        </Select>
        </Box>
        <Box justifyContent='space-between'  display='flex' mt='5' ml='5' gap='5' w='70%'>
        <Text color='#fff' fontWeight='500'>AMOUNT: </Text>
        <Input bg='#fff' type='number' w='60%' />
        </Box>
      
        <Button mt='5' _hover={{bg:colors.deg1color,color:'#fff'}} alignSelf='center'>SUBMIT</Button>
    </Box>
  </Box>
  )
}

export default Requestpayment