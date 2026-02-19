import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function validateSession(request: NextRequest) {
  const token = request.cookies.get('session-token')?.value;
  
  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
