import React,{useState,useRef,useEffect} from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box,Button } from '@chakra-ui/react'
import axios from 'axios'
import colors from '../../utils/colors'
function CurrentPackages() {
let stopUseEffect = useRef(false)
const [activePackages,setActivePackages] = useState([])
const [error,setError] = useState('')
const [isLoading,setIsLoading] = useState(false)
const getUserPackages = async()=>{ 
    console.log("Called function")
    try{
    const userPackages = await axios({
    url:'/api/user/profile/getuserpackages',
    headers: {'Content-Type': 'application/json'},
    method:'POST',
    data:JSON.stringify({user_id:sessionStorage.getItem('user_id')})
})
    console.log(userPackages)
    if(userPackages.status === 200){
        const activeOnes = userPackages.data.filter((v)=> v.status === "Active")
        setActivePackages(activeOnes)
    }else{
        setActivePackages([])

    }
    
}catch(e){
    console.log(e)
    console.log('An error occurred, Please try again later')
    setError(e?.response?.data || e?.message || 'An error occurred, Please try again later')
}
}
useEffect(()=>{
    if(stopUseEffect.current === false){
        getUserPackages()
    }
    stopUseEffect.current = true
},[])
const sendWithdrawRequest = async(id)=>{
    console.log(id)
    try{
        setIsLoading(true)
    const withdrawPackages  = await axios({
        url:'/api/user/profile/withdraw',
        method: 'POST',
        headers: {'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_USER_AUTH_KEY)}`},
        data:JSON.stringify({packageid:id})
    })
    if(withdrawPackages.status === 200){
       await getUserPackages()
        setIsLoading(false)
    }
}catch(e){
    setIsLoading(false)
     console.log(e)   
}
}
  return (
    <Box w='100%' h='90%' overflowY='scroll' className='dashboardscroll'>
        <Table variant='simple'>
            <Thead>
                <Th color='#fff'>PACKAGE NAME</Th>
                <Th color='#fff'>INVESTMENT</Th>
                <Th color='#fff'>ROI</Th>
                <Th color='#fff'>YIELD</Th>
                <Th color='#fff'>NEXT YIELD DATE</Th>
                <Th color='#fff'>YIELD PERIOD</Th>
                <Th color='#fff'>Status</Th>
                <Th color='#fff'>TOTAL</Th>
            </Thead>
            <Tbody>
            {activePackages.map((v,index)=>  <Tr key={`Acivepackageskey${index}`}>
                <Td color='#fff'>{v.Name}</Td>
                <Td color='#fff'>{(v.investAmount).toFixed(4) + " " +v.coin}</Td>
                <Td color='#fff' isNumeric>{v.roi}</Td>
                <Td color='#fff' isNumeric>{(parseFloat(v.Balance) - parseFloat(v.investAmount)).toFixed(4)}</Td>
                <Td color='#fff'>{new Date(v.nextYieldDate).getDate() + "/" + (new Date(v.nextYieldDate).getMonth()+1) + "/" + new Date(v.nextYieldDate).getFullYear()}</Td>
                <Td color='#fff'>{v.yieldPeriod/(1000*60*60 * 24)}</Td>
                <Td color='#fff'>{v.status}</Td>
                <Td color='#fff'>{(v.Balance).toFixed(4)}</Td>
                <Td><Button  bg={colors.deg3color} isLoading={isLoading} onClick={(e)=>sendWithdrawRequest(v._id)} color='#fff' _hover={{bg:colors.deg1color,color:'#fff'}}>WITHDRAW</Button></Td>
                 </Tr>)}
            {(error != '' && activePackages.length === 0) && <Tr>
                <Td color='#ff0000' fontSize='1.6em' textAlign='center' w='100%' colSPan='8'>{error}</Td>
                </Tr>}
                {(error === '' && activePackages.length === 0) && <Tr>
                    <Td color='#fff' fontSize='1.6em' fontWeight='700' textAlign='center' w='100%' colSPan='8'>LOADING...</Td>
                    </Tr>}
                
            </Tbody>
            <Tfoot></Tfoot>
        </Table>
    </Box>
  )
}

export default CurrentPackages