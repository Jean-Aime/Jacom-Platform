import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  source: string;
}) {
  // Email disabled - configure RESEND_API_KEY to enable
  console.log('Lead notification:', lead.email);
}

export async function sendApplicationNotification(application: {
  name: string;
  email: string;
  jobTitle: string;
}) {
  try {
    await resend.emails.send({
      from: 'JAS.COM <noreply@jas.com>',
      to: 'hr@jas.com',
      subject: `New Application: ${application.jobTitle}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Candidate:</strong> ${application.name}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Position:</strong> ${application.jobTitle}</p>
      `
    });
  } catch (error) {
    console.error('Email send failed:', error);
  }
}
