import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Box
  } from '@chakra-ui/react'
  import colors from '../utils/colors'
  import React, { useEffect } from 'react'
  import { useRouter } from 'next/router'
import Sidebar from './sidebar'
function Mobilesidebar({opendrawer,setDrawerState,setProfileView}) {
    const {push:goto} = useRouter()
    const {primarycolor,deg3color} =colors
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    useEffect(()=>{
        if(opendrawer === true){

            onOpen()
            setDrawerState(false)
        }
    },[opendrawer])
    
    const logoutUser = ()=>{
      sessionStorage.removeItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)
      goto('/')
    }
    
  return (
    
      <Drawer
      
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}

      >
        <DrawerOverlay w='100vw'/>
        <DrawerContent bg={primarycolor}>
          <DrawerCloseButton color='#fff' border='1px solid #fff' borderRadius='50%' />
          <DrawerBody bg={primarycolor} padding={0} >
          <Sidebar changeView={setProfileView}/>
          </DrawerBody>
          <DrawerFooter borderRight='1px dotted #fff' borderBottomRightRadius='10px' color='#fff' borderTop='1px dotted #fff' bg={primarycolor} display='flex' flexDirection='column' alignItems='flex-start'>
                 <Box  onClick={(e)=>{goto('/#faqs')}} _focus={{bg:deg3color}}> FAQ</Box>
                <Box onClick={(e)=>{goto('/#contactus')}} _focus={{bg:deg3color}}> Contact</Box>
                <Box onClick={logoutUser}  _focus={{bg:deg3color}}> Logout</Box>
          </DrawerFooter>
        </DrawerContent>
        
      </Drawer>
  )
  }
  
  export default Mobilesidebar