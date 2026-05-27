#!/usr/bin/env python3
"""
Verify the reorganization by checking category order
"""

import re

# Read the file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    content = f.read()

# Extract challenges with IDs and categories
matches = re.findall(r'id:\s*(\d+).*?category:\s*"([^"]+)"', content, re.DOTALL)

print("Challenge order by category:")
print("-" * 60)
for challenge_id, category in matches:
    print(f"ID {challenge_id}: {category}")