export const generateEmailTemplate = (name) => {
  const html_Email = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Flipbook</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #4a90e2; padding: 20px; color: white; text-align: center;">
              <h1>Welcome to Flipbook 🎉</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
              <p style="font-size: 16px;">
                We're thrilled to have you on board! 🚀<br />
                Thank you for signing up with <strong>Flipbook</strong>. You’re now part of a growing community of smart, creative people who love sharing and discovering content.
              </p>

              <p style="font-size: 16px;">
                Get started by exploring our features and customizing your profile.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://your-app-url.com" style="background-color: #4a90e2; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Go to Flipbook</a>
              </div>

              <p style="font-size: 14px; color: #888;">
                If you have any questions or need help, feel free to reply to this email.
              </p>

              <p style="font-size: 14px;">Cheers,<br/>The Flipbook Team</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; text-align: center; padding: 15px; font-size: 12px; color: #aaa;">
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

  return html_Email;
};