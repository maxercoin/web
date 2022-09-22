import { Accordion,Button, AccordionButton,useMediaQuery, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import homesvg from './assets/home.svg'
import colors from '../utils/colors'
import RenderDashboard from './userDashboardcomp/renderDashboard'
import Sidebar from './sidebar'
import Mobilesidebar from './mobilesidebar'
import Payuser from './userDashboardcomp/lightboxes/Payuser'
function Adminprofile() {
  const [isLargerthan950] = useMediaQuery('(min-width:950px)')
  const [dashbordType,setDashboardType] = useState('')
  const [showPayuser,setShowPayUser] = useState(false)
  const [payuserdata,setPayuserData] = useState({})
  const [refreshtoken,setRefreshToken] = useState(false)
  const {deg2color,secondarycolor} = colors;
  useEffect(()=>{
    setDashboardType(sessionStorage.getItem('activeSubmenu') ? sessionStorage.getItem('activeSubmenu') : 'Dashboard')
  },[])
  // const [acticemenu , setActiveMenu] = useState('Dashboard');
 
const handleSetUserView = (er)=>{
  setDashboardType(val=>er)
  
}
const handlePayuserView = (val)=>{
  setShowPayUser(val?.open)
  setPayuserData(val?.data)
}
const refresh = ()=>{
  setRefreshToken(true)
}
const updaterefresh=()=>{
  setRefreshToken(false)

}
const activeStyle = {
  borderLeft:`5px solid ${deg2color}`,
  backgroundColor:secondarycolor
}
const handleClosePayuser = (val)=>{
  setShowPayUser(false)
}
  return (
    <Box w='100vw' h='100vh' display='flex'>
      {showPayuser && <Payuser itemdata={payuserdata} refresh={refresh} close={handleClosePayuser}/>}
   {isLargerthan950 && <Sidebar changeView ={handleSetUserView} />}
   {/* {!isLargerthan950 && <Mobilesidebar />} */}
    <RenderDashboard chnagepayuserview={handlePayuserView} refreshauth={refreshtoken} updaterefresh={updaterefresh} type={dashbordType}  />
    </Box>
  )
}

export default Adminprofile