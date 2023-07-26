const nodemailer = require("nodemailer");

// emailsend(email,subj,body);
module.exports = {
  emailsend: (to, subject, Body) => {
    console.log(to);
    console.log(subject);
    console.log(Body);
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    let mailDetails = {
      from: process.env.EMAIL,
      to,
      subject,
      html: Body,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
  },
};
