import React, { useEffect,useState,useRef } from 'react'
import { Table, Thead,Tbody,Tfoot,Tr, Th, Td, TableCaption, TableContainer,Text, Box, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import Payuser from './lightboxes/Payuser'
import colors from '../../utils/colors'

function Paymentstable({type,data,payuser}) {
 console.log(data)
  const toast = useToast()
  const togglePayView=(v)=>{
    payuser({open:true,data:v})
  }

  return (
    <Box w='100%' h='max-content'>
    {/* <Payuser /> */}
    <TableContainer bg='#fff' borderRadius='10px' m={5}>
        <Text fontSize='1.2em' fontWeight='bold' borderBottom='1px solid #000' ml={5}  textAlign='left' mr={5}>{type}</Text>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>USER ID</Th>
        <Th>PAYMENT METHOD</Th>
        <Th isNumeric>AMOUNT</Th>
        <Th >STATUS</Th>
        <Th ></Th>
      </Tr>
    </Thead>
    <Tbody>
        {data.map((d,index)=>{
            return <Tr key={`${type}${index}`}>
            <Td>{d?.ownerUserName}</Td>
            <Td>{d?.package?.coin}</Td>
            <Td isNumeric>{d?.package?.Balance}</Td>
            <Td isNumeric>{d?.package?.status}</Td>
            <Td>
              {type === "Withdraw" && <Button onClick={()=>togglePayView(d)} color='#fff' bg={colors.deg1color} _hover={{bg:colors.primarycolor}} >PAY</Button>}
              </Td>
          </Tr>
        })}
      
      
    </Tbody>
   
  </Table>
</TableContainer>
</Box>
  )
}

export default Paymentstable