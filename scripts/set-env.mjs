/**
 * Generates src/environments/environment.prod.ts from environment variables.
 * Run automatically by `npm run build:vercel` before the Angular production build.
 *
 * Required variables (set in Vercel dashboard → Settings → Environment Variables):
 *   NG_APP_SUPABASE_URL   — your Supabase project URL
 *   NG_APP_SUPABASE_KEY   — your Supabase anon key (public)
 */

import { writeFileSync } from 'fs';

const url = process.env['NG_APP_SUPABASE_URL'];
const key = process.env['NG_APP_SUPABASE_KEY'];

if (!url || !key) {
  console.error(
    '\nMissing required environment variables:\n' +
    '  NG_APP_SUPABASE_URL\n' +
    '  NG_APP_SUPABASE_KEY\n\n' +
    'Set them in the Vercel dashboard (Settings → Environment Variables)\n' +
    'or in a local .env file when running build:vercel locally.\n'
  );
  process.exit(1);
}

const content =
`export const environment = {
  production: true,
  supabaseUrl: '${url}',
  supabaseKey: '${key}'
};
`;

writeFileSync('src/environments/environment.prod.ts', content, 'utf8');
console.log('Generated src/environments/environment.prod.ts from environment variables.');
