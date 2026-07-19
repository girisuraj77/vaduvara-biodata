import nodemailer from "nodemailer";

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Prevent handshake failures on custom domains or shared hostings (e.g. Hostinger, Zoho)
    rejectUnauthorized: false
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

export async function sendOTPEmail(email: string, otp: string) {
  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️ SMTP is not fully configured. Email sending skipped.");
    console.log(`OTP for ${email}: ${otp}`);

    // In development, we can return success but log the OTP
    if (process.env.NODE_ENV === "development") {
      return { messageId: "dev-mode-mock-id" };
    }

    throw new Error("Email service is not configured.");
  }

  // Ensure from header matches the authenticated user to avoid SPF / domain misalignment silent drops
  const fromEmail = process.env.SMTP_FROM || (process.env.SMTP_USER ? `"Vadhuvar Biodata" <${process.env.SMTP_USER}>` : '"Vadhuvar Biodata" <noreply@vadhuvarbiodata.com>');

  const mailOptions = {
    from: fromEmail,
    to: email,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
        <h2 style="color: #430917; text-align: center;">Vadhuvar Biodata</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Use the OTP below to proceed. This code is valid for 10 minutes.</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background: #f4f4f4; padding: 10px 20px; border-radius: 5px; border: 1px dashed #ccc;">
            ${otp}
          </span>
        </div>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          &copy; ${new Date().getFullYear()} Vadhuvar Biodata. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("SMTP Error Diagnostics:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      from: fromEmail,
      error: error instanceof Error ? error.message : error
    });
    throw error;
  }
}
