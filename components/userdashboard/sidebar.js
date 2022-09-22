import { Accordion,Button, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,useMediaQuery, Box, Text } from '@chakra-ui/react'
import React,{useState,useEffect, useRef} from 'react'
import Image from 'next/image'
import homesvg from './assets/home.svg'
import colors from '../utils/colors'
import axios from 'axios' 
function Sidebar({changeView}) {
    const {deg2color,secondarycolor} = colors;
    const [isLargerthan950] = useMediaQuery('(min-width:950px)')
    const [acticemenu , setActiveMenu] = useState('Dashboard');
    const [activeSubmenu,setActiveSubmenu] =useState('');
    const [firstName,setFirstName] = useState('Loading...');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('Loading...');
    const [userName,setUserName] = useState('Loading...');
    let stopUsefFect = useRef(false)
    useEffect(()=>{
      if(sessionStorage.getItem('activemenu')){
        setActiveMenu(sessionStorage.getItem('activemenu'))
        if(sessionStorage.getItem('activemenu') === 'Dashboard'){
          changeView('Dashboard')
        }
      }
      if(sessionStorage.getItem('activeSubmenu')){
        setActiveSubmenu(sessionStorage.getItem('activeSubmenu'))
        
      }
    },[])
    

  const handleDashboardClicked = ()=>{
    setActiveMenu('Dashboard')
    setActiveSubmenu('')
    changeView('Dashboard')
    sessionStorage.setItem('activemenu','Dashboard')
    sessionStorage.removeItem('activeSubmenu')
  }
  const handleUpdateProfile = ()=>{
    setActiveMenu('Account')
    sessionStorage.setItem('activeSubmenu','updateprofile')
    sessionStorage.setItem('activemenu','Account')
    setActiveSubmenu('updateprofile')
    changeView('Update Profile')
  }
  const handleKyc = ()=>{
    setActiveMenu('Account')
    sessionStorage.setItem('activemenu','Account')
    sessionStorage.setItem('activeSubmenu','kyc')
    setActiveSubmenu('kyc')
    changeView('Kyc')
  }
  const handlePendingwithdrawals = ()=>{
    setActiveMenu('Account')
    sessionStorage.setItem('activemenu','Account')
    sessionStorage.setItem('activeSubmenu','Pendingwithdrawals')
    setActiveSubmenu('Pendingwithdrawals')
    changeView('Pendingwithdrawals')
  }
  const handleCurrentPackage = ()=>{
    setActiveMenu('Account')
    sessionStorage.setItem('activemenu','Account')
    sessionStorage.setItem('activeSubmenu','currentpackages')
    setActiveSubmenu('currentpackages')
    changeView('currentpackages')
  }
  const handleHistoryPackage = ()=>{
    setActiveMenu('Account')
    sessionStorage.setItem('activemenu','Account')
    sessionStorage.setItem('activeSubmenu','historypackages')
    setActiveSubmenu('historypackages')
    changeView('historypackages')
  }
  const handleRequestWithdraw = ()=>{
    setActiveMenu('Finance')
    sessionStorage.setItem('activemenu','Finance')
    setActiveSubmenu('requestwithdraw')
    sessionStorage.setItem('activeSubmenu','requestwithdraw')
    changeView('Request Withdraw')
  }
  const handleWallet = ()=>{
    setActiveMenu('Finance')
    sessionStorage.setItem('activemenu','Finance')
    setActiveSubmenu('wallet')
    sessionStorage.setItem('activeSubmenu','wallet')
    changeView('wallet')
  }
  const handlePaymentMethodUpdate = ()=>{
    setActiveMenu('Finance')
    sessionStorage.setItem('activemenu','Finance')
    setActiveSubmenu('updatepaymentmethod')
    sessionStorage.setItem('activeSubmenu','updatepaymentmethod')
    changeView('Update Payment Method')
  }
  const activeStyle = {
    borderLeft:`5px solid ${deg2color}`,
    backgroundColor:secondarycolor
  }

  const getUserProfile = async()=>{
    // try{
    //   const userData = await axios.get('/api/user/profile/getuserprofile?user_id=' + sessionStorage.getItem("user_id"))
    //   if(userData.status === 200){
    //     setFirstName(v=>userData.data.firstName)
    //     setLastName(v=>userData.data.lastName)
    //     setEmail(v=>userData.data.email)
    //     setUserName(v=>userData.data.userName)
    //     sessionStorage.setItem("userprofileinfo",JSON.stringify(userData.data))
    //     console.log(userData)
    //   }
    //   console.log(userData)
    // }catch(e){
    //   console.log('Error')
    // }
    const userData = JSON.parse(sessionStorage.getItem("userprofileinfo"))
    console.log(userData)
    setFirstName(v=>userData?.firstName)
    setLastName(v=>userData?.lastName)
    setEmail(v=>userData?.email)
    setUserName(v=>userData?.userName)
  }
  useEffect(()=>{
    if(stopUsefFect.current === false){
      getUserProfile()
    }
    stopUsefFect.current = true
  },[])
  return (
    <Box color='#fff' overflow='scrollable' width={isLargerthan950?'20vw':'100%'}  borderRadius='10px' h={isLargerthan950?'100vh':'100%'} borderRight='1px dotted #fff'>
        <Box w='100%' borderRadius='5px' h='30vh' overflowY='scroll' className='dashboardscroll' borderBottom='1px solid #fff' >
          <Text paddingLeft={5} fontSize='1.5em' color='#fff' fontWeight='bold'>WELCOME BACK!</Text>
          <Text paddingLeft={5} fontSize='1em' color='#fff' fontWeight='medium'>{firstName + " " + lastName}</Text>
          <Text paddingLeft={5} fontSize='1em' color='#fff' fontWeight='medium'>{userName}</Text>
          <Text paddingLeft={5} fontSize='1em' color='#fff' fontWeight='medium'>{email}</Text>
          {/* <Box mt={5} display='flex'>
            <Text paddingLeft={5} fontSize='0.8em' color='#fff' fontWeight='mediums'>Package Worth:</Text>
            <Text paddingLeft={5} fontSize='0.8em' color='#fff' fontWeight='medium'>$0</Text>
          </Box>
          <Box display='flex'>
            <Text paddingLeft={5} fontSize='0.8em' color='#fff' fontWeight='medium'>Profit:</Text>
            <Text paddingLeft={5} fontSize='0.8em' color='#fff' fontWeight='medium'>$0</Text>
          </Box>
          <Box display='flex'>
            <Text paddingLeft={5} fontSize='0.8em' color='#fff' fontWeight='medium'>Kyc:</Text>
            <Text paddingLeft={5} fontSize='0.8em' color='#fff' fontWeight='medium'>Not Verified</Text>
          </Box> */}
        </Box>
        <Box mt={5} gap='3' pl={2} display='flex' style={acticemenu === 'Dashboard' ? activeStyle:{}}  onClick={handleDashboardClicked} cursor='pointer'>
            <Image alt='Home Svg' src={homesvg} width='20px' height='20px' />
            <Text fontSize='1.2em' fontWeight='600'>Dashboard</Text>
        </Box>
        <Accordion allowToggle allowMultiple>
          <AccordionItem key='firstaccordionkey'>
            <AccordionButton style={acticemenu === 'Account' ? activeStyle:{}}>
              <Box  flex={1} textAlign='left'>
                  <Text fontWeight='500'>Account</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel _hover={{cursor:'pointer'}}>
              <Text borderTop='1px dashed #fff'  flex={1} style={activeSubmenu === 'updateprofile' ? activeStyle:{}} onClick={handleUpdateProfile} textAlign='right'>Update Profile</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'kyc' ? activeStyle:{}} textAlign='right' onClick={handleKyc}>KYC</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'currentpackages' ? activeStyle:{}} textAlign='right' onClick={handleCurrentPackage}>Current Packages</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'Pendingwithdrawals' ? activeStyle:{}} textAlign='right' onClick={handlePendingwithdrawals}>My Pending Withdrawals</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'historypackages' ? activeStyle:{}} textAlign='right' onClick={handleHistoryPackage}>History</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem key='secondaccordionkey'>
            <AccordionButton style={acticemenu === 'Finance' ? activeStyle:{}}>
              <Box flex={1} textAlign='left'>
                  <Text fontWeight='500'>Finance</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel _hover={{cursor:'pointer'}}>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'wallet' ? activeStyle:{}} onClick={handleWallet} textAlign='right'>Wallet</Text>
              {/* <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'requestwithdraw' ? activeStyle:{}} onClick={handleRequestWithdraw} textAlign='right'>Request Withdrawal</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'updatepaymentmethod' ? activeStyle:{}} onClick={handlePaymentMethodUpdate} textAlign='right'>Update Payment method</Text> */}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
    </Box>
  )
}

export default Sidebar