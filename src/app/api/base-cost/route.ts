import { NextResponse } from 'next/server';
import { getBaseCosts } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deliveryType = searchParams.get('deliveryType');

  if (!deliveryType) {
    return NextResponse.json({ error: 'Delivery type is required' }, { status: 400 });
  }

  try {
    const costs = await getBaseCosts();
    const cost = deliveryType === 'composition' ? costs.composition : costs.door;
    return NextResponse.json(cost);
  } catch (error) {
    console.error('Error fetching base cost:', error);
    return NextResponse.json({ error: 'Failed to fetch base cost' }, { status: 500 });
  }
}
