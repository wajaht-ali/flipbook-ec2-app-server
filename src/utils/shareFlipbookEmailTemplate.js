export const generateShareEmailTemplate = (senderName, receiverName, flipbookUrl) => {
  // Fallback if receiver name is not provided
  const greetingName = receiverName ? receiverName : "there";

  const share_html_Email = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Flipbook Shared with You</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f8fa;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(90deg, #4a90e2, #56cfe1); padding: 25px; text-align: center; color: #fff;">
              <h1 style="margin: 0; font-size: 24px;">📖 A Flipbook Has Been Shared With You</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #333;">Hi ${greetingName},</p>
              <p style="font-size: 16px; color: #555; line-height: 1.6;">
                <strong>${senderName}</strong> has shared a Flipbook with you.  
                Click the button below to open and view it online.
              </p>

              <div style="text-align: center; margin: 40px 0;">
                <a href="${flipbookUrl}" target="_blank" 
                  style="background: linear-gradient(90deg, #4a90e2, #56cfe1); color: #fff; padding: 14px 28px; 
                  text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                  View Flipbook
                </a>
              </div>

              <p style="font-size: 14px; color: #888; line-height: 1.6;">
                If you weren’t expecting this, you can safely ignore this email.  
              </p>

              <p style="font-size: 14px; color: #333; margin-top: 25px;">
                Cheers,<br/>The Flipbook Team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f4f6f8; text-align: center; padding: 20px; font-size: 12px; color: #999;">
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
  return share_html_Email;
};
