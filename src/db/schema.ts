// db/schema.ts
import { pgTable, serial, text, varchar, decimal, integer } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    password: varchar('password', { length: 256 }).notNull(),
    fullName: varchar('full_name', { length: 256 }).notNull(),
    user_type: varchar('user_type', { length: 50 })
        .$type<'user' | 'worker' | 'admin'>()
        .notNull()
        .default('user'),

});

export const shippingRoutes = pgTable('shipping_routes', {
    id: serial('id').primaryKey(),
    startCity: varchar('start_city', { length: 100 }).notNull(),
    endCity: varchar('end_city', { length: 100 }).notNull(),
    pricePerKgComposition: decimal('price_per_kg_composition', { precision: 10, scale: 2 }).notNull(),
    pricePerKgDoor: decimal('price_per_kg_door', { precision: 10, scale: 2 }).notNull(),
    estimatedDeliveryDaysMin: integer('estimated_delivery_days_min').notNull(),
    estimatedDeliveryDaysMax: integer('estimated_delivery_days_max').notNull(),
});

export const baseCosts = pgTable('base_costs', {
    id: serial('id').primaryKey(),
    composition: decimal('composition', { precision: 10, scale: 2 }).notNull(),
    door: decimal('door', { precision: 10, scale: 2 }).notNull(),
});

export type UserType = 'user' | 'worker' | 'admin';
export type NewUser = InferModel<typeof users, 'insert'>;