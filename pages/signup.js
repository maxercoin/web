import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Footercomponent from "../components/footer/footer";
import Headercomponent from "../components/header/header";
import colors from "../components/utils/colors";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import RetrieveVerificationLink from "../components/utils/RetrieveVerificationLink";

function Signup() {
  const [isLargerthan834] = useMediaQuery("(min-width: 834px)");
  const { push: goto } = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redEmail, setRedEmail] = useState(false);

  const submitForm = async () => {
    setError("");
    setIsLoading(true);
    if (
      !userName ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !confirmPassword
    ) {
      setError("Please ensure you fill all required fields");
      setIsLoading(false);
    } else {
      sessionStorage.setItem("userEmail", email);
      if (password.length < 5) {
        setError("Password length must be at least 5");
        setIsLoading(false);
      } else {
        if (password != confirmPassword) {
          setError("Password must be same as confirm password");
          setIsLoading(false);
        } else {
          try {
            const singupuser = await axios({
              url: "/api/user/auth/signup",
              method: "post",
              data: JSON.stringify({
                userName,
                password,
                email,
                confirmPassword,
                firstName,
                lastName,
                ref: referral,
                walletAddress: wallet,
              }),
              headers: { "Content-Type": "application/json" },
            });
            if (singupuser.status === 200) {
              sessionStorage.setItem(
                process.env.NEXT_PUBLIC_USER_AUTH_KEY,
                singupuser.data.token
              );
              console.log(singupuser.data);
              sessionStorage.setItem(
                "userData",
                JSON.stringify(singupuser.data)
              );
              // goto('/profile')
              setRedEmail(true);
              setError("");
            } else {
              console.log(singupuser);
              setError("An error occured");
            }
            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
            setError("An error occured");
          }
        }
      }
    }
  };

  // const
  return (
    <>
      <Head>
        <title>MexerCoin</title>
        <meta
          name="description"
          content="Mexer coin cryptocurrency Investment Website Signup page"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Headercomponent />
      <Box
        display="flex"
        minH="500px"
        flexDirection="column"
        placeItems="center"
        gap="5"
        bgGradient={`linear(to-r,${colors.primarycolor},${colors.secondarycolor})`}
        h="max-content"
        w="100vw"
      >
        {!redEmail && (
          <Box
            w={isLargerthan834 ? "60%" : "90%"}
            padding="10"
            borderRadius="15px"
            boxShadow={`2px 2px 100px ${colors.primarycolor}`}
            mb="5"
            mt="5"
            border="1px solid #fff"
            display="flex"
            flexDirection="column"
            placeItems="center"
            gap="5"
          >
            <Text fontSize="1.5em" fontWeight="900" color="#fff">
              SIGN UP{" "}
            </Text>
            <Stack w={isLargerthan834 ? "60%" : "100%"}>
              <Input
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="text"
                w="100%"
                bg="#fff"
                placeholder="Input your username"
              />
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                w="100%"
                bg="#fff"
                placeholder="Input your email"
              />
              <Input
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                w="100%"
                bg="#fff"
                placeholder="Input your first name"
              />
              <Input
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                w="100%"
                bg="#fff"
                placeholder="Input your last name"
              />
              <Input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                w="100%"
                bg="#fff"
                placeholder="Input your password"
              />
              <Input
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                w="100%"
                bg="#fff"
                placeholder="Confirm password"
              />
              {/* <Input value={wallet} onChange={(e)=>{setWallet(e.target.value)}} type='text' w='100%' bg='#fff' placeholder='Your BNB or ETH address' />
        <Input value={referral} onChange={(e)=>{setReferral(e.target.value)}} type='text' w='100%' bg='#fff' placeholder='Referral' /> */}
              {error != "" && (
                <Text fontSize="1.1em" fontWeight="600" color="#ff0000">
                  <i>{error}</i>
                </Text>
              )}
            </Stack>
            <Button
              onClick={submitForm}
              isLoading={isLoading}
              _hover={{ bg: colors.secondarycolor, color: "#fff" }}
            >
              SIGN UP{" "}
            </Button>
            {/* <Text _hover={{cursor:'pointer',color:colors.deg2color  }} color='#fff'><u><i>Forgot Password</i></u></Text> */}
            <Text color="#fff">
              <i>Or</i>
            </Text>
            <Text
              _hover={{ cursor: "pointer", color: colors.deg2color }}
              onClick={(e) => {
                goto("/login");
              }}
              color="#fff"
            >
              <u>
                <i>Login</i>
              </u>
            </Text>
          </Box>
        )}
        {redEmail && (
          <Text fontSize="1.2em" color="#fff" fontWeight="700">
            Kindly proceed to your email and click the verification link to get
            Verified <RetrieveVerificationLink />
          </Text>
        )}
      </Box>
      <Footercomponent />
    </>
  );
}

export default Signup;
