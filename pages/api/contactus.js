// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import('next').NextApiRequest } req
 * @param {import('next').NextApiResponse} res
 */

import { sendContactUs } from "../../backendUtils/mailer/mail";

export default async function handler(req, res) {
  if (req.method?.toLocaleLowerCase() === "post") {
    const { email, username, message } = req.body;
    if (!email || !username || !message) {
      return res.status(400).send("All field must be valid");
    }
    try {
      await sendContactUs(username, email, message);
      return res.status(200).send("Message sent!");
    } catch (e) {
      console.log(e);
     return res.status(400).send("An error occurred");
    }
  }
}
