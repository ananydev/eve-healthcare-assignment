import {z} from 'zod';
export const signupSchema=z.object({name:z.string().min(2).max(80),email:z.string().email(),password:z.string().min(6).max(100)});
export const loginSchema=z.object({email:z.string().email(),password:z.string().min(1)});
export const centreSchema=z.object({name:z.string().min(2),location:z.string().min(2)});
export const testSchema=z.object({name:z.string().min(2),description:z.string().optional(),durationMinutes:z.number().int().positive().optional(),centre:z.string().min(1),price:z.number().nonnegative()});
export const bookingSchema=z.object({testId:z.string().min(1),centreId:z.string().min(1),appointmentAt:z.string().datetime()});
