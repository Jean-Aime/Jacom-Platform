import { NextResponse } from 'next/server';

export async function GET() {
  // Return fallback industries that match the admin panel structure
  const industries = [
    { id: '1', name: 'Management Consulting', slug: 'management-consulting' },
    { id: '2', name: 'Technology & IoT Solutions', slug: 'technology-iot-solutions' },
    { id: '3', name: 'Hospitality & Tourism', slug: 'hospitality-tourism' },
    { id: '4', name: 'IT Services & Software Development', slug: 'it-services-software-development' },
    { id: '5', name: 'Manufacturing & Industry 4.0', slug: 'manufacturing-industry-4' },
    { id: '6', name: 'Education & Training', slug: 'education-training' },
    { id: '7', name: 'Energy & Utilities', slug: 'energy-utilities' },
    { id: '8', name: 'Real Estate & Infrastructure', slug: 'real-estate-infrastructure' },
    { id: '9', name: 'Financial Services', slug: 'financial-services' },
    { id: '10', name: 'Healthcare & Life Sciences', slug: 'healthcare-life-sciences' }
  ];

  return NextResponse.json(industries);
}