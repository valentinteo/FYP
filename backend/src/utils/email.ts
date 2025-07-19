import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendCharityNotification = async (
  recipients: string[],
  charityName: string
): Promise<void> => {
  await transporter.sendMail({
    from: `"YumTap" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    bcc: recipients,
    subject: '🧡 New Charity Added on YumTap!',
    html: `
      <p>Hello!</p>
      <p>A new charity <strong>${charityName}</strong> has just been added to YumTap!</p>
      <p>Visit our site to learn more.</p>
    `,
  });
};
  