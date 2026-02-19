import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost/Jacom-Platform/backend';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const response = await fetch(`${BACKEND_URL}/subscribers`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Subscription failed' }, { status: response.status });
    }
    
    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
