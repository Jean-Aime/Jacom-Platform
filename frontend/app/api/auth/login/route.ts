import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Input validation
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const attemptKey = `${clientIp}-${email}`;
    const attempt = loginAttempts.get(attemptKey);
    
    if (attempt && attempt.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempt.lastAttempt;
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        return NextResponse.json(
          { error: 'Too many login attempts. Try again later.' },
          { status: 429 }
        );
      }
      loginAttempts.delete(attemptKey);
    }
    
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Record failed attempt
      const current = loginAttempts.get(attemptKey) || { count: 0, lastAttempt: 0 };
      loginAttempts.set(attemptKey, { count: current.count + 1, lastAttempt: Date.now() });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const current = loginAttempts.get(attemptKey) || { count: 0, lastAttempt: 0 };
      loginAttempts.set(attemptKey, { count: current.count + 1, lastAttempt: Date.now() });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Clear failed attempts on success
    loginAttempts.delete(attemptKey);

    // Generate secure session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store session in database
    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt: sessionExpiry
      }
    });

    const cookieStore = await cookies();
    cookieStore.set('session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/'
    });
    
    const response = NextResponse.json({ success: true });
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
