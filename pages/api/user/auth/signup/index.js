// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req
 * @param {import('next').NextApiResponse} res
 */
import bcrypt from "bcrypt";
import user from "../../../../../backendUtils/model/model";
import connectDB from "../../../../../backendUtils/db/connetMongo";
import { sendConfirmationEmail } from "../../../../../backendUtils/mailer/mail";
import generateCookieResponse from "../../../../../backendUtils/generatejwt";
import referral from "../../../../../backendUtils/model/referrals";
import { isConstructorDeclaration } from "typescript";
import { generateAccount } from "../../../../../backendUtils/wallet/functions";
export default async function handler(req, res) {
  await connectDB();
  if (req.method?.toLocaleLowerCase() === "post") {
    try {
      const {
        userName,
        password,
        email,
        confirmPassword,
        firstName,
        lastName,
        ref,
      } = req.body;
      if (
        !userName ||
        !password ||
        !email ||
        !confirmPassword ||
        !firstName ||
        !lastName
      ) {
        res.status(403).send(`Please fill all the required fields`);
      }
      if (password != confirmPassword)
        res.status(400).send("Your password must be equal t confirm password.");
      if (!email?.includes("@") || !email?.includes("."))
        res.status(400).send("Your email must be in correct format.");
      const userExist = await user.findOne({ $or: [{ email }, { userName }] });
      console.log(userExist);
      if (userExist) {
        res.status(400).send("Email or Username already used by another user");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const walletAccountPassword = email + userName;
        const { address, keystoreJsonV3 } = await generateAccount(
          walletAccountPassword
        );
        console.log(hashedPassword);
        try {
          let myrefData = ref ? await referral.findOne({ owner: ref }) : null;
          const createUser = await user.create({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            activated: false,
            referrer: ref,
            walletAddress: address,
            walletkeyStore: keystoreJsonV3,
          });
          const createRefs = await referral.create({
            owner: userName,
            refferals: [],
            myreferrer: ref,
          });
          if (myrefData != null && myrefData) {
            const refferals = [...myrefData.refferals, userName];
            await referral.updateOne(
              { _id: myrefData._id },
              { $set: { refferals } }
            );
          }
          // console.log(createUser)
          const toUser = {
            username: userName,
            email,
          };
          const id = createUser._id;
          return await generateCookieResponse(
            200,
            res,
            id,
            "user",
            false,
            address,
            toUser,
            "signup"
          );
          // res.status(200).send(`Kindly procced to your email to activate your account.`)
        } catch (e) {
          res.status(400).send("Email or Username Taken");
          console.log(e.message);
        }
        // res.status(200).json({ userName,email });
      }
    } catch (e) {
      res.status(400).json(e);
      console.log(e.message);
    }
  }
}

//  Get token from Model and create cookie
