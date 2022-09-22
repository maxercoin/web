import nodemailer from "nodemailer";

export async function sendConfirmationEmail(toUser, hash, msg) {
  const transporter = nodemailer.createTransport({
    host: "maxercoin.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "admin@maxercoin.com", // generated ethereal user
      pass: "SWQjW7pNb.t(", // generated ethereal password
    },
  });

  let message = {
    from: "maxercoin <admin@maxercoin.com>",
    to: toUser.email,
    subject: "maxercoin -  Kindly Activate your maxercoin account",
    html: ` 
            <h2>Hello ${toUser.username}<h2/>
            <p>Thank you for registering your account </p>>
            <p>Kindly click the button bellow to complete your registration. </p>>
            <a target="_blank" href='${process.env.DOMAIN}/api/user/auth/signup/confirm?hash=${hash}'>CLICK HERE</a> 
        
        `,
  };
  if (msg?.type === "otp") {
    message = {
      from: "maxercoin <admin@maxercoin.com>",
      to: toUser.email,
      subject: "maxercoin -  OTP",
      html: ` 
            <h2>Hello ${toUser.username}<h2/>
            <p>Use this otp to activate your account </p>
            <h1 fontWeight='900' fontSize='2em'>${msg.message}</h1>
            
        
        `,
    };
  }

  return transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    if (info) return console.log(info);
  });
}
export function appreciateEmail(toUser) {
  const transporter = nodemailer.createTransport({
    host: "maxercoin.com",
    port: 587,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "admin@maxercoin.com",
      pass: "SWQjW7pNb.t(",
    },
  });

  const message = {
    from: process.env.EMAIL_USERNAME,
    to: toUser.email,
    subject: "maxercoin - Account Activated",
    html: ` 
            <h2>Congratulations ${toUser.username}<h2/><br />
            <p>Thank you for registering your account, your account has been succesfully activated </p>><br /> 
            
        
        `,
  };
  return transporter.sendMail(message, (err, info) => {
    if (err) return err;
    if (info) return info;
  });
}
