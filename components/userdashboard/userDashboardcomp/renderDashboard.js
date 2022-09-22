
import React, { useEffect, useState } from 'react'
import Dashboard from './dashboard'
import {Box,Menu, Button,MenuButton,Text,MenuItem,MenuList,IconButton,useMediaQuery} from '@chakra-ui/react';
import { HamburgerIcon,CloseIcon } from '@chakra-ui/icons'
import {useRouter} from 'next/router'
import colors from '../../utils/colors';
import Kyc from './kyc';
import Updatepaymentmethod from './updatepaymentmethod';
import Requestpayment from './requestpayment';
import Updateprofile from './updateprofile';
import Mobilesidebar from '../mobilesidebar';
import Wallet from '../wallet/wallet';
import Packagehistory from './packagehistory';
import CurrentPackages from './currentPackages'
import Pendingwithdrawals from './pendingwithdrawals';
function RenderDashboard({type}) {
    const [orgtype, setType] = useState('')
    const [isLargerthan950] = useMediaQuery('(min-width:950px)')
    const [recivedType,setRecievedType] = useState('');

    const [openDrawer , setOpendrawer] = useState(false)
    const handleOpenDrawer =(e)=>{
        setOpendrawer(e)
    }
    useEffect(()=>{
      setRecievedType(type)
      
    },[type])
    useEffect(()=>{
      console.log(orgtype);
      switch(recivedType.trim()){
        case 'updateprofile':
        case   'Update Profile':
          setType('Update Profile');
          break;
        case 'kyc':
        case 'Kyc':
          setType('Kyc');
          break;
        case 'requestwithdraw':
        case 'Request Withdraw' :
          setType('Request Withdraw');
          break;
        case 'updatepaymentmethod':
        case 'Update Payment Method':
          setType('Update Payment Method');
          break;
        case 'Wallet':
        case 'wallet':
          setType('Wallet');
          break;
        case 'currentpackages':
        case 'currentpackages':
          setType('current Packages');
          break;
        case 'historypackages':
        case 'historypackages':
          setType('History');
          break;
        case 'Pendingwithdrawals':
        case 'Pending Withdrawals':
          setType('Pending Withrawals');
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
    const logout=()=>{
      sessionStorage.removeItem(process.env.NEXT_PUBLIC_USER_AUTH_KEY)
      goto('/login')
    }
  return (<Box w={isLargerthan950 ?'80vw' :'100%'} h='100%'>
      <Box paddingRight={5} display='flex' w='100%' alignItems='center' h='10%' borderBottom='1px dotted #fff'>
    {!isLargerthan950 && <Button _focus={{bg:deg1color}} ml='5' color='#fff' onClick={(e)=>{setOpendrawer(val=>true)}} bg={deg1color} _active={{bg:deg1color}} boxShadow={`0px 0px 50px ${primarycolor}`} _selected={{bg:deg1color}} as={IconButton} icon={<HamburgerIcon />}/>}
            {!isLargerthan950 && <Mobilesidebar setProfileView={updateCurrentView} setDrawerState={handleOpenDrawer} opendrawer={openDrawer}/>}
            <Text fontSize='1.5em' fontWeight='900' color='#fff' flex='1' textAlign='center'>{orgtype.toUpperCase()}</Text>
          {isLargerthan950 &&  <Menu  bg={deg1color}>
            {({ isOpen }) => (
        <>
        <MenuButton color='#fff' bg={deg1color} _active={{bg:deg1color}} boxShadow={`0px 0px 50px ${primarycolor}`} _hover={{bg:deg1color}} _selected={{bg:deg1color}} as={IconButton} icon={!isOpen ?<HamburgerIcon />:<CloseIcon />} />
            <MenuList color='#fff'  style={{zIndex:'100'}} bg={primarycolor}>
                <MenuItem onClick={(e)=>{goto('/#faqs')}} _focus={{bg:deg3color}}> FAQ</MenuItem>
                <MenuItem onClick={(e)=>{goto('/#contactus')}} _focus={{bg:deg3color}}> Contact</MenuItem>
                <MenuItem onClick={logout} _focus={{bg:deg3color}}> Logout</MenuItem>
            </MenuList>
            </>
)}
    </Menu>}
        </Box>
        
    {(orgtype === 'Dashboard' )&& <Dashboard />}
    {(orgtype === 'Kyc' )&& <Kyc />}
    {(orgtype === 'Request Withdraw' )&& <Requestpayment />}
    {(orgtype === 'Update Payment Method' )&& <Updatepaymentmethod />}
    {(orgtype === 'Update Profile' )&& <Updateprofile />}
    {(orgtype === 'Wallet' )&& <Wallet />}
    {(orgtype === 'History' )&& <Packagehistory />}
    {(orgtype === 'current Packages' )&& <CurrentPackages />}
    {(orgtype === 'Pending Withrawals' )&& <Pendingwithdrawals />}
    </Box>
  )
}

export default RenderDashboard