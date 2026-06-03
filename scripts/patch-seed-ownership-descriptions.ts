import { readFileSync, writeFileSync } from 'fs';
import { descriptionUpdates } from './ownership-descriptions-data';

const bak = readFileSync('prisma/seed-data.ts.bak', 'utf8');
let updated = bak;

for (let seedId = 101; seedId <= 120; seedId++) {
  const curriculumId = seedId - 79;
  const desc = descriptionUpdates[curriculumId];
  const re = new RegExp(
    `(id: ${seedId},[\\s\\S]*?description: ")([^"]*)(")`,
    'm'
  );
  if (!re.test(updated)) {
    throw new Error(`Could not find description block for seed id ${seedId}`);
  }
  updated = updated.replace(re, `$1${desc.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}$3`);
}

writeFileSync('prisma/seed-data.ts.bak', updated);
console.log('Updated seed-data.ts.bak descriptions for ids 101–120');