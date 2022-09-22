
import React, { useEffect, useState } from 'react'
import Dashboard from './dashboard'
import {Box,Menu, Button,MenuButton,Text,MenuItem,MenuList,IconButton,useMediaQuery} from '@chakra-ui/react';
import { HamburgerIcon,CloseIcon } from '@chakra-ui/icons'
import {useRouter} from 'next/router'
import colors from '../../utils/colors';
import Kyc from './kyc';
import Pendingwithdraw from './Pendingwithdraw';
import Requestpayment from './requestpayment';
import Updatefaqs from './updatefaqs';
import Mobilesidebar from '../mobilesidebar';
import { faListSquares } from '@fortawesome/free-solid-svg-icons';
import Packageupdate from './packageupdate';
import Payuser from './lightboxes/Payuser';
import Activepackages from './activepackages';
function RenderDashboard({type,chnagepayuserview,updaterefresh,refreshauth}) {
    const [orgtype, setType] = useState('')
    const [isLargerthan950] = useMediaQuery('(min-width:950px)')
    const [recivedType,setRecievedType] = useState('');
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    const [openDrawer , setOpendrawer] = useState(false)
    const handleOpenDrawer =(e)=>{
        setOpendrawer(e)
    }
    useEffect(()=>{
      if(!sessionStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)){
        goto('/admin/login')
      }else{
        setIsAuthenticated(true)
      }
    })
    useEffect(()=>{
      setRecievedType(type)
      
    },[type])
    useEffect(()=>{
      console.log(orgtype);
      switch(recivedType.trim()){
        case 'updateFaqs':
        case   'Update FAQS':
          setType('Update FAQS');
          break;
        case 'kyc':
        case 'Kyc':
          setType('Kyc');
          break;
        case 'withdraw':
        case 'Withdraw' :
          setType('Withdrawal History');
          break;
        case 'Packages':
        case 'packages' :
          setType('Packages');
          break;
        case 'pendingwithdraw':
        case 'Pending Withdraw':
          setType('Pending Withdraw');
          break;
        case 'activepackages':
        case 'Active Packages':
          setType('Active Packages');
          break;
        case 'kyc verification':
        case 'KycVerification':
          setType('kyc verification');
          break;
        default:
          setType('Dashboard');
      }
    },[recivedType])
    const updateCurrentView = (value)=>{
      setRecievedType((v)=>value)
    }
    const {push:goto} = useRouter()
    const {deg1color,deg3color,primarycolor} = colors
    const logoutUser = ()=>{
      sessionStorage.removeItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)
      goto('/')
    }
  return (<Box w={isLargerthan950 ?'80vw' :'100%'} h='100%'>
    {/* <Payuser /> */}
    {isAuthenticated && <>
      <Box paddingRight={5} display='flex' w='100%' alignItems='center' h='10%' borderBottom='1px dotted #fff'>
    {!isLargerthan950 && <Button _focus={{bg:deg1color}} ml='5' color='#fff' onClick={(e)=>{setOpendrawer(val=>true)}} bg={deg1color} _active={{bg:deg1color}} boxShadow={`0px 0px 50px ${primarycolor}`} _selected={{bg:deg1color}} as={IconButton} icon={<HamburgerIcon />}/>}
            {!isLargerthan950 && <Mobilesidebar setProfileView={updateCurrentView} setDrawerState={handleOpenDrawer} opendrawer={openDrawer}/>}
            <Text fontSize='1.5em' fontWeight='900' color='#fff' flex='1' textAlign='center'>{orgtype.toUpperCase()}</Text>
          {isLargerthan950 &&  <Menu  bg={deg1color}>
            {({ isOpen }) => (
        <>
        <MenuButton color='#fff' bg={deg1color} _active={{bg:deg1color}} _hover={{bg:deg1color}} boxShadow={`0px 0px 50px ${primarycolor}`} _selected={{bg:deg1color}} as={IconButton} icon={!isOpen ?<HamburgerIcon _active={{bg:deg1color}} _hover={{bg:deg1color}}/>:<CloseIcon />} />
            <MenuList color='#fff'  style={{zIndex:'100'}} bg={primarycolor}>
                <MenuItem onClick={(e)=>{goto('/#faqs')}} _focus={{bg:deg3color}}> FAQ</MenuItem>
                <MenuItem onClick={(e)=>{goto('/#contactus')}} _focus={{bg:deg3color}}> Contact</MenuItem>
                <MenuItem onClick={logoutUser}  _focus={{bg:deg3color}}> Logout</MenuItem>
            </MenuList>
            </>
)}
    </Menu>}
        </Box>
        
    {(orgtype === 'Dashboard' )&& <Dashboard updaterefresh={updaterefresh} refreshauth={refreshauth} payuser={chnagepayuserview} />}
    {(orgtype === 'Kyc' )&& <Kyc />}
    {(orgtype === 'Withdrawal History' )&& <Requestpayment payuser={chnagepayuserview} />}
    {(orgtype === 'Pending Withdraw' )&& <Pendingwithdraw updaterefresh={updaterefresh} refreshauth={refreshauth} payuser={chnagepayuserview}/>}
    {(orgtype === 'Update FAQS' )&& <Updatefaqs />}
    {(orgtype === 'Packages' )&& <Packageupdate />}
    {(orgtype === 'Active Packages' )&& <Activepackages />}
    {(orgtype === 'kyc verification' )&& <Kyc />}
    </>}
    </Box>
  )
}

export default RenderDashboard