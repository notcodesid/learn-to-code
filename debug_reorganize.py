#!/usr/bin/env python3
"""
Debug script to find which challenges were lost
"""

import re

# Read the file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    content = f.read()

# Extract all IDs
all_ids = set()
matches = re.findall(r'id:\s*(\d+),', content)
for m in matches:
    all_ids.add(int(m))

print(f"Total unique IDs found: {len(all_ids)}")
print(f"ID range: {min(all_ids)} to {max(all_ids)}")

# Find missing IDs
expected_ids = set(range(1, 183))
missing_ids = expected_ids - all_ids
extra_ids = all_ids - expected_ids

if missing_ids:
    print(f"Missing IDs: {sorted(missing_ids)}")
if extra_ids:
    print(f"Extra IDs: {sorted(extra_ids)}")

# Print all IDs sorted
print(f"\nAll IDs: {sorted(all_ids)}")