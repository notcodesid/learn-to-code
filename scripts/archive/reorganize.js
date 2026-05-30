const fs = require('fs');

// Read the file
const content = fs.readFileSync('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'utf8');

// Extract the header
const headerMatch = content.match(/(.*?export const challenges: Challenge\[\] = \[)/s);
const header = headerMatch ? headerMatch[1] : '';

// Extract array content
const arrayStart = content.indexOf('export const challenges: Challenge[] = [');
const arrayEnd = content.lastIndexOf('];');
const arrayContent = content.slice(arrayStart + 'export const challenges: Challenge[] = ['.length, arrayEnd);

// Convert TypeScript to JavaScript by removing type annotations
const jsContent = arrayContent
  .replace(/:\s*String/g, '')
  .replace(/:\s*number/g, '')
  .replace(/:\s*boolean/g, '')
  .replace(/:\s*Challenge\[\]/g, '')
  .replace(/interface Challenge \{[^}]+\}/g, '')
  .replace(/export const challenges: Challenge\[\] = /g, '');

// Parse as JavaScript
const challenges = eval('[' + jsContent + ']');

console.log(`Found ${challenges.length} challenges`);

// Reorganization function
function extractSection(startId, endId) {
  return challenges.filter(c => c.id >= startId && c.id <= endId);
}

// Extract sections
const basics = extractSection(1, 6);
const forLoops = extractSection(7, 21);
const ownershipBasics = [...extractSection(22, 24), ...extractSection(36, 38)];
const structsBasics = [...extractSection(25, 25), ...extractSection(39, 42)];
const enumsBasics = [...extractSection(26, 26), ...extractSection(43, 46)];
const errorBasics = [...extractSection(27, 28), ...extractSection(59, 64)];
const collectionsBasics = [...extractSection(29, 30), ...extractSection(51, 58)];
const genericsBasics = [...extractSection(31, 33), ...extractSection(65, 72)];
const testingBasics = extractSection(73, 76);
const ownershipMuscle = extractSection(101, 120);
const structsMuscle = extractSection(121, 130);
const errorMuscle = extractSection(131, 138);
const collectionsMuscle = extractSection(139, 150);
const enumsMuscle = extractSection(151, 162);
const genericsMuscle = extractSection(163, 174);
const testingMuscle = extractSection(175, 182);

// Get used IDs
const usedIds = new Set();
[basics, forLoops, ownershipBasics, structsBasics, enumsBasics,
 errorBasics, collectionsBasics, genericsBasics, testingBasics,
 ownershipMuscle, structsMuscle, errorMuscle, collectionsMuscle,
 enumsMuscle, genericsMuscle, testingMuscle].forEach(section => {
  section.forEach(c => usedIds.add(c.id));
});

// Advanced topics
const advanced = challenges.filter(c => !usedIds.has(c.id));

// Reassemble
const newOrder = [
  ...basics,
  ...forLoops,
  ...ownershipBasics,
  ...ownershipMuscle,
  ...structsBasics,
  ...structsMuscle,
  ...enumsBasics,
  ...enumsMuscle,
  ...errorBasics,
  ...errorMuscle,
  ...collectionsBasics,
  ...collectionsMuscle,
  ...genericsBasics,
  ...genericsMuscle,
  ...testingBasics,
  ...testingMuscle,
  ...advanced
];

console.log(`New order has ${newOrder.length} challenges`);

// Renumber
const renumbered = newOrder.map((c, i) => ({...c, id: i + 1}));

// Convert back to TypeScript format
function challengeToTS(c) {
  return `  {
    id: ${c.id},
    title: "${c.title.replace(/"/g, '\\"')}",
    difficulty: "${c.difficulty}",
    category: "${c.category}",
    description: "${c.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
    instructions: "${c.instructions.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
    starterCode: \`${c.starterCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    hint: "${c.hint.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
    expectedOutput: "${(c.expectedOutput || '').replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
  }`;
}

const newContent = header + '\n' +
  renumbered.map((c, i) => challengeToTS(c) + (i < renumbered.length - 1 ? ',' : '')).join('\n') +
  '\n];\n';

fs.writeFileSync('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', newContent);

console.log('File reorganized successfully!');