import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function About() {
  return (
    <Box id='about' mt='5' display='grid' placeItems='center' width='95%' overflow='hidden'>
        <Box w='95%'>
            <Text textShadow='1px 2px #000' fontSize='1.5em' color='#fff' textAlign='center' fontWeight='bold'>ABOUT US</Text>
            <Text fontSize='1em' color='#fff' textAlign='center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry{"'"}s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
        </Box>
    </Box>
  )
}

export default About