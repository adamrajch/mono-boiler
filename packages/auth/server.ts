import { db } from '@repo/database';
import * as schema from '@repo/database/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies, toNextJsHandler } from 'better-auth/next-js';
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.user,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export const nextAuthHandler = toNextJsHandler(auth.handler);
