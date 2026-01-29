// Unified CRM Integration
// Supports: HubSpot, Salesforce

interface LeadData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  jobTitle?: string;
  message?: string;
  source: string;
  score?: number;
  metadata?: any;
}

// HubSpot Integration
async function syncToHubSpot(lead: LeadData) {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    console.warn('HubSpot API key not configured');
    return { success: false, error: 'API key missing' };
  }

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        properties: {
          email: lead.email,
          firstname: lead.name.split(' ')[0] || '',
          lastname: lead.name.split(' ').slice(1).join(' ') || '',
          company: lead.company || '',
          phone: lead.phone || '',
          jobtitle: lead.jobTitle || '',
          message: lead.message || '',
          hs_lead_status: 'NEW',
          lead_source: lead.source,
          lead_score: lead.score || 0
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, contactId: data.id, provider: 'hubspot' };
  } catch (error) {
    console.error('HubSpot sync failed:', error);
    return { success: false, error: String(error) };
  }
}

// Salesforce Integration
async function syncToSalesforce(lead: LeadData) {
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;
  const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;

  if (!instanceUrl || !accessToken) {
    console.warn('Salesforce credentials not configured');
    return { success: false, error: 'Credentials missing' };
  }

  try {
    const response = await fetch(`${instanceUrl}/services/data/v57.0/sobjects/Lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        FirstName: lead.name.split(' ')[0] || '',
        LastName: lead.name.split(' ').slice(1).join(' ') || 'Unknown',
        Email: lead.email,
        Company: lead.company || 'Unknown',
        Phone: lead.phone || '',
        Title: lead.jobTitle || '',
        Description: lead.message || '',
        LeadSource: lead.source,
        Status: 'Open - Not Contacted',
        Rating: lead.score && lead.score > 70 ? 'Hot' : lead.score && lead.score > 40 ? 'Warm' : 'Cold'
      })
    });

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, leadId: data.id, provider: 'salesforce' };
  } catch (error) {
    console.error('Salesforce sync failed:', error);
    return { success: false, error: String(error) };
  }
}

// Main sync function
export async function syncLeadToCRM(lead: LeadData) {
  const provider = process.env.CRM_PROVIDER || 'hubspot';

  console.log(`Syncing lead to ${provider}:`, { email: lead.email, source: lead.source });

  if (provider === 'salesforce') {
    return await syncToSalesforce(lead);
  } else {
    return await syncToHubSpot(lead);
  }
}

// Batch sync for multiple leads
export async function batchSyncLeads(leads: LeadData[]) {
  const results = await Promise.allSettled(
    leads.map(lead => syncLeadToCRM(lead))
  );

  return {
    total: leads.length,
    successful: results.filter(r => r.status === 'fulfilled').length,
    failed: results.filter(r => r.status === 'rejected').length,
    results
  };
}
