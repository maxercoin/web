// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req
 * @param {import('next').NextApiResponse} res
 */
import bcrypt from "bcrypt";
import connectDB from "../../../../../backendUtils/db/connetMongo";
import user from "../../../../../backendUtils/model/model";
import generateCookieResponse from "../../../../../backendUtils/generatejwt";
export default async function handler(req, res) {
  try {
    await connectDB();
    if (req.method?.toLocaleLowerCase() === "post") {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).send("Kindly fill the require fields.");
      } else {
        const getUser = await user.findOne({
          $or: [{ email }, { userName: email }],
        });
        if (getUser && (await bcrypt.compare(password, getUser.password))) {
          //    res.status(200).send("Authorized!")
          const {
            _id: id,
            activated,
            walletAddress,
            firstName,
            lastName,
            referrer,
            userName,
            email,
          } = getUser;
          const userdata = { firstName, lastName, referrer, userName, email };
          //    res.status(200).json({id,activated})
          return generateCookieResponse(
            200,
            res,
            id,
            "user",
            activated,
            walletAddress,
            userdata
          );
        } else {
          res.status(400).send("Incorrect Password or username");
        }
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
}
