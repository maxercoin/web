import React,{useState,useEffect,useRef} from 'react'
import { Box, Button, IconButton, Input,Text,useToast,useMediaQuery } from '@chakra-ui/react'
import colors from '../../utils/colors'
import Packagescarousel from './packagescarousel'
import {CopyIcon} from '@chakra-ui/icons'
import Paymentstable from './paymentstable'
import dummydata from './dummydata'
import Payuser from './lightboxes/Payuser'
import axios from 'axios'
function Dashboard({payuser,refreshauth,updaterefresh}) {
  const [isLargerthan600] = useMediaQuery('(min-width:600px)')
  const dummyDeposits = dummydata.filter((val)=>{return val.status === 'Success'})
  const datatouse = dummydata.slice(0,5);
  const toast = useToast()
    const {deg1color} = colors
  const [userCount,setUserCount] = useState(0)

    const [error,setError] = useState('')
    const [packages,setPackages] = useState([])
    const [skip,setSkip] = useState(0)
    const [limit,setLimit] = useState(20)
    const [returned,setReturned] = useState(0)
    const [totalcounts,setTotalCounts] = useState(0)
    const stopUseEffect = useRef(false)
    const getAllUsers = async()=>{
      try{
        const allUserCount = await axios.get('/api/admin/platforminfo/totalusers')
        if(allUserCount.status === 200){
          setUserCount(allUserCount.data)
          console.log(allUserCount.data)
        }
      }catch(e){}
    }
    const getAllBalances = async()=>{
      try{
        const allUserCount = await axios.get('/api/admin/platforminfo/getallbalances')
        if(allUserCount.status === 200){
          // setUserCount(allUserCount.data)
          console.log(allUserCount.data)
        }
      }catch(e){}
    }
    
    const getRequests = async()=>{
        try{
          const result = await axios.get(`/api/package/getwithdrawalrequests?limit=${limit}&skip=${skip}`)
          if(result.status === 200){
            setPackages(result?.data?.requestsPackages)
            console.log(result.data)
          }
        }catch(e){
          setError(e?.response?.data || e?.message || "An error occured.")
          console.log(e)
        }
  }
  useEffect(()=>{
    if(refreshauth === true) stopUseEffect.current = false
    if(stopUseEffect.current === false){
      getRequests()
      getAllUsers()
      getAllBalances()
    }
    updaterefresh()
    stopUseEffect.current = true;
  },[refreshauth])

  return (
    <Box overflowY='scroll' className='dashboardscroll' w='100%' h='90%'>
        <Box   display='flex' flexWrap={'wrap'} gap='10'mt='5' h='max-content' pl={10} w='100%' color='#fff'>
          <Box borderRadius='10px'  gap='5' w='200px' h='200px' display='flex' bg={deg1color} flexDirection='column' alignItems='center' justifyContent='center'>
            <Text fontSize='1.2em' fontWeight='medium'>Total Users: </Text>
            <Text>{userCount || '0'}</Text>
          </Box>
          {/* <Box borderRadius='10px'  gap='5' w='200px' h='200px' display='flex' bg={deg1color} flexDirection='column' alignItems='center' justifyContent='center'>
            <Text fontSize='1.2em' fontWeight='medium'>Withdrawals: </Text>
            <Text>$0</Text>
          </Box>  
          <Box borderRadius='10px'  gap='5' w='200px' h='200px' display='flex' bg={deg1color} flexDirection='column' alignItems='center' justifyContent='center'>
            <Text fontSize='1.2em' fontWeight='medium' textAlign='center'>Total Active Investment: </Text>
            <Text>$0</Text>
          </Box>   */}
           
        </Box>
        <Paymentstable type='Withdraw' payuser={payuser} data={packages?.slice(0,5)}/>
        {/* <Packagescarousel /> */}
    </Box>
  )
}

export default Dashboard