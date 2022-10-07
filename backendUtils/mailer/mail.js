import nodemailer from "nodemailer";

export async function sendConfirmationEmail(toUser, hash, msg) {
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "maxercoin@gmail.com", // generated ethereal user
      pass: process.env.MAIL_PASSWORD || "GY-h/?A!mmr4r5y", // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  let message = {
    from: "maxercoin <admin@maxercoin.com>",
    to: toUser.email,
    subject: "maxercoin -  Kindly Activate your maxercoin account",
    html: ` 
            <h2>Hello ${toUser.username}</h2>
            <p>Thank you for registering your account </p>>
            <p>Kindly click the button bellow to complete your registration. </p>>
            <a target="_blank" href='${process.env.DOMAIN}/api/user/auth/signup/confirm?hash=${hash}'>CLICK HERE</a> 
        `
  };
  if (msg?.type === "otp") {
    message = {
      from: "maxercoin <admin@maxercoin.com>",
      to: toUser.email,
      subject: "maxercoin -  OTP",
      html: ` 
            <h2 style={{color:'blue',fontSize:'20px'}}>Hello ${toUser.username}</h2>
            <p>Use this otp to activate your account </p>
            <h1 style={{fontWeight:'900', fontSize:'2em'}}>${msg.message}</h1>
        `,
    };
  }

  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    if (info) return console.log(info);
  });
  return;
}
export function appreciateEmail(toUser) {
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "maxercoin@gmail.com", // generated ethereal user
      pass: process.env.MAIL_PASSWORD || "GY-h/?A!mmr4r5y", // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: "Maxercoin <admin@maxercoin.com>",
    to: toUser.email,
    subject: "maxercoin - Account Activated",
    html: ` 
            <h2 style={{color:'blue',fontSize:'24px'}}>Congratulations ${toUser.username}<h2/><br />
            <p style={{color:'blue',fontSize:'16px'}}>Thank you for registering your account, your account has been succesfully activated </p>><br /> 
        `,
  };
  transporter.sendMail(message, (err, info) => {
    if (err) return err;
    if (info) return info;
  });
  return;
}
export function sendContactUs(username, Email, Message) {
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "admin@maxercoin.com", // generated ethereal user
      pass: process.env.MAIL_PASSWORD || "qXLckEd31B98", // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: username + " <admin@maxercoin.com>",
    to: "maxercoin1@gmail.com",
    subject: "Contact Us message from " + username,
    html: ` 
            <h2 style={{color:'blue',fontSize:'24px'}}>Message from ${username}<h2/><br />
            <p style={{color:'blue',fontSize:'16px'}}>Email: ${Email}</p>><br /> 
            <p style={{color:'blue',fontSize:'16px'}}>Message: ${Message}</p>><br />  
        `
  };
  transporter.sendMail(message, (err, info) => {
    console.log({ err, info });
    if (err) return err;
    if (info) return info;
  });
  return;
}
