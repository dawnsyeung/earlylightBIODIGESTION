import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = process.cwd();
const output = resolve(root, 'dist');
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.name.startsWith('.') || ['dist', 'node_modules', 'scripts', 'tests', 'package.json', 'package-lock.json', 'vercel.json'].includes(entry.name)) continue;
  cpSync(resolve(root, entry.name), resolve(output, entry.name), { recursive: true });
}
const key = process.env.POSTHOG_PROJECT_KEY || '';
const host = process.env.POSTHOG_HOST || '';
if (!key || !host) console.warn('POSTHOG_PROJECT_KEY or POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once configured');
writeFileSync(resolve(output, 'assets/analytics-config.js'), 'window.EARLYLIGHT_ANALYTICS = ' + JSON.stringify(key && host ? {key, host} : null) + ';\n');
