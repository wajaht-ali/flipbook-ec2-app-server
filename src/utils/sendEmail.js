import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: config.AUTHOR_EMAIL,
    pass: config.AUTHOR_PASSWORD,
  },
});

async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Flipbook 📚" <${config.AUTHOR_EMAIL}>`,
      to,
      subject,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export default sendMail;
