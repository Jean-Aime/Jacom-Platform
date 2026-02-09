import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // HubSpot API integration
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    const hubspotUrl = 'https://api.hubapi.com/contacts/v1/contact';

    const hubspotData = {
      properties: [
        { property: 'email', value: data.email },
        { property: 'firstname', value: data.name?.split(' ')[0] || '' },
        { property: 'lastname', value: data.name?.split(' ')[1] || '' },
        { property: 'company', value: data.company || '' },
        { property: 'phone', value: data.phone || '' },
        { property: 'message', value: data.message || '' },
        { property: 'lead_source', value: data.source || 'website' }
      ]
    };

    // In production: Make actual API call
    // const response = await fetch(hubspotUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${hubspotApiKey}`
    //   },
    //   body: JSON.stringify(hubspotData)
    // });

    console.log('Lead data to CRM:', hubspotData);

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully',
      data: hubspotData 
    });

  } catch (error) {
    console.error('CRM integration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}