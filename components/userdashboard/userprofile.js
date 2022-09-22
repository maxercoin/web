import { Accordion,Button, AccordionButton,useMediaQuery, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import homesvg from './assets/home.svg'
import colors from '../utils/colors'
import RenderDashboard from './userDashboardcomp/renderDashboard'
import Sidebar from './sidebar'
import Mobilesidebar from './mobilesidebar'
function Userprofile() {
  const [isLargerthan950] = useMediaQuery('(min-width:950px)')
  const [dashbordType,setDashboardType] = useState('')
  const {deg2color,secondarycolor} = colors;
  useEffect(()=>{
    setDashboardType(sessionStorage.getItem('activeSubmenu') ? sessionStorage.getItem('activeSubmenu') : 'Dashboard')
  },[])
  // const [acticemenu , setActiveMenu] = useState('Dashboard');
 
const handleSetUserView = (er)=>{
  setDashboardType(val=>er)
  
}
const activeStyle = {
  borderLeft:`5px solid ${deg2color}`,
  backgroundColor:secondarycolor
}
  return (
    <Box w='100vw' h='100vh' display='flex'>
   {isLargerthan950 && <Sidebar changeView ={handleSetUserView} />}
   {/* {!isLargerthan950 && <Mobilesidebar />} */}
    <RenderDashboard type={dashbordType}  />
    </Box>
  )
}

export default Userprofile