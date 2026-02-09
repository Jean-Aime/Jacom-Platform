import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  source: string;
}) {
  try {
    await resend.emails.send({
      from: 'JAS.COM <noreply@jas.com>',
      to: 'admin@jas.com',
      subject: `New Lead: ${lead.name} from ${lead.source}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        ${lead.company ? `<p><strong>Company:</strong> ${lead.company}</p>` : ''}
        ${lead.message ? `<p><strong>Message:</strong> ${lead.message}</p>` : ''}
        <p><strong>Source:</strong> ${lead.source}</p>
      `
    });
  } catch (error) {
    console.error('Email send failed:', error);
  }
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
