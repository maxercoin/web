import React, { useEffect,useState,useRef } from 'react'
import { Box, Button, Input,Select,Text } from '@chakra-ui/react'
import colors from '../../utils/colors'
import dummydata from './dummydata'
import Paymentstable from './paymentstable'
import axios from 'axios'
function Activepackages({payuser}) {
  const [error,setError] = useState('')
  const [packages,setPackages] = useState([])
  const [skip,setSkip] = useState(0)
  const [limit,setLimit] = useState(20)
  const [returned,setReturned] = useState(0)
  const [totalcounts,setTotalCounts] = useState(0)
  const stopUseEffect = useRef(false)
  const getRequests = async()=>{
      try{
        const result = await axios.get(`/api/package/getactivepackages?limit=${limit}&skip=${skip}`)
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
  if(stopUseEffect.current === false){
    getRequests()
  }
  stopUseEffect.current = true;
},[])
  const dummyDeposits = dummydata.filter((val)=>{return val.status === 'Pending Withdraw'})
  return (
    <Box h='87%' overflowY='scroll' className='dashboardscroll'>
   <Paymentstable type='activepackages' payuser={payuser} data={packages}/>
   </Box>
  )
}

export default Activepackages