import { createTransport } from "nodemailer";

const sendMail = async ({ email, subject, html }) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const info = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html,
    });
    console.log(
      `Email sent successfully to ${email}. Message ID: ${info.messageId}`,
    );
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendMail;
