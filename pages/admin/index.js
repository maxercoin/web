import Adminprofile from "../../components/admindashboard/adminprofile";

import React from 'react'
import Headercomponent from '../../components/header/header';
import Footercomponent from '../../components/footer/footer';
import { Box } from '@chakra-ui/react';
import colors from '../../components/utils/colors';
import Head from 'next/head'
function Adminpage() {
  const {primarycolor,secondarycolor} = colors
  return (
    <>
    <Head>
        <title >MexerCoin</title>
        <meta name="description" content="Mexer coin cryptocurrency Investment Website Admin page"  />
        <link rel="icon" href="/logo.png" />
      </Head>
    {/* <Headercomponent /> */}
    <Box bgGradient={`linear(to-r,${primarycolor},${secondarycolor})`} w='100vw' h='100vh'>
    <Adminprofile   />
    </Box>
    {/* <Footercomponent /> */}
    </>
  )
}

export default Adminpage