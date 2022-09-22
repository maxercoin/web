import React from 'react'
import { Box,Image as ChakraImg,Text,Button,useMediaQuery } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './packagecarousel.module.css';
import colors from '../../utils/colors';
function Packagescarousel() {
  const [isLargerthan600] = useMediaQuery('(min-width:600px)')
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
          }
    }
    const carouselBoxes ={
      display:'grid',
      placeItems:'center',  
    }
   const packages = [
    {Name:"Platinum",Amount:'$100', color:'silver',roi:'2.5%',yieldPeriod:'Monthly'},
    {Name:"Bronze",Amount:'$500', color:'green',roi:'2.5%',yieldPeriod:'Monthly'},
    {Name:"Gold",Amount:'$500', color:'gold',roi:'2.5%',yieldPeriod:'Monthly'},
    {Name:"Platinum",Amount:'$100', color:'silver',roi:'2.5%',yieldPeriod:'Monthly'},
    {Name:"Bronze",Amount:'$500', color:'green',roi:'2.5%',yieldPeriod:'Monthly'},
    {Name:"Gold",Amount:'$500', color:'gold',roi:'2.5%',yieldPeriod:'Monthly'},
]
  return (
    <Box w='100%' h='400px' mt='5' mb='5' pl={isLargerthan600 ?'10':'2'}  >
    <Carousel draggable swipeable itemClass={styles.items}  responsive={responsive}>
    {packages.map((v,index)=>{
        return <Box key={`packagecarousel${index}`} borderRadius='10px' display='flex' flexDirection='column' gap={10} alignItems='center' color='#fff' w='250px' h='350px' bg={colors.deg3color}>
            <Text fontSize='1.3em' fontWeight='bold'>{v.Name}</Text>
            <Text>Amount: {v.Amount}</Text>
            <Text>ROI: {v.roi}</Text>
            <Text>Yeield Period: {v.yieldPeriod}</Text>
            <Button w='200px' bg={colors.primarycolor} h='50px' _hover={{bg:colors.secondarycolor}} color='#fff' fontSize='1em'>BUY NOW</Button>
        </Box>
    })}
</Carousel>
</Box>
  )
}

export default Packagescarousel