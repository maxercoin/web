// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req
 * @param {import('next').NextApiResponse} res
 */
import VerifyJwtAuth from "../../../../backendUtils/jwtauthverify";
import connectDB from "../../../../backendUtils/db/connetMongo";
import user from "../../../../backendUtils/model/model";
import bcrypt from "bcrypt";
import buypackageModel from "../../../../backendUtils/model/buypackageModel";
import statuses from "../../../../backendUtils/statuses";
import otp from "../../../../backendUtils/model/otpModel";
import { sendConfirmationEmail } from "../../../../backendUtils/mailer/mail";
const otpGenerator = require("otp-generator");

export default async function handler(req, res) {
  await connectDB();
  if (req.method?.toLocaleLowerCase() === "get") {
    let { login } = req.query;
    if (!login) {
      res.status(400).send("Kindly fill in Email or Username.");
    } else {
      login = login.toLowerCase();
      const userexist = await user.findOne({
        $or: [{ email: login }, { userName: login }],
      });
      if (userexist) {
        const userotpfield = await otp.findOne({ email: userexist.email });
        const userotp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        // const otp = generateOtp();
        const { email, userName: username } = userexist;
        const touser = { email, username };
        const msg = { type: "otp", message: userotp };
        if (!userotpfield) {
          try {
            const createfield = await otp.create({
              email: userexist.email,
              otp: userotp,
            });
            const returnValue = (success) => {
              if (success) {
                return res.status(200).send("Otp send to your email address");
              } else {
                return res
                  .status(400)
                  .send("An error occured, kindly request OTP again");
              }
            };
            return await sendConfirmationEmail(touser, " ", msg, returnValue);
          } catch (e) {
            console.log(e.message);
            res
              .status(400)
              .send(
                "An error occured while sending email, kindly refresh the page and try again"
              );
          }
        } else {
          try {
            const createfield = await otp.updateOne(
              { email: userexist.email },
              { $set: { otp: userotp } }
            );
            const sendEmail = await sendConfirmationEmail(touser, " ", msg);
            res.status(200).send("Otp send to your email address");
          } catch (e) {
            console.log(e);
            res
              .status(400)
              .send(
                "An error occured while sending email, kindly refresh the page and try again"
              );
          }
        }
      } else {
        res.status(400).send("User does not exist, Please proceed to signup");
      }
    }
  }
  if (req.method?.toLocaleLowerCase() === "post") {
    let { login, otp: userotp, newPassword } = req.body;
    if (!login || !userotp || !newPassword) {
      res.status(400).send("Kindly fill in all fields before your proceed");
    } else {
      login = login.toLowerCase();
      const userexist = await user.findOne({
        $or: [{ email: login }, { userName: login }],
      });
      if (userexist) {
        const otpstored = await otp.findOne({ email: userexist.email });
        if (otpstored) {
          const { otp: storedotp } = otpstored;
          if (storedotp != userotp) {
            res
              .status(400)
              .send("Otp not correct, Kindly refresh and try again.");
          } else {
            const newPasswordHash = await bcrypt.hash(newPassword, 10);
            const updateUserPassword = await user.updateOne(
              { _id: userexist._id },
              { $set: { password: newPasswordHash } }
            );
            res
              .status(200)
              .json({
                updateUserPassword,
                messsage: "Password updated successfully.",
              });
          }
        } else {
          res
            .status(400)
            .send(
              "No otp found, kinly refresh the page and try again to request for new otp for the user."
            );
        }
      } else {
        res.send(400).send("User does not exist!, kindly check and try again");
      }
    }
  }
}

const generateOtp = () => {
  let otp = "";
  for (i = 0; i < 7; i++) {
    const randomNumber = Math.ceil(Math.random() * 10);
    otp += `${randomNumber}`;
  }
  return otp;
};
