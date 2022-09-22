import React, { useEffect,useState,useRef }  from 'react'
import { Box,Image as ChakraImg,Text,Button,useMediaQuery } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './packagecarousel.module.css';
import colors from '../../utils/colors';
import axios from 'axios'
import Buypackagebox from '../../lightboxes.js/buypackagebox';
function Packagescarousel() {
  const stopUseEffect = useRef(false)
  const [packages,setPackages] = useState([])
  const [isLargerthan600] = useMediaQuery('(min-width:600px)')
  const [packageToBuyId,setPackageToBuyID] = useState('')
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
    const cancel = () =>{
      setPackageToBuyID('')
    }
const buyPackageHandler = (id)=>{
  setPackageToBuyID(id)
}
const getAllPackages = async()=>{
  let storedItems = JSON.parse(localStorage.getItem("packagesstored")) ? JSON.parse(localStorage.getItem("packagesstored")) : []
  setPackages(v=>[...storedItems])
  try{
    const packagesRaw = await axios.get('/api/admin/updateinfo/packages')
    if(packagesRaw.status === 200){
      console.log(packagesRaw.data.items)
      localStorage.setItem("packagesstored",JSON.stringify(packagesRaw.data.items))
      setPackages(v=>packagesRaw.data.items)
    }
  }catch(e){
    console.log(e)
  }
  
}
useEffect(()=>{
  if(stopUseEffect.current === false){
    getAllPackages();
  }
  stopUseEffect.current = true;
},[])
  return (
    <Box w='100%' h='400px' mt='5' mb='5' pl={isLargerthan600 ?'10':'2'}  >
      {packageToBuyId != '' && <Buypackagebox cancel={cancel} packageId = {packageToBuyId}/>}
    {packages.length > 0 &&<Carousel draggable swipeable itemClass={styles.items}  responsive={responsive}>
    { packages.map((v,index)=>{
        return <Box key={`packagecarousel${index}`} borderRadius='10px' mr='10' display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' color={v.textsColor} w='250px' h='350px' bg={v.primarycolor}>
            <Text fontSize='1.3em' fontWeight='bold'>{v.Name}</Text>
            <Text fontSize='1em' fontWeight='medium'>{v.Amount} USD</Text>
            <Text fontSize='1em' fontWeight='medium'>{v.bnbworth} BNB</Text>
            <Text fontSize='1em' fontWeight='medium'>{v.ethworth} ETH</Text>
            <Text>ROI: {v.roi} %</Text>
            <Text>Yeield Period: {v.yieldPeriod} days</Text>
            <Button w='200px' bg={colors.primarycolor} h='50px' onClick={(e)=>buyPackageHandler(v._id)} _hover={{bg:colors.secondarycolor}} color='#fff' fontSize='1em'>BUY NOW</Button>
        </Box>
    })}
    
</Carousel>}
{packages.length === 0 && <Text fontSize='1.5em' color='#fff' fontWeight='900'>NO PACKAGE AVAILABLE CHCEK BACK</Text>}
</Box>
  )
}

export default Packagescarousel