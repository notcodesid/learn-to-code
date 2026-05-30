#!/usr/bin/env python3
"""
Script to reorganize challenges.ts by inserting muscle memory sections
after their related basic concepts.
"""

import re
import json

# Read the file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    content = f.read()

# Extract the challenges array
# Find the start of the array
start_marker = 'export const challenges: Challenge[] = ['
end_marker = '];'

start_idx = content.find(start_marker)
end_idx = content.rfind(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find challenges array")
    exit(1)

# Extract the header (interface definition and array start)
header = content[:start_idx + len(start_marker)]

# Extract the challenges array content (without the brackets)
challenges_str = content[start_idx + len(start_marker):end_idx].strip()

# Parse each challenge object
# This is a bit tricky because we need to parse the TypeScript objects
# We'll split by looking for the pattern '  {' at the start of each challenge

challenges = []
current_challenge = ""
in_challenge = False
brace_count = 0

lines = challenges_str.split('\n')
for line in lines:
    stripped = line.strip()
    if stripped.startswith('{'):
        if in_challenge:
            challenges.append(current_challenge.strip())
        current_challenge = line
        in_challenge = True
        brace_count = line.count('{') - line.count('}')
    elif in_challenge:
        current_challenge += '\n' + line
        brace_count += line.count('{') - line.count('}')
        if brace_count == 0 and stripped.endswith('},'):
            challenges.append(current_challenge.strip())
            current_challenge = ""
            in_challenge = False

if current_challenge.strip():
    challenges.append(current_challenge.strip())

print(f"Found {len(challenges)} challenges")

# Now reorganize according to the plan
# IDs 1-6: Basics - keep
# IDs 7-21: For Loops muscle memory - keep
# IDs 22-100: Basic concepts
# IDs 101-150: Ownership/Borrowing/Structs/Error/Collections muscle memory
# IDs 151-162: Enums muscle memory
# IDs 163-174: Generics/Traits muscle memory
# IDs 175-182: Testing muscle memory

# Extract sections by ID range
def extract_section(start_id, end_id):
    section = []
    for challenge in challenges:
        # Extract ID from the challenge
        match = re.search(r'id:\s*(\d+),', challenge)
        if match:
            challenge_id = int(match.group(1))
            if start_id <= challenge_id <= end_id:
                section.append((challenge_id, challenge))
    return section

# Extract all sections
basics = extract_section(1, 6)
for_loops = extract_section(7, 21)
ownership_basics = extract_section(22, 24) + extract_section(36, 38)
structs_basics = extract_section(25, 25) + extract_section(39, 42)
enums_basics = extract_section(26, 26) + extract_section(43, 46)
error_basics = extract_section(27, 28) + extract_section(59, 64)
collections_basics = extract_section(29, 30) + extract_section(51, 58)
generics_basics = extract_section(31, 33) + extract_section(65, 72)
testing_basics = extract_section(73, 76)
ownership_muscle = extract_section(101, 120)
structs_muscle = extract_section(121, 130)
error_muscle = extract_section(131, 138)
collections_muscle = extract_section(139, 150)
enums_muscle = extract_section(151, 162)
generics_muscle = extract_section(163, 174)
testing_muscle = extract_section(175, 182)

# Advanced topics (everything else that's not in the above sections)
all_used_ids = set()
for section in [basics, for_loops, ownership_basics, structs_basics, enums_basics,
                error_basics, collections_basics, generics_basics, testing_basics,
                ownership_muscle, structs_muscle, error_muscle, collections_muscle,
                enums_muscle, generics_muscle, testing_muscle]:
    for challenge_id, _ in section:
        all_used_ids.add(challenge_id)

advanced = []
for challenge in challenges:
    match = re.search(r'id:\s*(\d+),', challenge)
    if match:
        challenge_id = int(match.group(1))
        if challenge_id not in all_used_ids:
            advanced.append((challenge_id, challenge))

# Reassemble in new order
new_order = []
new_order.extend(basics)
new_order.extend(for_loops)
new_order.extend(ownership_basics)
new_order.extend(ownership_muscle)
new_order.extend(structs_basics)
new_order.extend(structs_muscle)
new_order.extend(enums_basics)
new_order.extend(enums_muscle)
new_order.extend(error_basics)
new_order.extend(error_muscle)
new_order.extend(collections_basics)
new_order.extend(collections_muscle)
new_order.extend(generics_basics)
new_order.extend(generics_muscle)
new_order.extend(testing_basics)
new_order.extend(testing_muscle)
new_order.extend(advanced)

print(f"New order has {len(new_order)} challenges")

# Renumber challenges sequentially
renumbered_challenges = []
for idx, (_, challenge) in enumerate(new_order, 1):
    # Replace the old ID with the new one
    renumbered = re.sub(r'id:\s*\d+,', f'id: {idx},', challenge)
    renumbered_challenges.append(renumbered)

# Reconstruct the file
new_content = header + '\n'
for challenge in renumbered_challenges:
    new_content += '  ' + challenge + ',\n'
new_content = new_content.rstrip(',\n') + '\n' + end_marker + '\n'

# Write the new file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'w') as f:
    f.write(new_content)

print("File reorganized successfully!")