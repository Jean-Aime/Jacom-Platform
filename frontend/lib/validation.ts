import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email().max(255);

// Sanitize HTML to prevent XSS
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate and sanitize user input
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

// Phone number validation
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);

// URL validation
export const urlSchema = z.string().url().max(2048);

// Slug validation
export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

// File upload validation
export function validateFileUpload(file: File, allowedTypes: string[], maxSize: number): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File size exceeds ${maxSize / 1024 / 1024}MB` };
  }
  
  return { valid: true };
}

// SQL injection prevention (for raw queries)
export function escapeSql(input: string): string {
  return input.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case '\0': return '\\0';
      case '\x08': return '\\b';
      case '\x09': return '\\t';
      case '\x1a': return '\\z';
      case '\n': return '\\n';
      case '\r': return '\\r';
      case '"':
      case "'":
      case '\\':
      case '%':
        return '\\' + char;
      default:
        return char;
    }
  });
}

// Validate JSON input
export function validateJson(input: string): { valid: boolean; data?: any; error?: string } {
  try {
    const data = JSON.parse(input);
    return { valid: true, data };
  } catch (error) {
    return { valid: false, error: 'Invalid JSON' };
  }
}

// Rate limit key generator
export function getRateLimitKey(ip: string, endpoint: string): string {
  return `ratelimit:${ip}:${endpoint}`;
}
