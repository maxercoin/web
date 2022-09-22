import { Box,Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import colors from '../utils/colors'
import Image from 'next/image';
import logo from '../../assets/logo.png'
import {useRouter} from 'next/router'
import styles from './headers.module.css'
import Mobilemenu from './mobilemenu';
function Headercomponent() {
    const [isLargerthan805] = useMediaQuery('(min-width: 805px)')
    const {push:goto} = useRouter()
    const {primarycolor,secondarycolor,deg1color,deg2color,deg3color,primaryTextColor} = colors;
    const buttonsProps = {
        width:'4em',
        transition:'border 0.2s ease-in-out',
        borderBottom: `0px solid ${deg1color}`,
        _hover:{borderBottom: `5px solid ${deg1color}`,cursor:'pointer'},

    }
  return (
    <Box zIndex='5' className={styles.headersStyles}  paddingLeft={5} paddingRight={5} color={primaryTextColor} display='flex' justifyContent='space-between' alignItems='center' w='100vw' h='10vh' bg={primarycolor} bgGradient={`linear(to-b, ${primarycolor},70%, ${secondarycolor})`}>
        <Image onClick={(e)=>{goto('/')}} src={logo} height='50px' width='100px'/>
        {isLargerthan805 && <Box h='100%'alignItems='center' display='flex' gap='10' w='70%' justifyContent='flex-end'>
            <Box onClick={(e)=>{goto('/')}} {...buttonsProps}>
                <Text>Home</Text>
            </Box>
            <Box onClick={(e)=>{goto('/#about')}} {...buttonsProps}>
                <Text>About</Text>
            </Box>
            <Box onClick={(e)=>{goto('/#faqs')}} {...buttonsProps}>
                <Text>FAQ</Text>
            </Box>
            <Box onClick={(e)=>{ goto('/#contactus')}} {...buttonsProps}>
                <Text>Contact</Text>
            </Box>
            <Box onClick={(e)=>{goto('/login')}} {...buttonsProps}>
                <Text>Login</Text>
            </Box>
            <Box onClick={(e)=>{goto('/signup')}} w='4em' bg={deg2color} padding={1} borderRadius='5px' cursor='pointer' _hover={{bg:deg1color}} boxShadow={`0 0 6px ${primarycolor}`} mr='5'>
                <Text>Sign Up</Text>
            </Box>
        </Box>
}
{!isLargerthan805 && <Mobilemenu />}
    </Box>
  )
}

export default Headercomponent