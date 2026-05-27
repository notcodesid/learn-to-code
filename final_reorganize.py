#!/usr/bin/env python3
"""
Final reorganization script for challenges.ts
"""

import re

# Read the file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    content = f.read()

# Extract the header
header_match = re.search(r'(.*?export const challenges: Challenge \[\] = \[)', content, re.DOTALL)
header = header_match.group(1)

# Extract array content
array_start = content.find('export const challenges: Challenge[] = [')
array_end = content.rfind('];')
array_content = content[array_start + len('export const challenges: Challenge[] = ['):array_end]

# Split by looking for the pattern that separates challenges
# Each challenge starts with "  {" and ends with "  },"
challenges = []
lines = array_content.split('\n')
current = []
brace_count = 0
for line in lines:
    current.append(line)
    brace_count += line.count('{') - line.count('}')
    if brace_count == 0 and line.strip().startswith('},'):
        challenges.append('\n'.join(current))
        current = []

if current:
    challenges.append('\n'.join(current))

print(f"Found {len(challenges)} challenges")

def get_id(challenge):
    match = re.search(r'id:\s*(\d+)', challenge)
    return int(match.group(1)) if match else None

def extract_section(start_id, end_id):
    section = []
    for challenge in challenges:
        challenge_id = get_id(challenge)
        if challenge_id and start_id <= challenge_id <= end_id:
            section.append((challenge_id, challenge))
    return section

# Extract sections based on actual file structure
basics = extract_section(1, 6)
for_loops = extract_section(7, 21)

# Ownership basics are in "Ownership & Borrowing" and "Chapter 4 - Ownership"
ownership_basics = extract_section(22, 24) + extract_section(36, 38)
ownership_muscle = extract_section(101, 110)

# Borrowing is separate muscle memory
borrowing_muscle = extract_section(111, 120)

# Structs basics
structs_basics = extract_section(25, 25) + extract_section(39, 42)
structs_muscle = extract_section(121, 130)

# Enums basics (no muscle memory section exists)
enums_basics = extract_section(26, 26) + extract_section(43, 46)

# Error Handling basics
error_basics = extract_section(27, 28) + extract_section(59, 64)
error_muscle = extract_section(131, 138)

# Collections basics
collections_basics = extract_section(29, 30) + extract_section(51, 58)
collections_muscle = extract_section(139, 150)

# Generics/Traits basics (no muscle memory section exists)
generics_basics = extract_section(31, 33) + extract_section(65, 72)

# Testing basics (no muscle memory section exists)
testing_basics = extract_section(73, 76)

# Advanced topics (everything else)
all_used_ids = set()
for section in [basics, for_loops, ownership_basics, ownership_muscle, borrowing_muscle,
                structs_basics, structs_muscle, enums_basics, error_basics, error_muscle,
                collections_basics, collections_muscle, generics_basics, testing_basics]:
    for challenge_id, _ in section:
        all_used_ids.add(challenge_id)

advanced = []
for challenge in challenges:
    challenge_id = get_id(challenge)
    if challenge_id and challenge_id not in all_used_ids:
        advanced.append((challenge_id, challenge))

# Reassemble in new order
new_order = []
new_order.extend(basics)
new_order.extend(for_loops)
new_order.extend(ownership_basics)
new_order.extend(ownership_muscle)
new_order.extend(borrowing_muscle)  # Borrowing after Ownership
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

print(f"New order has {len(new_order)} challenges")

# Renumber
renumbered_challenges = []
for idx, (_, challenge) in enumerate(new_order, 1):
    renumbered = re.sub(r'id:\s*\d+,', f'id: {idx},', challenge)
    renumbered_challenges.append(renumbered)

# Write file
new_content = header + '\n'
for i, challenge in enumerate(renumbered_challenges):
    new_content += challenge
    if i < len(renumbered_challenges) - 1:
        new_content = new_content.rstrip() + ',\n'
    else:
        new_content = new_content.rstrip() + '\n'
new_content += '];\n'

with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'w') as f:
    f.write(new_content)

print("File reorganized successfully!")