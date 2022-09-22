import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Input,
  Text,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import colors from "../../utils/colors";
import Packagescarousel from "./packagescarousel";
import { CopyIcon } from "@chakra-ui/icons";
import axios from "axios";
function Dashboard() {
  const stopUseEffect = useRef(false);
  const [userBalance, setUserBalance] = useState([]);
  const [isLargerthan600] = useMediaQuery("(min-width:600px)");
  const profileData =
    JSON.parse(sessionStorage.getItem("userprofileinfo")) || {};
  const address = sessionStorage.getItem("walletaddr");
  const toast = useToast();
  const { deg1color } = colors;
  const getUserBalances = async () => {
    try {
      const userBalances = await axios.get(
        `/api/user/profile/getuserpackageBalances?user_id=${sessionStorage.getItem(
          "user_id"
        )}`
      );
      console.log(userBalances);
      if (userBalances.status === 200) {
        setUserBalance(userBalances.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (stopUseEffect.current === false) {
      getUserBalances();
    }
    stopUseEffect.current = true;
  }, []);
  return (
    <Box overflowY="scroll" className="dashboardscroll" w="100%" h="90%">
      {/* <Box w={isLargerthan600 ? '80%':'90%'} display='flex' mt='5' justifyContent='space-between' alignItems='center' paddingLeft={10} color='#fff' gap='10'>
            <Text>Referral Link:</Text>
            <Box w={isLargerthan600 ? '70%':'95%'} h='50px' display='flex' >
            <Input borderTopLeftRadius='5' borderBottomLeftRadius='5' borderRadius='0' h='inherit' bg='#fff' color='#000' w='60%' disabled value={`https://mexercoin/signup/${profileData.userName}`}/>
            <Button borderTopRightRadius='5' borderBottomRightRadius='5' borderRadius='0' h='inherit' 
            onClick={(e)=>{
              navigator.clipboard.writeText(profileData.email);
              toast({
                title: 'Referral url copied!',
                description: `https://mexercoin/signup/${profileData.userName} copied to clipboard `,
                status: 'success',
                duration: 3600,
                isClosable: true,
              })
          }} color='#000' cursor='pointer' _hover={{bg:`${deg1color}`,color:'#fff'}} as={IconButton} icon={<CopyIcon />}/>
            </Box>
        </Box> */}
      <Text fontSize="3em" ml="10" fontWeight="bold" color="#fff">
        WELCOME BACK
      </Text>
      <Box
        w={isLargerthan600 ? "80%" : "95%"}
        display="flex"
        mt="5"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft={10}
        color="#fff"
        gap="10"
      >
        <Text fontSize="1.2em" fontWeight="medium">
          Wallet Address:
        </Text>
        <Box w="70%" h="50px" display="flex">
          <Input
            borderTopLeftRadius="5"
            borderBottomLeftRadius="5"
            borderRadius="0"
            h="inherit"
            bg="#fff"
            color="#000"
            w="60%"
            disabled
            value={address}
          />
          <Button
            as={IconButton}
            icon={<CopyIcon />}
            borderTopRightRadius="5"
            borderBottomRightRadius="5"
            borderRadius="0"
            h="inherit"
            onClick={(e) => {
              navigator.clipboard.writeText(address);
              toast({
                title: "Withdraw Address copied!.",
                description: address + " copied to clipboard ",
                status: "success",
                duration: 3600,
                isClosable: true,
              });
            }}
            color="#000"
            cursor="pointer"
            _hover={{ bg: `${deg1color}`, color: "#fff" }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexWrap={isLargerthan600 ? "nowrap" : "wrap"}
        gap="10"
        mt="5"
        h="max-content"
        pl={10}
        w="100%"
        color="#fff"
      >
        {/* <Box borderRadius='10px'  gap='5' w='200px' h='200px' display='flex' bg={deg1color} flexDirection='column' alignItems='center' justifyContent='center'>
            <Text fontSize='1.2em' fontWeight='medium'>Packages: </Text>
            <Text>$0</Text>
          </Box> */}
        {/* <Box borderRadius='10px'  gap='5' w='200px' h='200px' display='flex' bg={deg1color} flexDirection='column' alignItems='center' justifyContent='center'>
            <Text fontSize='1.2em' fontWeight='medium'>Earnings: </Text>
            <Text>$0</Text>
          </Box> */}
        <Box
          borderRadius="10px"
          gap="5"
          w="200px"
          h="200px"
          display="flex"
          bg={deg1color}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="1.2em" fontWeight="medium">
            Investments Balances:{" "}
          </Text>
          {userBalance.length > 0 &&
            userBalance.map((v, index) => (
              <Text key={`${index}userdashboard`} id={v._id}>
                {v.Amount.toFixed(4) + " " + v.coin}
              </Text>
            ))}
          {userBalance.length === 0 && <Text>$0</Text>}
        </Box>
      </Box>
      <Packagescarousel />
    </Box>
  );
}

export default Dashboard;
