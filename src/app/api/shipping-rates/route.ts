import { NextResponse } from 'next/server';
import { getShippingRates, getBaseCosts } from '../../../lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startCity = searchParams.get('startCity');
  const endCity = searchParams.get('endCity');

  console.log('Received request for shipping rates:', { startCity, endCity });

  if (!startCity || !endCity) {
    return NextResponse.json({ error: 'Start city and end city are required' }, { status: 400 });
  }

  try {
    const shippingRates = await getShippingRates(startCity, endCity);
    const baseCosts = await getBaseCosts();

    const rates = {
      ...shippingRates,
      base_cost_composition: baseCosts.composition,
      base_cost_door: baseCosts.door,
    };

    console.log('Shipping rates and base costs fetched:', rates);
    return NextResponse.json(rates);
  } catch (error) {
    console.error('Error fetching shipping rates and base costs:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping rates and base costs', details: error.message }, { status: 500 });
  }
}
