// app/api/calculate-shipping/route.ts
import { NextResponse } from 'next/server';
import { getShippingRates, getBaseCosts } from '@/lib/db';

interface CalculationRequest {
    weight: number;
    length: number | null;
    width: number | null;
    height: number | null;
    startCity: string;
    endCity: string;
    shippingType: 'composition' | 'door';
}

export async function POST(request: Request) {
    console.log('📥 Received shipping calculation request');

    try {
        const body: CalculationRequest = await request.json();
        console.log('📦 Request data:', body);

        // Validation
        if (!body.weight || !body.startCity || !body.endCity) {
            return NextResponse.json(
                { message: 'Please fill in all required fields' },
                { status: 400 }
            );
        }

        if (body.weight <= 0) {
            return NextResponse.json(
                { message: 'Weight must be greater than 0' },
                { status: 400 }
            );
        }

        // Fetch both shipping rates and base costs in parallel
        const [rates, baseCosts] = await Promise.all([
            getShippingRates(body.startCity, body.endCity),
            getBaseCosts()
        ]);

        console.log('💰 Fetched rates:', rates);
        console.log('💰 Fetched base costs:', baseCosts);

        // Calculate costs
        const pricePerKg = body.shippingType === "composition"
            ? rates.price_per_kg_composition
            : rates.price_per_kg_door;
        const baseCost = body.shippingType === "composition"
            ? baseCosts.composition
            : baseCosts.door;

        console.log('📊 Calculation parameters:', {
            pricePerKg,
            baseCost,
            weight: body.weight,
            dimensions: body.length && body.width && body.height ?
                `${body.length}x${body.width}x${body.height}` : 'Not provided'
        });

        // Calculate cost by weight
        let costByWeight: number;
        if (body.weight <= 20) {
            costByWeight = baseCost;
        } else {
            costByWeight = baseCost + (body.weight - 20) * pricePerKg;
        }

        console.log('⚖️ Weight-based cost:', costByWeight);

        // Calculate cost by volume if dimensions are provided
        let finalCost = costByWeight;
        if (body.length && body.width && body.height) {
            const volumeWeight = (body.length * body.width * body.height) / 5000;
            const volumeCost = volumeWeight * pricePerKg;
            console.log('📏 Volume calculation:', {
                volumeWeight,
                volumeCost
            });
            finalCost = Math.max(volumeCost, costByWeight);
        }

        const result = {
            finalCost: Math.round(finalCost),
            deliveryEstimate: `от ${rates.estimated_delivery_days_min} до ${rates.estimated_delivery_days_max} дней`
        };

        console.log('✅ Final calculation result:', result);

        return NextResponse.json(result);

    } catch (error) {
        console.error('🔥 Shipping calculation error:', error);

        // Provide more specific error messages based on the error type
        if (error instanceof Error) {
            if (error.message.includes('No shipping rates found')) {
                return NextResponse.json(
                    { message: 'Shipping rates not available for this route' },
                    { status: 404 }
                );
            }
            if (error.message.includes('No base costs found')) {
                return NextResponse.json(
                    { message: 'Base costs configuration is missing' },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json(
            { message: 'Failed to calculate shipping cost' },
            { status: 500 }
        );
    }
}