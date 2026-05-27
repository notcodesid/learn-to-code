#!/usr/bin/env python3
"""
Reorganize using regex with a more robust pattern
"""

import re

# Read the file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    content = f.read()

# Extract header
header = content[:content.find('export const challenges: Challenge[] = [') + len('export const challenges: Challenge[] = [')]

# Extract array content
array_content = content[content.find('export const challenges: Challenge[] = [') + len('export const challenges: Challenge[] = ['):content.rfind('];')]

# Use a regex to match each challenge object
# This pattern matches from { to } with balanced braces
pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'

# Find all matches
challenges = re.findall(pattern, array_content, re.DOTALL)

print(f"Found {len(challenges)} potential matches")

# Filter to only actual challenges (those with 'id:' field)
real_challenges = []
for c in challenges:
    if 'id:' in c and 'title:' in c:
        real_challenges.append(c)

print(f"Found {len(real_challenges)} real challenges")

def get_id(challenge):
    match = re.search(r'id:\s*(\d+)', challenge)
    return int(match.group(1)) if match else None

def extract_section(start_id, end_id):
    section = []
    for challenge in real_challenges:
        challenge_id = get_id(challenge)
        if challenge_id and start_id <= challenge_id <= end_id:
            section.append((challenge_id, challenge))
    return section

# Extract sections
basics = extract_section(1, 6)
for_loops = extract_section(7, 21)
ownership_basics = extract_section(22, 24) + extract_section(36, 38)
ownership_muscle = extract_section(101, 110)
borrowing_muscle = extract_section(111, 120)
structs_basics = extract_section(25, 25) + extract_section(39, 42)
structs_muscle = extract_section(121, 130)
enums_basics = extract_section(26, 26) + extract_section(43, 46)
error_basics = extract_section(27, 28) + extract_section(59, 64)
error_muscle = extract_section(131, 138)
collections_basics = extract_section(29, 30) + extract_section(51, 58)
collections_muscle = extract_section(139, 150)
generics_basics = extract_section(31, 33) + extract_section(65, 72)
testing_basics = extract_section(73, 76)

# Advanced topics
all_used_ids = set()
for section in [basics, for_loops, ownership_basics, ownership_muscle, borrowing_muscle,
                structs_basics, structs_muscle, enums_basics, error_basics, error_muscle,
                collections_basics, collections_muscle, generics_basics, testing_basics]:
    for challenge_id, _ in section:
        all_used_ids.add(challenge_id)

advanced = []
for challenge in real_challenges:
    challenge_id = get_id(challenge)
    if challenge_id and challenge_id not in all_used_ids:
        advanced.append((challenge_id, challenge))

# Reassemble
new_order = []
new_order.extend(basics)
new_order.extend(for_loops)
new_order.extend(ownership_basics)
new_order.extend(ownership_muscle)
new_order.extend(borrowing_muscle)
new_order.extend(structs_basics)
new_order.extend(structs_muscle)
new_order.extend(enums_basics)
new_order.extend(error_basics)
new_order.extend(error_muscle)
new_order.extend(collections_basics)
new_order.extend(collections_muscle)
new_order.extend(generics_basics)
new_order.extend(testing_basics)
new_order.extend(advanced)

print(f"Total in new order: {len(new_order)}")

# Renumber
renumbered_challenges = []
for idx, (_, challenge) in enumerate(new_order, 1):
    renumbered = re.sub(r'id:\s*\d+,', f'id: {idx},', challenge)
    renumbered_challenges.append(renumbered)

# Write file
new_content = header + '\n'
for i, challenge in enumerate(renumbered_challenges):
    new_content += '  ' + challenge
    if i < len(renumbered_challenges) - 1:
        new_content = new_content.rstrip() + ',\n'
    else:
        new_content = new_content.rstrip() + '\n'
new_content += '];\n'

with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'w') as f:
    f.write(new_content)

print("File reorganized successfully!")