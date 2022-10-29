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
import RetrieveVerificationLink from "../components/utils/RetrieveVerificationLink";
function Login() {
  const [isLargerthan834] = useMediaQuery("(min-width: 834px)");
  const [login, setLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [reqActivateMsg, setReqActivateMsg] = useState(false);
  const [error, setError] = useState("");
  const { push: goto } = useRouter();
  const loginUser = async () => {
    sessionStorage.clear();
    setIsLoading(true);
    if (!password || !login) {
      setError("Password and Username or email fields cannot be empty.");
      setIsLoading((v) => false);
    } else {
      sessionStorage.setItem("userEmail", login);
      try {
        const logUser = await axios({
          url: "/api/user/auth/login",
          method: "post",
          data: JSON.stringify({ email: login, password }),
          headers: { "Content-Type": "application/json" },
        });
        if (logUser.status === 200) {
          // goto('/profile')
          console.log(logUser);
          setIsLoading((v) => false);
          if (!logUser.data.active) {
            setReqActivateMsg(true);
          } else {
            sessionStorage.setItem(
              process.env.NEXT_PUBLIC_USER_AUTH_KEY,
              logUser.data.token
            );
            sessionStorage.setItem("user_active", logUser.data.active);
            sessionStorage.setItem("user_id", logUser.data.id);
            sessionStorage.setItem("walletaddr", logUser.data.walletAddress);
            sessionStorage.setItem(
              "userprofileinfo",
              JSON.stringify(logUser.data.userdata)
            );
            goto("/profile");
          }
        }
        setIsLoading((v) => false);
      } catch (e) {
        setIsLoading((v) => false);
        setError("Email or password not correct!.");
        console.log(e);
      }
    }
  };
  return (
    <>
      <Head>
        <title>MaxerCoin</title>
        <meta
          name="description"
          content="Maxer coin cryptocurrency Investment Website Login Page"
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
        {!reqActivateMsg && (
          <Box
            mb="5"
            w={isLargerthan834 ? "60%" : "90%"}
            padding="10"
            borderRadius="15px"
            boxShadow={`2px 2px 100px ${colors.primarycolor}`}
            mt="5"
            border="1px solid #fff"
            display="flex"
            flexDirection="column"
            placeItems="center"
            gap="5"
          >
            <Text fontSize="1.5em" fontWeight="900" color="#fff">
              LOGIN{" "}
            </Text>
            <Stack w={isLargerthan834 ? "60%" : "100%"}>
              <Input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                type="text"
                w="100%"
                bg="#fff"
                placeholder="Input your username or email"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                w="100%"
                bg="#fff"
                placeholder="Input your password"
              />
            </Stack>
            <Button
              isLoading={isLoading}
              onClick={loginUser}
              _hover={{ bg: colors.secondarycolor, color: "#fff" }}
            >
              Login{" "}
            </Button>
            {error && <Text color="#ff0000">{error}</Text>}
            <Text
              _hover={{ cursor: "pointer", color: colors.deg2color }}
              onClick={(e) => goto("/forgotpassword")}
              color="#fff"
            >
              <u>
                <i>Forgot Password</i>
              </u>
            </Text>
            <Text color="#fff">
              <i>Or</i>
            </Text>
            <Text
              _hover={{ cursor: "pointer", color: colors.deg2color }}
              onClick={(e) => {
                goto("/signup");
              }}
              color="#fff"
            >
              <u>
                <i>Signup</i>
              </u>
            </Text>
          </Box>
        )}
        {reqActivateMsg && (
          <Text color="#fff">
            Kindly proceed to your email and the link sent to activate your
            account or <RetrieveVerificationLink />
          </Text>
        )}
      </Box>
      <Footercomponent />
    </>
  );
}

export default Login;
