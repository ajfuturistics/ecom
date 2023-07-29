const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_KEY,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
