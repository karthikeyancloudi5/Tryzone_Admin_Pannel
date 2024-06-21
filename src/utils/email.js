const nodemailer = require("nodemailer");
const mailConfigSchema = require("../model/settingsModel/mailConfigModel");

const sendEmail = async (options) => {
  const emailData = await mailConfigSchema.findOne();

  console.log(emailData);

  let transport = {
    host:
      emailData && emailData.mailHost
        ? emailData.mailHost
        : process.env.SMPT_HOST,
    port:
      emailData && emailData.mailPort
        ? emailData.mailPort
        : process.env.SMPT_PORT,
    auth: {
      user:
        emailData && emailData.mailUsername
          ? emailData.mailUsername
          : process.env.SMPT_USER,
      pass:
        emailData && emailData.mailPassword
          ? emailData.mailPassword
          : process.env.SMPT_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(transport);
  let FromName =
    emailData && emailData.mailFromName
      ? emailData.mailFromName
      : process.env.SMPT_FROM_NAME;
  let FromAddress =
    emailData && emailData.mailFromAddress
      ? emailData.mailFromAddress
      : process.env.SMPT_FROM_EMAIL;

  const message = {
    from: `${FromName}<${FromAddress}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
