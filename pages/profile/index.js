import React from 'react'
import Userprofile from '../../components/userdashboard/userprofile';
import Headercomponent from '../../components/header/header';
import Footercomponent from '../../components/footer/footer';
import { Box } from '@chakra-ui/react';
import colors from '../../components/utils/colors';
import Head from 'next/head'
function Profile() {
  const {primarycolor,secondarycolor} = colors
  return (
    <>
    <Head>
        <title >MaxerCoin</title>
        <meta name="description" content="Maxer coin cryptocurrency Investment Website userProfile"  />
        <link rel="icon" href="/logo.png" />
      </Head>
    {/* <Headercomponent /> */}
    <Box bgGradient={`linear(to-r,${primarycolor},${secondarycolor})`} w='100vw' h='100vh'>
    <Userprofile   />
    </Box>
    {/* <Footercomponent /> */}
    </>
  )
}

export default Profile
