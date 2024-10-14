import { NextResponse } from 'next/server';
import { getShippingRates } from '../../../lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startCity = searchParams.get('startCity');
  const endCity = searchParams.get('endCity');
  const deliveryType = searchParams.get('deliveryType');

  if (!startCity || !endCity || !deliveryType) {
    return NextResponse.json({ error: 'Start city, end city, and delivery type are required' }, { status: 400 });
  }

  try {
    const rates = await getShippingRates(startCity, endCity);
    const cost = deliveryType === 'composition' ? rates.price_per_kg_composition : rates.price_per_kg_door;
    return NextResponse.json(cost);
  } catch (error) {
    console.error('Error fetching shipping cost:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping cost' }, { status: 500 });
  }
}
