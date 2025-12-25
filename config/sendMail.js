import { createTransport } from "nodemailer";

const sendMail = async ({ email, subject, html }) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject,
    html,
  });
};

export default sendMail;
