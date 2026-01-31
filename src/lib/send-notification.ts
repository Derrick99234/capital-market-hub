import { sendEmail } from "./mailer";
import emailTemplates from "./email-templates";

export const sendNotificationEmail = async (
  type: keyof typeof emailTemplates,
  to: string,
  name: string,
  details?: any
) => {
  try {
    const template = emailTemplates[type];
    if (!template) {
      throw new Error(`Email template for ${type} not found`);
    }

    const subject = template.subject;
    const html = template.html(name, details);

    await sendEmail(to, subject, html);
    console.log(`Email notification sent successfully: ${type} to ${to}`);
  } catch (error) {
    console.error(`Failed to send ${type} email notification:`, error);
    // Don't throw error to avoid breaking the main flow
  }
};

export default sendNotificationEmail;