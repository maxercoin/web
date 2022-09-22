import React from 'react'
import {Box,Text,Button} from '@chakra-ui/react'
import colors from '../../utils/colors'
function Warningpop({warningText,runThis,cancel}) {
    
  return (
    <Box w='100%'display='grid' placeItems='center' position='absolute' zIndex={5} inset='0' h='100%' bg='rgba(0,0,0,0.5)'>
        <Box w='30rem' h='20rem' border='1px solid #fff' display='grid' placeItems='center' borderRadius='10px'style={{backgroundColor:'#fff'}}  color='#fff'>
            <Text textAlign='center' fontSize='1.5em' color='#000' fontWeight='900'>{warningText}</Text>
            <Box w='100%' display='flex' gap='5' justifyContent='center'>
            <Button m='2' bg={colors.deg3color} onClick={runThis} _hover={{bg:colors.deg1color,color:'#fff'}}>YES</Button>
                <Button m='2' bg={colors.primarycolor} onClick={cancel}  _hover={{bg:colors.deg1color,color:'#fff'}}>NO</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default Warningpop