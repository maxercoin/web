import React,{useState,useEffect,useRef} from 'react'
import { Box, Button, Input,Select,Text } from '@chakra-ui/react'
import colors from '../../utils/colors'
import dummydata from './dummydata'
import Paymentstable from './paymentstable'
// import Payuser from './lightboxes/Payuser'
// import Payuser from './adminlightboxes/payuser'
import axios from 'axios'
function Requestpayment({payuser}) {
   
  const stopUseEffect = useRef(false);
  const [withdrawnPackages, setWithdrawnPackages] = useState([]);
  const [limit,setLimit] = useState(20)
  const [skip,setSkip] = useState(0)
  const [error,setError] = useState('')
  const [returned,setReturned] = useState(0)
  const [totalcounts,setTotalCounts] = useState(0)
  const getWithdrawnPackages = async()=>{
    try{
    const getPackages = await axios.get(`/api/package/getwithdrawnpackages?limit=${limit}&skip=${skip}`)
    if(getPackages.status === 200){
      setWithdrawnPackages(getPackages?.data?.requestsPackages)
          console.log(getPackages.data)
    }
  }catch(e){
    setError(e?.response?.data || e?.message || "An error occured.")
  }
  }
  useEffect(()=>{
    if(stopUseEffect.current === false){
      getWithdrawnPackages()
    }
    stopUseEffect.current = true
  },[])
  const dummyDeposits = dummydata.filter((val)=>{return val.status === 'Success'})
  return (
    <Box h='87%' overflowY='scroll' className='dashboardscroll'>
   <Paymentstable type='Withdrawhistory' payuser={payuser} data={withdrawnPackages}/>
    </Box>
  )
}

export default Requestpayment