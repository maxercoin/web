import React, { useEffect, useRef, useState } from "react";
import { Box, Input, Button, Text, useToast } from "@chakra-ui/react";
import colors from "../../utils/colors";
import axios from "axios";
import Warningpop from "./warningpop";
function Packageupdate() {
  const toast = useToast();
  const [previewBg, setPreviewBg] = useState("#f5487f");
  const [previewTxt, setPreviewTxt] = useState("#f5f5f5");
  const [packageName, setPackageName] = useState("");
  const [amount, setAmount] = useState(0);
  const [roi, setRoi] = useState(0);
  const [yieldPeriod, setYieldPeriod] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [editPackageId, setEditPackageId] = useState("");
  const [packagesItems, setPackagesItems] = useState([]);
  const [inEdditing, setInEdditing] = useState(false);
  const [startDelete, setStartDelete] = useState(false);
  const [packagetoDelete, setPackageToDelete] = useState("");
  const [packageToDeleteId, setPackageToDeleteId] = useState("");

  const apiurl = "/api/admin/updateinfo/packages";
  const stopUsefFect = useRef(false);

  const editPackage = (packageObject) => {
    setError("");
    setInEdditing(true);
    setPreviewBg((v) => packageObject.primarycolor);
    setPreviewTxt((v) => packageObject.textsColor);
    setPackageName((v) => packageObject.Name);
    setAmount((v) => packageObject.Amount);
    setRoi((v) => packageObject.roi);
    setYieldPeriod((v) => packageObject.yieldPeriod / (1000 * 60 * 60 * 24));
    setEditPackageId((v) => packageObject._id);
  };
  const cancelEditPackage = () => {
    setError("");
    setEditPackageId((v) => "");
    setInEdditing(false);
    setPreviewBg((v) => "#f5487f");
    setPreviewTxt((v) => "#f5f5f5");
    setPackageName((v) => "");
    setAmount((v) => 0);
    setRoi((v) => 0);
    setYieldPeriod((v) => 0);
  };
  const deletePackage = (name, id) => {
    setPackageToDeleteId((v) => id);
    setPackageToDelete(
      `Are you sure you want to delete package with name ${name}`
    );
    setStartDelete(true);
    cancelEditPackage();
  };
  const continuetoDelete = async () => {
    try {
      const continueDelete = await axios({
        url: apiurl + "?packageid=" + packageToDeleteId,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY
          )}`,
        },
      });
      if (continueDelete.status === 200) {
        toast({
          title: "Deleted.",
          description: "Package deleted Successfully.",
          status: "success",
          duration: 3600,
          isClosable: true,
        });
        setStartDelete(false);
        setPackageToDelete("");
        getPackages();
      } else {
        setStartDelete(false);
      }
    } catch (e) {
      setStartDelete(false);
      toast({
        title: "Error.",
        description: "Error while deleteing package,Please try again later.",
        status: "error",
        duration: 3600,
        isClosable: true,
      });
    }
  };
  const cancelDelete = () => {
    setPackageToDeleteId("");
    setStartDelete(false);
    setPackageToDelete("");
  };
  const submitEdditedPackage = async () => {
    setError("");
    setIsloading(true);
    try {
      const period = yieldPeriod * 1000 * 60 * 60 * 24;
      const submitEdits = await axios({
        url: apiurl + "?packageid=" + editPackageId,
        method: "patch",
        data: JSON.stringify({
          Name: packageName,
          Amount: amount,
          roi,
          yieldPeriod: period,
          primarycolor: previewBg,
          textsColor: previewTxt,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY
          )}`,
        },
      });
      if (submitEdits.status === 200) {
        cancelEditPackage();
        getPackages();
        toast({
          title: "Updated.",
          description: "Your FAQ was successfully updated!.",
          status: "success",
          duration: 3600,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error.",
          description: "Error while updating package.",
          status: "error",
          duration: 3600,
          isClosable: true,
        });
      }
      setIsloading(false);
    } catch (e) {
      toast({
        title: "Error.",
        description: "Error while updating package.",
        status: "error",
        duration: 3600,
        isClosable: true,
      });
      setError("An error occured, Kindly check and try again.");
      setIsloading(false);
      console.log(e);
    }
  };

  const submitPackage = async () => {
    setError("");
    setIsloading(true);
    if (amount === 0 || roi === 0 || yieldPeriod === 0 || !packageName) {
      setError("Amount,Roi,and yield Values must be greater than zero");
      setIsloading(false);
      return;
    }
    try {
      const period = yieldPeriod * 1000 * 60 * 60 * 24;
      const submitPackage = await axios({
        url: apiurl,
        method: "post",
        data: JSON.stringify({
          Name: packageName,
          Amount: amount,
          roi,
          yieldPeriod: period,
          primarycolor: previewBg,
          textsColor: previewTxt,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY
          )}`,
        },
      });
      if (submitPackage.status === 200) {
        console.log(submitPackage);
        getPackages();
        toast({
          title: "Package created.",
          description: "Your Package was successfully uploaded!.",
          status: "success",
          duration: 3600,
          isClosable: true,
        });
      } else {
        console.log(submitPackage);
        setError(submitPackage.response?.message);
        toast({
          title: "Error.",
          description: "Error occured while submitting package.",
          status: "error",
          duration: 3600,
          isClosable: true,
        });
      }
      setIsloading(false);
    } catch (e) {
      toast({
        title: "Error.",
        description: "Error occured while submitting package.",
        status: "error",
        duration: 3600,
        isClosable: true,
      });
      setError(e.response?.message);
      setIsloading(false);
      console.log(e);
    }
  };
  const getPackages = async () => {
    try {
      const packagesFromServer = await axios({
        method: "get",
        url: apiurl,
      });
      if (packagesFromServer.status === 200) {
        console.log(packagesFromServer);
        setPackagesItems((v) => packagesFromServer.data.items);
      } else {
        console.log(packagesFromServer);
      }
    } catch (e) {
      toast({
        title: "Error occured.",
        description: "Error occured while getting packages, please refresh.",
        status: "error",
        duration: 3600,
        isClosable: true,
      });
      console.log(e);
      return;
    }
  };
  useEffect(() => {
    if (stopUsefFect.current === false) {
      getPackages();
    }
    stopUsefFect.current = true;
  }, []);
  return (
    <Box
      w="100%"
      h="90vh"
      display="flex"
      flexDirection="column"
      gap="2"
      placeItems="center"
    >
      {startDelete && (
        <Warningpop
          warningText={packagetoDelete}
          runThis={continuetoDelete}
          cancel={cancelDelete}
        />
      )}
      <Box
        display="flex"
        gap="1"
        m="1"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="top"
        justifyContent="center"
        w="98%"
        borderRadius="10px"
        h="max-conten"
      >
        <Box
          borderRadius="5px"
          pt="2"
          w="50%"
          h="max-content"
          border="1px solid #fff"
          display="grid"
          placeItems="center"
        >
          <Box
            w="100%"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="row"
            gap={2}
            flexWrap="wrap"
          >
            <Box display="grid" w="48%">
              <label style={{ color: "#fff" }} forHtml="nameinp">
                Package Name
              </label>
              <Input
                id="nameinp"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                bg="#fff"
                type="text"
                placeholder="Pacakge name"
              />
            </Box>
            <Box display="grid" w="48%">
              <label style={{ color: "#fff" }} forHtml="nameinp">
                Package Amount
              </label>
              <Input
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                type="number"
                bg="#fff"
                placeholder="Amount in USDT"
              />
            </Box>
            {/* <Input w='48%' type='number'  bg='#fff' placeholder='Amount in BNB' />
            <Input w='48%' type='number'  bg='#fff' placeholder='Amount in ETH' /> */}
            <Box display="grid" w="48%">
              <label style={{ color: "#fff" }} forHtml="nameinp">
                Package Roi
              </label>
              <Input
                value={roi}
                onChange={(e) => setRoi(parseInt(e.target.value))}
                type="number"
                bg="#fff"
                placeholder="ROI"
              />
            </Box>
            <Box display="grid" w="48%">
              <label style={{ color: "#fff" }} forHtml="nameinp">
                Package Yield Period
              </label>
              <Input
                value={yieldPeriod}
                onChange={(e) => setYieldPeriod(parseInt(e.target.value))}
                bg="#fff"
                type="number"
                placeholder="Yield Period"
              />
            </Box>
            <Box display="grid" w="48%">
              <label style={{ color: "#fff" }} forHtml="nameinp">
                Background Color
              </label>
              <Input
                type="color"
                value={previewBg}
                onChange={(e) => setPreviewBg(e.target.value)}
                defaultValue="#f5487f"
                border="0px"
                bg="#fff"
                placeholder=""
              />
            </Box>
            <Box display="grid" w="48%">
              <label style={{ color: "#fff" }} forHtml="nameinp">
                Text Color:
              </label>
              <Input
                type="color"
                value={previewTxt}
                onChange={(e) => setPreviewTxt(e.target.value)}
                border="0px"
                defaultValue="#f5f5f5"
                bg="#fff"
                placeholder="Text Color"
              />
            </Box>
          </Box>

          {error != "" && (
            <Text color="#ff0000">
              <i>{error}</i>
            </Text>
          )}
          {inEdditing && (
            <Box display="row" gap="5">
              <Button
                m="2"
                onClick={submitEdditedPackage}
                isLoading={isLoading}
                _hover={{ bg: colors.deg1color, color: "#fff" }}
              >
                SUBMIT
              </Button>
              <Button
                m="2"
                onClick={cancelEditPackage}
                isLoading={isLoading}
                _hover={{ bg: colors.deg1color, color: "#fff" }}
              >
                CANCEL
              </Button>
            </Box>
          )}
          {!inEdditing && (
            <Button
              m="2"
              onClick={submitPackage}
              isLoading={isLoading}
              _hover={{ bg: colors.deg1color, color: "#fff" }}
            >
              SUBMIT
            </Button>
          )}
        </Box>
        <Box
          borderRadius="5px"
          display="grid"
          gap="2"
          bg={previewBg}
          w="48%"
          h="100%"
        >
          <Text fontSize="0.9em" color="#fff" textAlign="center">
            <i>Preview</i>
          </Text>
          <Text
            fontSize="1.3em"
            fontWeight="bold"
            textAlign="center"
            color={previewTxt}
          >
            {packageName || "PACKAGE NAME"}
          </Text>
          <Text
            fontSize="1.1em"
            color={previewTxt}
            textAlign="center"
            fontWeight="medium"
          >
            {amount + " USDT"}
          </Text>
          <Text color={previewTxt} fontSize="1.1em" textAlign="center">
            ROI: {roi + "%"}
          </Text>
          <Text color={previewTxt} fontSize="1.1em" textAlign="center">
            Yeield Period: {yieldPeriod + "days"}
          </Text>
          <Button
            w="200px"
            bg={colors.primarycolor}
            alignSelf="center"
            disabled
            justifySelf="center"
            h="50px"
            _hover={{ bg: colors.secondarycolor }}
            color="#fff"
            fontSize="1em"
          >
            BUY NOW
          </Button>
        </Box>
      </Box>
      <Box
        className="dashboardscroll"
        overflowY="scroll"
        justifyContent="center"
        alignItems="center"
        p="2"
        gap="5"
        borderRadius="5px"
        display="flex"
        flexWrap="wrap"
        w="97%"
        h="63%"
        border="1px solid #fff"
      >
        {packagesItems.length > 0 &&
          packagesItems.map((v, index) => {
            return (
              <Box
                borderRadius="5px"
                pb="2"
                display="grid"
                key={`${index}packageupdate${index}`}
                gap="2"
                bg={v.primarycolor}
                ml="2"
                w="30%"
                h="max-content"
              >
                {/* <Text fontSize='0.9em' color='#fff' textAlign='center' ><i>Preview</i></Text> */}
                <Text
                  fontSize="1.3em"
                  fontWeight="bold"
                  textAlign="center"
                  color={v.textsColor}
                >
                  {v.Name}
                </Text>
                <Text
                  fontSize="1.1em"
                  color={v.textsColor}
                  textAlign="center"
                  fontWeight="medium"
                >
                  {v.Amount + " USDT"}
                </Text>
                <Text color={v.textsColor} fontSize="1.1em" textAlign="center">
                  ROI: {v.roi + "%"}
                </Text>
                <Text color={v.textsColor} fontSize="1.1em" textAlign="center">
                  Yeield Period: {v.yieldPeriod}days
                </Text>
                <Box
                  display="flex"
                  gap="5"
                  w="100%"
                  p="1"
                  justifyContent="center"
                >
                  <Button
                    w="40%"
                    bg={colors.primarycolor}
                    alignSelf="center"
                    onClick={(e) => {
                      editPackage(v);
                    }}
                    justifySelf="center"
                    h="50px"
                    _hover={{ bg: colors.secondarycolor }}
                    color="#fff"
                    fontSize="1em"
                  >
                    EDIT
                  </Button>
                  <Button
                    w="40%"
                    bg={colors.primarycolor}
                    alignSelf="center"
                    onClick={(e) => deletePackage(v.Name, v._id)}
                    justifySelf="center"
                    h="50px"
                    _hover={{ bg: colors.secondarycolor }}
                    color="#fff"
                    fontSize="1em"
                  >
                    DELETE
                  </Button>
                </Box>
              </Box>
            );
          })}
        {packagesItems.length === 0 && (
          <Text
            fontSize="1.5em"
            fontWeight="900"
            textAlign="center"
            color="#fff"
          >
            No package to show, Kindly add some package.
          </Text>
        )}
      </Box>
    </Box>
  );
}

export default Packageupdate;
