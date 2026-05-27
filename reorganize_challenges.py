#!/usr/bin/env python3
"""
Script to reorganize challenges in logical order.
"""

import re

# Read the current challenges file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    content = f.read()

# Extract individual challenge objects using regex
challenge_pattern = r'\{\s*id:\s*\d+,\s*title:\s*"[^"]+",[^}]*?\n  \},'
challenges = re.findall(challenge_pattern, content, re.DOTALL)

print(f"Found {len(challenges)} challenges")

# Parse each challenge to get its ID and title
parsed_challenges = []
for i, challenge in enumerate(challenges):
    id_match = re.search(r'id:\s*(\d+)', challenge)
    title_match = re.search(r'title:\s*"([^"]+)"', challenge)
    if id_match and title_match:
        challenge_id = int(id_match.group(1))
        title = title_match.group(1)
        parsed_challenges.append({
            'id': challenge_id,
            'title': title,
            'content': challenge
        })

print(f"Parsed {len(parsed_challenges)} challenges")

# Sort by current ID to understand the structure
parsed_challenges.sort(key=lambda x: x['id'])

# Print current order
print("\nCurrent order:")
for c in parsed_challenges[:20]:
    print(f"  ID {c['id']}: {c['title']}")