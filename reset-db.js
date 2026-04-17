import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function resetDatabase() {
  try {
    console.log('Dropping existing tables...');
    
    // Drop tables in reverse order of dependencies
    await db.execute(sql`DROP TABLE IF EXISTS "_drizzle_migrations" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "accounts" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "sessions" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "verifications" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "communities" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "users" CASCADE`);
    
    console.log('✓ All tables dropped successfully');
    
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

resetDatabase();
