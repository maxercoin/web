import { Accordion,Button, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,useMediaQuery, Box, Text } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import homesvg from './assets/home.svg'
import colors from '../utils/colors'
import axios from 'axios'
function Sidebar({changeView}) {
    const {deg2color,secondarycolor} = colors;
    const [isLargerthan950] = useMediaQuery('(min-width:950px)')
    const [acticemenu , setActiveMenu] = useState('Dashboard');
    const [activeSubmenu,setActiveSubmenu] =useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [userName,setUserName] = useState('');

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
    
const handlePackages = ()=>{
  setActiveMenu('Account')
  sessionStorage.setItem('activeSubmenu','packages')
  sessionStorage.setItem('activemenu','Account')
  setActiveSubmenu('packages')
  changeView('Packages')
}
  const handleDashboardClicked = ()=>{
    setActiveMenu('Dashboard')
    setActiveSubmenu('')
    changeView('Dashboard')
    sessionStorage.setItem('activemenu','Dashboard')
    sessionStorage.removeItem('activeSubmenu')
  }
  const handleCms= ()=>{
    setActiveMenu('Account')
    sessionStorage.setItem('activeSubmenu','updateFaqs')
    sessionStorage.setItem('activemenu','Account')
    setActiveSubmenu('updateFaqs')
    changeView('Update FAQS')
  }
  const handleKyc = ()=>{
    setActiveMenu('Account')
    sessionStorage.setItem('activemenu','Account')
    sessionStorage.setItem('activeSubmenu','kyc')
    setActiveSubmenu('kyc')
    changeView('Kyc')
  }
  const handleRequestWithdraw = ()=>{
    setActiveMenu('Finance')
    sessionStorage.setItem('activemenu','Finance')
    setActiveSubmenu('withdraw')
    sessionStorage.setItem('activeSubmenu','withdraw')
    changeView('Withdraw')
  }
  const handlePaymentMethodUpdate = ()=>{
    setActiveMenu('Finance')
    sessionStorage.setItem('activemenu','Finance')
    setActiveSubmenu('pendingwithdraw')
    sessionStorage.setItem('activeSubmenu','pendingwithdraw')
    changeView('Pending Withdraw')
  }
  const handleActivePackages = ()=>{
    setActiveMenu('Finance')
    sessionStorage.setItem('activemenu','Finance')
    setActiveSubmenu('activepackages')
    sessionStorage.setItem('activeSubmenu','activepackages')
    changeView('Active Packages')
  }
  const handleKycVerification = ()=>{
    setActiveMenu('Finance')
    sessionStorage.setItem('activemenu','Finance')
    setActiveSubmenu('KycVerification')
    sessionStorage.setItem('activeSubmenu','KycVerification')
    changeView('kyc verification')
  }
  const activeStyle = {
    borderLeft:`5px solid ${deg2color}`,
    backgroundColor:secondarycolor
  }
  const fetchAdminProfile = async() =>{
    const adminProfile = await axios({
      headers: {'Content-Type': 'application/json','Authorization':`Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)}`},
      url:`/api/admin/platforminfo/getprofile`,
      method:'GET'
    })
    if(adminProfile.status === 200){
      console.log(adminProfile.data)
      const result = adminProfile.data
      setFirstName(result.firstName)
      setLastName(result.lastName)
      setEmail(result.email)
      setUserName(result.userName)
    }else{
      console.log(adminProfile)
    }
  }
  useEffect(() =>{
    fetchAdminProfile()
  },[])
  return (
    <Box color='#fff' overflow='scrollable' width={isLargerthan950?'20vw':'100%'} borderRadius='10px' h={isLargerthan950?'100vh':'100%'} borderRight='1px dotted #fff'>
        <Box w='100%' borderRadius='5px' h='30vh' overflowY='scroll' className='dashboardscroll' borderBottom='1px solid #fff' >
          <Text paddingLeft={5} fontSize='1.5em' color='#fff' fontWeight='bold'>WELCOME BACK!</Text>
          <Text paddingLeft={5} fontSize='1.2em' color='#fff' fontWeight='medium'>{(userName) ||'Loading....'}</Text>
          <Text paddingLeft={5} fontSize='1.2em' color='#fff' fontWeight='medium'>{(firstName + " " + lastName) ||'Loading....'}</Text>
          <Text paddingLeft={5} fontSize='1.2em' color='#fff' fontWeight='medium'>{(email) ||'Loading....'}</Text>
        </Box>
        <Box mt={5} gap='3' pl={2} display='flex' style={acticemenu === 'Dashboard' ? activeStyle:{}}  onClick={handleDashboardClicked} cursor='pointer'>
            <Image alt='Home Svg' src={homesvg} width='20px' height='20px' />
            <Text fontSize='1.2em' fontWeight='600'>Dashboard</Text>
        </Box>
        <Accordion allowToggle allowMultiple>
          <AccordionItem key='firstaccordionkey'>
            <AccordionButton style={acticemenu === 'Account' ? activeStyle:{}}>
              <Box  flex={1} textAlign='left'>
                  <Text fontWeight='500'>CMS</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel _hover={{cursor:'pointer'}}>
              <Text borderTop='1px dashed #fff'  flex={1} style={activeSubmenu === 'updateFaqs' ? activeStyle:{}} onClick={handleCms} textAlign='right'>FAQS</Text>
              <Text borderTop='1px dashed #fff'  flex={1} style={activeSubmenu === 'packages' ? activeStyle:{}} onClick={handlePackages} textAlign='right'>Packages</Text>
              {/* <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'kyc' ? activeStyle:{}} textAlign='right' onClick={handleKyc}>KYC</Text> */}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem key='secondaccordionkey'>
            <AccordionButton style={acticemenu === 'Finance' ? activeStyle:{}}>
              <Box flex={1} textAlign='left'>
                  <Text fontWeight='500'>Users Management</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel _hover={{cursor:'pointer'}}>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'pendingwithdraw' ? activeStyle:{}} onClick={handlePaymentMethodUpdate} textAlign='right'>Withdrawal Requests</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'withdraw' ? activeStyle:{}} onClick={handleRequestWithdraw} textAlign='right'>Withdrawal History</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'activepackages' ? activeStyle:{}} onClick={handleActivePackages} textAlign='right'>Active Packages</Text>
              <Text borderTop='1px dashed #fff' flex={1} style={activeSubmenu === 'KycVerification' ? activeStyle:{}} onClick={handleKycVerification} textAlign='right'>KYC VERIFICATION</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
    </Box>
  )
}

export default Sidebar