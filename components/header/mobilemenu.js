import { HamburgerIcon,CloseIcon } from '@chakra-ui/icons'
import { Menu, MenuButton,IconButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import colors from '../utils/colors'
import {useRouter} from 'next/router'
function Mobilemenu() {
    const {push:goto} = useRouter()
    const {deg1color,deg2color,deg3color,primaryTextColor,primarycolor,secondarycolor} = colors
  return (
    <Menu  bg={deg1color}>
       {({ isOpen }) => (
        <>
        <MenuButton bg={deg1color} _active={{bg:deg1color}} boxShadow={`0px 0px 50px ${primarycolor}`} _selected={{bg:deg1color}} as={IconButton} icon={!isOpen ?<HamburgerIcon />:<CloseIcon />} />
    <MenuList style={{zIndex:'100'}} bg={primarycolor}>
    <MenuItem onClick={(e)=>{goto('/')}} _focus={{bg:deg3color}}> Home</MenuItem>
    <MenuItem  onClick={(e)=>{goto('/#about')}} _focus={{bg:deg3color}}> About</MenuItem>
    <MenuItem onClick={(e)=>{goto('/#faqs')}} _focus={{bg:deg3color}}> FAQ</MenuItem>
    <MenuItem onClick={(e)=>{goto('/#contactus')}} _focus={{bg:deg3color}}> Contact</MenuItem>
    <MenuItem onClick={(e)=>{e.target.focus(); goto('/login')}} _focus={{bg:deg3color}}> Login</MenuItem>
    <MenuItem  onClick={(e)=>{e.target.focus(); goto('/signup')}} _focus={{bg:deg3color}}> Sign Up</MenuItem>
    </MenuList>
    </>
)}
    </Menu>
  )
}

export default Mobilemenu