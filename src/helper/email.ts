import * as nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your.email@gmail.com",
    pass: "your-email-password",
  },
});

const mailOptions = {
  from: "your.email@gmail.com",
  to: "recipient@example.com",
  subject: "Scheduled Email",
  text: "This is a scheduled email from Node.js using Nodemailer and Cron.",
};

const sendingMail = transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error.message);
  } else {
    console.log("Email sent:", info.response);
  }
});

export default sendingMail;
