const getOtpHtml = ({ email, otp }) => {
  const appName = process.env.APP_NAME || "Authentication App";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${appName} Verification Code</title>

  <style>
    html, body {
      margin: 0;
      padding: 0;
    }

    body {
      background: #f3f4f6;
      color: #111827;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table {
      border-collapse: collapse;
    }

    .wrapper {
      width: 100%;
      background: #f3f4f6;
      padding: 32px 12px;
    }

    .container {
      width: 600px;
      max-width: 100%;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #111827, #1f2937);
      padding: 22px;
      text-align: center;
    }

    .brand {
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.4px;
    }

    .content {
      padding: 36px 32px;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 12px;
    }

    .text {
      font-size: 15px;
      line-height: 1.7;
      color: #374151;
      margin: 0 0 18px;
    }

    .otp-box {
      text-align: center;
      margin: 28px 0;
    }

    .otp {
      display: inline-block;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px 22px;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 6px;
      color: #111827;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      -webkit-text-size-adjust: none;
    }

    .muted {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.6;
      margin: 10px 0;
    }

    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 28px 0;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      padding: 18px 24px 26px;
    }

    @media (max-width: 600px) {
      .content {
        padding: 26px 22px;
      }
      .otp {
        font-size: 28px;
        letter-spacing: 5px;
      }
    }
  </style>
</head>

<body>
  <table class="wrapper" width="100%" role="presentation">
    <tr>
      <td align="center">
        <table class="container" role="presentation">
          <tr>
            <td class="header">
              <span class="brand">${appName}</span>
            </td>
          </tr>

          <tr>
            <td class="content">
              <h1 class="title">Verify your email</h1>

              <p class="text">
                Hi <strong>${email}</strong>,<br />
                Use the verification code below to securely sign in to your ${appName} account.
              </p>

              <div class="otp-box">
                <div class="otp">${otp}</div>
              </div>

              <p class="muted">
                This code is valid for <strong>5 minutes</strong>. For your security, do not share it with anyone.
              </p>

              <div class="divider"></div>

              <p class="muted">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td class="footer">
              © ${new Date().getFullYear()} ${appName}. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const getVerifyEmailHtml = ({ email, token }) => {
  const appName = process.env.APP_NAME || "Authentication App";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(token)}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Verify your ${appName} account</title>

  <style>
    html, body {
      margin: 0;
      padding: 0;
    }

    body {
      background: #f3f4f6;
      color: #111827;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    table {
      border-collapse: collapse;
    }

    .wrapper {
      width: 100%;
      padding: 32px 12px;
    }

    .container {
      width: 600px;
      max-width: 100%;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #111827, #1f2937);
      padding: 22px;
      text-align: center;
    }

    .brand {
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
    }

    .content {
      padding: 36px 32px;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .text {
      font-size: 15px;
      line-height: 1.7;
      color: #374151;
      margin-bottom: 20px;
    }

    .btn {
      display: inline-block;
      background: #111827;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 22px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 15px;
    }

    .link {
      word-break: break-all;
      color: #111827;
      text-decoration: underline;
    }

    .muted {
      font-size: 14px;
      color: #6b7280;
      margin-top: 16px;
      line-height: 1.6;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      padding: 18px 24px 26px;
    }
  </style>
</head>

<body>
  <table class="wrapper" role="presentation" width="100%">
    <tr>
      <td align="center">
        <table class="container" role="presentation">
          <tr>
            <td class="header">
              <span class="brand">${appName}</span>
            </td>
          </tr>

          <tr>
            <td class="content">
              <h1 class="title">Verify your account</h1>

              <p class="text">
                Hi <strong>${email}</strong>,<br />
                Thanks for signing up for ${appName}. Click the button below to verify your account.
              </p>

              <p style="text-align:center; margin: 28px 0;">
                <a href="${verifyUrl}" class="btn" target="_blank" rel="noopener">
                  Verify account
                </a>
              </p>

              <p class="muted">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>

              <p class="muted">
                <a href="${verifyUrl}" class="link" target="_blank" rel="noopener">${verifyUrl}</a>
              </p>

              <p class="muted">
                If you didn’t create this account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td class="footer">
              © ${new Date().getFullYear()} ${appName}. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export { getOtpHtml, getVerifyEmailHtml };