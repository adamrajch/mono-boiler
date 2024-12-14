import 'server-only';

import { neon } from '@neondatabase/serverless';
import { env } from '@repo/env';
import { drizzle } from 'drizzle-orm/neon-http';

const client = neon(env.DATABASE_URL);

export const db = drizzle({ client });
