export const getOtpHtml = ({ email, otp }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="font-family: Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background-color: #4F46E5; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Authentication App</h1>
    </div>
    <div style="padding: 30px; text-align: center;">
      <h2 style="color: #333333; margin-top: 0;">Verify Your Login</h2>
      <p style="color: #666666; font-size: 16px; line-height: 1.5;">Please use the following OTP to complete your login procedure.</p>
      <div style="margin: 30px 0;">
        <span style="display: inline-block; background-color: #f0f0f0; border: 1px solid #dddddd; padding: 15px 30px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333333; border-radius: 5px;">${otp}</span>
      </div>
      <p style="color: #999999; font-size: 14px;">This code expires in 5 minutes.</p>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
      <p style="color: #888888; font-size: 12px; margin: 0;">If you did not request this code, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
  `;
};

export const getVerifyEmailHtml = ({ email, token }) => {
  const appName = process.env.APP_NAME || "Authentication App";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  // Trim trailing slash from baseUrl if present
  const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(token)}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background-color: #4F46E5; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${appName}</h1>
    </div>
    <div style="padding: 30px; text-align: center;">
      <h2 style="color: #333333; margin-top: 0;">Verify Your Email Address</h2>
      <p style="color: #666666; font-size: 16px; line-height: 1.5;">Welcome! Please confirm your email address to activate your account.</p>
      <div style="margin: 30px 0;">
        <a href="${verifyUrl}" style="background-color: #4F46E5; color: #ffffff; text-decoration: none; padding: 15px 30px; font-size: 16px; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email</a>
      </div>
      <p style="color: #666666; font-size: 14px; margin-bottom: 5px;">Or copy this link:</p>
      <a href="${verifyUrl}" style="color: #0066cc; font-size: 14px; word-break: break-all;">${verifyUrl}</a>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
      <p style="color: #888888; font-size: 12px; margin: 0;">If you did not sign up for this account, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
  `;
};
