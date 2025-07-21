export const generateOTPTemplate = (name, otp) => {
  const html_OTP = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" style="background-color: #ffffff; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #4a90e2; padding: 20px; color: white; text-align: center;">
              <h1>Reset Password Request 🔐</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
              <p style="font-size: 14px;">
                We received a request to reset your password for your Flipbook account.
              </p>
              <p style="font-size: 14px;">
                Please use the one-time password (OTP) below to reset your password. This OTP is valid for <strong>5 minutes</strong>.
              </p>

              <div style="text-align: center; margin: 30px 20px;">
                <a style="display: inline-block; background-color: #4a90e2; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-size: 20px; font-weight: bold;">
                  ${otp}
                </a>
              </div>

              <p style="font-size: 13px; color: #888;">
                If you didn’t request this password reset, you can safely ignore this email.
              </p>

              <p style="font-size: 13px;">Regards,<br/>The Flipbook Team</p>
            </td>
          </tr>
         <tr>
  <td style="background-color: #ffffff; text-align: center; padding: 10px 0; font-size: 12px; color: #aaa;">
    © 2025 Flipbook Inc. All rights reserved.
  </td>
</tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`;

  return html_OTP;
};
