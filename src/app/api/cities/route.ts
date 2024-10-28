import { NextResponse } from 'next/server';
import { db } from '@/db';
import { shippingRoutes } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const citiesResult = await db.select({ city: sql`DISTINCT start_city` })
        .from(shippingRoutes)
        .union(
            db.select({ city: sql`DISTINCT end_city` }).from(shippingRoutes)
        );

    const cities = citiesResult.map(result => result.city);
    const uniqueCities = Array.from(new Set(cities));

    return NextResponse.json(uniqueCities);
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    return NextResponse.json({ error: 'Failed to load cities' }, { status: 500 });
  }
}