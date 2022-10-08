// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req
 * @param {import('next').NextApiResponse} res
 */

import user from "../../../../backendUtils/model/model";
import { sendConfirmationEmail } from "../../../../backendUtils/mailer/mail";
import connectDB from "../../../../backendUtils/db/connetMongo";

export default async function handler(req, res) {
  await connectDB();
  if (req.method.toLowerCase() === "get") {
    const { email } = req.query;
    if (!email) return res.status(401).send("Email must be parsed");
    try {
      const userDetails = await user.findOne({
        $or: [{ email }, { userName: email }],
      });
      if (!userDetails) return res.status(400).send("User does not exist");
      const toUser = {
        username: userDetails.userName,
        email,
      };
      const returnValue = (isSuccess) => {
        if (isSuccess) {
          return res.status(200).send("Email was sent sucessfuly.");
        } else {
          return res
            .status(401)
            .send("An error occured while resending email.");
        }
      };
      return await sendConfirmationEmail(
        toUser,
        userDetails._id,
        "",
        returnValue
      );
      // res.status(200).send("Email was sent sucessfuly.");
    } catch (e) {
      return res.status(401).send("An error occured while resending email.");
    }
  }
  res.status(400).send("Method does not exist");
}
