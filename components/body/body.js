import { Box,Image as ChakraImg,Text } from '@chakra-ui/react'
import React,{useState} from 'react'
import colors from '../utils/colors'
import Image from 'next/image';

import styles from './body.module.css';
import Carouselcomponent from '../utils/carousel';
import About from '../utils/About';
import Faqs from '../utils/faqs';
import Contact from '../utils/contact';

function Bodycomponent({faq}) {
  
    const {primarycolor,secondarycolor,deg1color,deg2color,deg3color,primaryTextColor} = colors;
    
    
  return (
    <Box display='flex' flexDirection='column' alignItems='center' overflow='hidden' minH='90vh' w='100vw' bg={primarycolor} bgGradient={`linear(to-r,${primarycolor},${secondarycolor})`}>
       <Carouselcomponent />
       <About />
       <Faqs faq={faq}/>
       <Contact />
    </Box>
  )
}

export default Bodycomponent