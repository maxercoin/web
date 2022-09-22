import { Box, Button, Input, Select, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import colors from "../../utils/colors";
import axios from "axios";
import Image from "next/image";
function Kyc() {
  let stopUseEffect = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [returnedKycs, setReturnedKycs] = useState([]);
  const getAllKycRequests = async () => {
    try {
      const pendingKycs = await axios({
        url: "/api/admin/approve/verifykyc",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY
          )}`,
        },
      });
      if (pendingKycs.status === 200) {
        console.log(pendingKycs.data);
        setReturnedKycs(pendingKycs.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const verifyUser = async (id) => {
    setIsLoading(true);
    try {
      const verifythisuser = await axios({
        url: "/api/admin/approve/verifykyc",
        method: "POST",
        data: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY
          )}`,
        },
      });
      if (verifythisuser.status === 200) {
        getAllKycRequests();
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (stopUseEffect.current === false) {
      getAllKycRequests();
    }
    stopUseEffect.current = true;
  }, []);
  return (
    <Box
      w="100%"
      h="80%"
      gap="5"
      p="2"
      overflowY="scroll"
      className="dashboardscroll"
    >
      {returnedKycs.length > 0 &&
        returnedKycs.map((v, index) => (
          <Box
            key={`${index}kycadminpage`}
            color="#fff"
            display="flex"
            w="100%"
            flexDirection="column"
            borderRadius="10px"
            border="1px solid #fff"
          >
            <Box w="100%" display="flex" mt="2">
              <Box w="50%" ml="2" fontSize="1.3em" fontWeight="medium">
                <Text>User ID: {v.ownerId}</Text>
                <Text>ID Number: {v.idNumber}</Text>
              </Box>
              <Box gap="2" display="flex" pr="2">
                <Image
                  src={v.frontUrl}
                  style={{ borderRadius: "5px" }}
                  height="200px"
                  width="400px"
                />
                <Image
                  src={v.backUrl}
                  style={{ borderRadius: "5px" }}
                  height="200px"
                  width="400px"
                />
              </Box>
            </Box>
            <Button
              w="50%"
              justifySelf="center"
              onClick={(e) => verifyUser(v._id)}
              alignSelf="center"
              mb="2"
              mt="2"
              bg={colors.deg2color}
              color="#fff"
              isLoading={isLoading}
              _hover={{ bg: colors.deg1color, color: "#fff" }}
            >
              VERIFY
            </Button>
          </Box>
        ))}
      {returnedKycs.length === 0 && (
        <Text color="#fff" fontSize="3em" fontWeight="900" textAlign="center">
          NO KYC FOUND
        </Text>
      )}
    </Box>
  );
}

export default Kyc;
