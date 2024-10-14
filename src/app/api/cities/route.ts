import { NextResponse } from 'next/server';
import { getCities } from '../../../lib/db';

export async function GET() {
  try {
    const cities = await getCities();
    console.log('Cities fetched in API route:', cities); // Add this line for debugging
    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}
