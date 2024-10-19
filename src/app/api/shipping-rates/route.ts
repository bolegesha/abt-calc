import { NextResponse } from 'next/server';
import { db } from '@/db';
import { shippingRoutes, baseCosts } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startCity = searchParams.get('startCity');
  const endCity = searchParams.get('endCity');

  if (!startCity || !endCity) {
    return NextResponse.json({ error: 'Start city and end city are required' }, { status: 400 });
  }

  try {
    const [route] = await db.select()
        .from(shippingRoutes)
        .where(and(
            eq(shippingRoutes.startCity, startCity),
            eq(shippingRoutes.endCity, endCity)
        ));

    if (!route) {
      return NextResponse.json({ error: 'Shipping route not found' }, { status: 404 });
    }

    const [costs] = await db.select().from(baseCosts);

    if (!costs) {
      return NextResponse.json({ error: 'Base costs not found' }, { status: 404 });
    }

    const rates = {
      price_per_kg_composition: Number(route.pricePerKgComposition),
      price_per_kg_door: Number(route.pricePerKgDoor),
      estimated_delivery_days_min: route.estimatedDeliveryDaysMin,
      estimated_delivery_days_max: route.estimatedDeliveryDaysMax,
      base_cost_composition: Number(costs.composition),
      base_cost_door: Number(costs.door),
    };

    return NextResponse.json(rates);
  } catch (error) {
    console.error('Failed to fetch shipping rates:', error);
    return NextResponse.json({ error: 'Failed to load shipping rates' }, { status: 500 });
  }
}