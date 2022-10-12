// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req
 * @param {import('next').NextApiResponse} res
 */
import VerifyJwtAuth from "../../../../backendUtils/jwtauthverify";
import connectDB from "../../../../backendUtils/db/connetMongo";
import user from "../../../../backendUtils/model/model";
import buypackageModel from "../../../../backendUtils/model/buypackageModel";
import statuses from "../../../../backendUtils/statuses";
import kyc from "../../../../backendUtils/model/kycModel";

const cloudinary = require("cloudinary").v2;
export default async function handler(req, res) {
  // const {} = req.headers
  const kycstatuses = {
    0: "Not Verified",
    1: "Pending Verification",
    2: "Verified",
  };
  await connectDB();
  if (req.method?.toLocaleLowerCase() === "post") {
    const { idtype, idNuber, frontSide, backSide } = req.body;
    const userid = VerifyJwtAuth(req.headers);
    if (!userid) {
      res.status(401).send("Not authorized");
    } else {
      if (!idtype || !idNuber || !frontSide || !backSide) {
        res.status(403).send("Kindly fill all required fields.");
      } else {
        const userKycExist = await kyc.findOne({ ownerid: userid });
        console.log({ userid });
        console.log({ userKycExist });
        if (userKycExist) {
          res
            .status(400)
            .send(
              "User already exist, kindly check if you are verified already"
            );
        } else {
          const userowner = await user.findById(userid);
          const ownername = userowner.firstName + " " + userowner.lastName;
          try {
            cloudinary.config({
              cloud_name: process.env.CLOUDINARY_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            const { url: frontUrl } = await cloudinary.uploader.upload(
              frontSide,
              {
                upload_preset: "mexercoin_Storage",
              }
            );
            const { url: backUrl } = await cloudinary.uploader.upload(
              backSide,
              {
                upload_preset: "mexercoin_Storage",
              }
            );
            const addKyc = await kyc.create({
              owner: userid,
              ownerId: userid,
              Name: userowner.ownername,
              idNumber: idNuber,
              frontUrl,
              backUrl,
              status: kycstatuses[1],
            });
            res.status(200).send("Kyc uploaded successfully");
          } catch (e) {
            res.status(400).send(e?.message || "An error occurred");
          }
        }
      }
    }
  }
}
