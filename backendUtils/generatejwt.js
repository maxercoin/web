import JWT from "jsonwebtoken";
import { sendConfirmationEmail } from "./mailer/mail";
const generateCookieResponse = async (
  statusCode,
  res,
  id,
  role,
  active = false,
  walletAddress,
  userdata,
  mode
) => {
  const token = JWT.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  if (mode === "signup") {
    const returnValue = (isSuccess) => {
      if (isSuccess) {
        return res.status(200).json({
          success: true,
          token,
          active,
          id,
          walletAddress,
          userdata,
        });
      } else {
        return res.status(401).json({
          success: false,
          token,
          active,
          id,
          walletAddress,
          userdata,
        });
      }
    };
    return await sendConfirmationEmail(toUser, id, "", returnValue);
  }
  return res.status(statusCode).json({
    success: true,
    token,
    active,
    id,
    walletAddress,
    userdata,
  });
};

//  Generate JWT
const generateToken = (id, role) => {
  return JWT.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generateCookieResponse;
