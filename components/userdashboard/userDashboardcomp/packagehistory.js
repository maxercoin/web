import React,{useState,useRef,useEffect} from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box,Button } from '@chakra-ui/react'
import axios from 'axios'
import colors from '../../utils/colors'
function Packagehistory() {
    let stopUseEffect = useRef(false)
    const [historyPackages,setHistoryPackages] = useState([])
    const [error,setError] = useState('')
    const getUserPackages = async()=>{ 
        console.log("Called function")
        try{
        const userPackages = await axios({
        url:'/api/user/profile/getusertransactionhistory',
        headers: {'Content-Type': 'application/json'},
        method:'POST',
        data:JSON.stringify({user_id:sessionStorage.getItem('user_id')})
    })
        console.log(userPackages)
        if(userPackages.status === 200){
            // console.log(userPackages)
            setHistoryPackages(userPackages.data)
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
      return (
        <Box w='100%' h='90%' overflowY='scroll' className='dashboardscroll'>
            <Table variant='simple' >
                <Thead> 
                    <Th color='#fff'>INSTRUCTION</Th>
                    <Th color='#fff'>TX ID</Th>
                    <Th color='#fff'>VALUE</Th>
                    <Th color='#fff'>PAYMENT DATE</Th>
                    <Th color='#fff'>WALLET ADDRESS</Th>
                </Thead>
                <Tbody>
                {historyPackages.map((v,index)=>  <Tr key={`Acivepackageskey${index}`}>
                    <Td color='#fff'>{v.instruction}</Td>
                    <Td color='#fff'>{v.txBscId}</Td>
                    <Td color='#fff'>{v.value_quote +" "+ v.coin}</Td>
                    <Td color='#fff'>{new Date(parseInt(v.paymentdate)).getDay() + "/" + (new Date(parseInt(v.paymentdate)).getMonth()+1) + "/" + new Date(parseInt(v.paymentdate)).getFullYear()}</Td>
                    <Td color='#fff'>{v.ownerSendingOrRecievingAddress}</Td>
                </Tr>)}
                {(error != '' && historyPackages.length === 0) && <Tr>
                    <Td color='#ff0000' fontSize='1.6em' textAlign='center' w='100%' colSPan='8'>{error}</Td>
                    </Tr>}
                    {(error === '' && historyPackages.length === 0) && <Tr>
                        <Td color='#fff' fontSize='1.6em' fontWeight='700' textAlign='center' w='100%' colSPan='8'>LOADING...</Td>
                        </Tr>}
                    
                </Tbody>
                <Tfoot></Tfoot>
            </Table>
        </Box>
      )
 }
    


export default Packagehistory