import { Accordion, AccordionButton, AccordionItem,Box,AccordionIcon,AccordionPanel,Text } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
function Faqs({faq}) {
  const [savedFaqs,setSavedFaqs] = useState([])
    
    useEffect(() =>{
      setSavedFaqs(faq)
     
    },[])
  return (
    <Box id='faqs' mt='5' w='100%' display='grid' placeItems='center'>
        <Text textShadow='1px 2px #000' color='#fff' fontSize='1.5em' fontWeight='900'>FAQS</Text>
    <Accordion allowToggle color='#fff' border='1px #fff solid' borderRadius='5px'  width='90%'  >
        
        {savedFaqs.map(((v,i)=>{
            return   <AccordionItem key={`homeaccordion${i}`} borderBottom='1px solid #fff' borderBottomRadius='5px'>
            <h2>
              <AccordionButton >
                <Box flex='1' textAlign='left'>
                  {v.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
             {v.content}
            </AccordionPanel>
          </AccordionItem>
        }))}
       
    </Accordion>
    </Box>
  )
}

export default Faqs