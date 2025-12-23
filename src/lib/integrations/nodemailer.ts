import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

/**
 * Send an email using Nodemailer
 */
export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, html, text, from } = options;

  try {
    const info = await transporter.sendMail({
      from:
        from ||
        process.env.SMTP_FROM ||
        "The World Shall be Saved <noreply@twsbs.org>",
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

/**
 * Send invitation email to new user
 */
export async function sendInvitationEmail(
  to: string,
  inviterName: string,
  inviteLink: string,
) {
  const subject = `${inviterName} invited you to join The World Shall be Saved`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>You're Invited!</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p><strong>${inviterName}</strong> has invited you to join <strong>The World Shall be Saved</strong>, an evangelism app that helps you learn about Jesus through courses, track your progress, and participate in crusade events.</p>
            <p>Click the button below to accept the invitation and create your account:</p>
            <p style="text-align: center;">
              <a href="${inviteLink}" class="button">Accept Invitation</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #4F46E5;">${inviteLink}</p>
          </div>
          <div class="footer">
            <p>If you didn't expect this invitation, you can safely ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} The World Shall be Saved. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
${inviterName} invited you to join The World Shall be Saved

You've been invited to join The World Shall be Saved, an evangelism app that helps you learn about Jesus through courses, track your progress, and participate in crusade events.

Click this link to accept the invitation and create your account:
${inviteLink}

If you didn't expect this invitation, you can safely ignore this email.

© ${new Date().getFullYear()} The World Shall be Saved. All rights reserved.
  `;

  return sendEmail({ to, subject, html, text });
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(to: string, userName: string) {
  const subject = "Welcome to The World Shall be Saved!";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome, ${userName}!</h1>
          </div>
          <div class="content">
            <p>Thank you for joining <strong>The World Shall be Saved</strong>!</p>
            <p>We're excited to have you as part of our community. Here's what you can do next:</p>
            <ul>
              <li>Complete your profile</li>
              <li>Start your discipleship journey</li>
              <li>Explore our courses</li>
              <li>Connect with your network</li>
            </ul>
            <p style="text-align: center;">
              <a href="${process.env.NEXTAUTH_URL}" class="button">Get Started</a>
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} The World Shall be Saved. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Welcome, ${userName}!

Thank you for joining The World Shall be Saved!

We're excited to have you as part of our community. Here's what you can do next:
- Complete your profile
- Start your discipleship journey
- Explore our courses
- Connect with your network

Get started: ${process.env.NEXTAUTH_URL}

© ${new Date().getFullYear()} The World Shall be Saved. All rights reserved.
  `;

  return sendEmail({ to, subject, html, text });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const subject = "Reset Your Password";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .warning { background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>You requested to reset your password for The World Shall be Saved.</p>
            <p>Click the button below to reset your password:</p>
            <p style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #4F46E5;">${resetLink}</p>
            <div class="warning">
              <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request this password reset, please ignore this email.
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} The World Shall be Saved. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Password Reset Request

You requested to reset your password for The World Shall be Saved.

Click this link to reset your password:
${resetLink}

This link will expire in 1 hour. If you didn't request this password reset, please ignore this email.

© ${new Date().getFullYear()} The World Shall be Saved. All rights reserved.
  `;

  return sendEmail({ to, subject, html, text });
}

/**
 * Verify SMTP connection
 */
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log("SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.error("SMTP connection verification failed:", error);
    return false;
  }
}
