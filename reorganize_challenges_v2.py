#!/usr/bin/env python3
"""
Script to reorganize challenges.ts by inserting muscle memory sections
after their related basic concepts.
"""

import re

# Read the file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    content = f.read()

# Extract the header (interface definition and array start)
header_match = re.search(r'(.*?export const challenges: Challenge \[\] = \[)', content, re.DOTALL)
if not header_match:
    print("Could not find header")
    exit(1)

header = header_match.group(1)

# Extract the challenges array content
# Find where the array starts and ends
array_start = content.find('export const challenges: Challenge[] = [')
array_end = content.rfind('];')

if array_start == -1 or array_end == -1:
    print("Could not find array")
    exit(1)

array_content = content[array_start + len('export const challenges: Challenge[] = ['):array_end]

# Parse challenges by tracking braces
challenges = []
current = []
brace_depth = 0
in_string = False
string_char = None

i = 0
while i < len(array_content):
    char = array_content[i]

    # Handle strings
    if not in_string and char in ('"', "'"):
        in_string = True
        string_char = char
        current.append(char)
    elif in_string and char == string_char:
        # Check if escaped
        if i > 0 and array_content[i-1] != '\\':
            in_string = False
            string_char = None
        current.append(char)
    elif in_string:
        current.append(char)
    else:
        # Track braces
        if char == '{':
            brace_depth += 1
            current.append(char)
        elif char == '}':
            brace_depth -= 1
            current.append(char)
            # When we return to depth 0, we've completed a challenge
            if brace_depth == 0:
                challenge_str = ''.join(current).strip()
                if challenge_str:
                    challenges.append(challenge_str)
                current = []
        else:
            current.append(char)

    i += 1

print(f"Found {len(challenges)} challenges")

# Function to extract ID from a challenge string
def get_id(challenge):
    match = re.search(r'id:\s*(\d+)', challenge)
    return int(match.group(1)) if match else None

# Function to extract section by ID range
def extract_section(start_id, end_id):
    section = []
    for challenge in challenges:
        challenge_id = get_id(challenge)
        if challenge_id and start_id <= challenge_id <= end_id:
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
    challenge_id = get_id(challenge)
    if challenge_id and challenge_id not in all_used_ids:
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
for i, challenge in enumerate(renumbered_challenges):
    new_content += '  ' + challenge
    if i < len(renumbered_challenges) - 1:
        new_content += ','
    new_content += '\n'
new_content += '];\n'

# Write the new file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'w') as f:
    f.write(new_content)

print("File reorganized successfully!")