import { sql } from '@vercel/postgres';

export async function getShippingRates(startCity: string, endCity: string) {
  try {
    console.log(`Fetching shipping rates for ${startCity} to ${endCity}`);
    const { rows } = await sql`
      SELECT 
        price_per_kg_composition::float,
        price_per_kg_door::float,
        estimated_delivery_days_min,
        estimated_delivery_days_max
      FROM shipping_routes
      WHERE start_city = ${startCity} AND end_city = ${endCity}
    `;
    console.log('Query result:', rows);

    if (rows.length === 0) {
      throw new Error(`No shipping rates found for ${startCity} to ${endCity}`);
    }

    return rows[0];
  } catch (error) {
    console.error('Database query error in getShippingRates:', error);
    throw error;
  }
}

export async function getCities() {
  try {
    const { rows } = await sql`
      SELECT DISTINCT city
      FROM (
        SELECT start_city as city FROM shipping_routes
        UNION
        SELECT end_city as city FROM shipping_routes
      ) as cities
      ORDER BY city
    `;
    return rows.map(row => row.city);
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to fetch cities');
  }
}

export async function getBaseCosts() {
  try {
    console.log('Fetching base costs');
    const { rows } = await sql`
      SELECT composition::float, door::float
      FROM base_costs
    `;
    console.log('Base costs query result:', rows);

    if (rows.length === 0) {
      throw new Error('No base costs found');
    }

    return rows[0];
  } catch (error) {
    console.error('Database query error in getBaseCosts:', error);
    throw error;
  }
}
