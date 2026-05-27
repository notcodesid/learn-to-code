import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

export function loadEnv() {
  // This function is called to ensure env vars are loaded at build time
  // The actual loading happens via the config() call above
}