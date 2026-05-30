#!/usr/bin/env python3
"""
Script to reorganize challenges in logical order by extracting and reordering sections.
"""

import re

# Read the current challenges file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    lines = f.readlines()

# Find the start and end line numbers for each ID range
def find_id_range(start_id, end_id):
    start_line = None
    end_line = None
    for i, line in enumerate(lines):
        if f'id: {start_id},' in line:
            start_line = i
        if start_id == end_id and f'id: {start_id},' in line:
            # Find the end of this single challenge
            for j in range(i, min(i + 100, len(lines))):
                if '},' in lines[j] and (j == i + 1 or any(c in lines[j] for c in ['\n  },', '\n  },\n'])):
                    end_line = j + 1
                    break
            break
        if f'id: {end_id + 1},' in line or (end_id == 150 and i == len(lines) - 1):
            end_line = i
            break
    return start_line, end_line

# Extract section by ID range
def extract_section(start_id, end_id):
    start_line = None
    end_line = None
    in_section = False
    section_lines = []
    
    for i, line in enumerate(lines):
        if f'id: {start_id},' in line:
            start_line = i
            in_section = True
        
        if in_section:
            section_lines.append(line)
            
        if in_section and (f'id: {end_id + 1},' in line or (end_id == 150 and i == len(lines) - 1)):
            # Remove the next ID line if it got included
            if f'id: {end_id + 1},' in line:
                section_lines = section_lines[:-1]
            end_line = i
            break
    
    return section_lines

# Extract the header (interface + array start)
header_lines = []
for i, line in enumerate(lines):
    if 'export const challenges: Challenge[] = [' in line:
        header_lines.append(line)
        header_lines.append('\n')
        break
    header_lines.append(line)

# Extract sections based on ID ranges
print("Extracting sections...")

# Section 1: IDs 1-6 (Basics)
section_1_6 = extract_section(1, 6)
print(f"Section 1-6: {len(section_1_6)} lines")

# Section 2: IDs 86-100 (For Loops muscle memory) - should come after ID 6
section_86_100 = extract_section(86, 100)
print(f"Section 86-100: {len(section_86_100)} lines")

# Section 3: IDs 101-110 (Ownership muscle memory)
section_101_110 = extract_section(101, 110)
print(f"Section 101-110: {len(section_101_110)} lines")

# Section 4: IDs 111-120 (Borrowing muscle memory)
section_111_120 = extract_section(111, 120)
print(f"Section 111-120: {len(section_111_120)} lines")

# Section 5: IDs 121-130 (Structs muscle memory)
section_121_130 = extract_section(121, 130)
print(f"Section 121-130: {len(section_121_130)} lines")

# Section 6: IDs 139-150 (Collections muscle memory)
section_139_150 = extract_section(139, 150)
print(f"Section 139-150: {len(section_139_150)} lines")

# Section 7: IDs 131-138 (Error Handling muscle memory)
section_131_138 = extract_section(131, 138)
print(f"Section 131-138: {len(section_131_138)} lines")

# Section 8: IDs 7-15 (Intermediate concepts - Ownership, Borrowing, Structs, Enums, Option, Result, Vectors, HashMaps)
section_7_15 = extract_section(7, 15)
print(f"Section 7-15: {len(section_7_15)} lines")

# Section 9: IDs 16-20 and 21-85 (Advanced concepts)
section_16_20 = extract_section(16, 20)
print(f"Section 16-20: {len(section_16_20)} lines")

section_21_85 = extract_section(21, 85)
print(f"Section 21-85: {len(section_21_85)} lines")

# Function to renumber IDs in a section
def renumber_section(section_lines, start_id):
    renumbered = []
    current_id = start_id
    for line in section_lines:
        # Match id: number,
        match = re.search(r'id:\s*(\d+),', line)
        if match:
            old_id = match.group(1)
            line = line.replace(f'id: {old_id},', f'id: {current_id},')
            current_id += 1
        renumbered.append(line)
    return renumbered

# Build the new file in correct order
new_lines = header_lines

# Add sections in correct order and renumber
current_id = 1

# Section 1: IDs 1-6 (Basics)
renumbered = renumber_section(section_1_6, current_id)
new_lines.extend(renumbered)
current_id += 6

# Section 2: For Loops muscle memory (was 86-100)
renumbered = renumber_section(section_86_100, current_id)
new_lines.extend(renumbered)
current_id += 15  # 86-100 is 15 challenges

# Section 3: Ownership muscle memory (was 101-110)
renumbered = renumber_section(section_101_110, current_id)
new_lines.extend(renumbered)
current_id += 10  # 101-110 is 10 challenges

# Section 4: Borrowing muscle memory (was 111-120)
renumbered = renumber_section(section_111_120, current_id)
new_lines.extend(renumbered)
current_id += 10  # 111-120 is 10 challenges

# Section 5: Structs muscle memory (was 121-130)
renumbered = renumber_section(section_121_130, current_id)
new_lines.extend(renumbered)
current_id += 10  # 121-130 is 10 challenges

# Section 6: Collections muscle memory (was 139-150)
renumbered = renumber_section(section_139_150, current_id)
new_lines.extend(renumbered)
current_id += 12  # 139-150 is 12 challenges

# Section 7: Error Handling muscle memory (was 131-138)
renumbered = renumber_section(section_131_138, current_id)
new_lines.extend(renumbered)
current_id += 8  # 131-138 is 8 challenges

# Section 8: IDs 7-15 (Intermediate concepts)
renumbered = renumber_section(section_7_15, current_id)
new_lines.extend(renumbered)
current_id += 9  # 7-15 is 9 challenges

# Section 9: IDs 16-20 (Advanced concepts)
renumbered = renumber_section(section_16_20, current_id)
new_lines.extend(renumbered)
current_id += 5  # 16-20 is 5 challenges

# Section 10: IDs 21-85 (Advanced chapters)
renumbered = renumber_section(section_21_85, current_id)
new_lines.extend(renumbered)

# Add closing bracket
new_lines.append('];\n')

# Write the new file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'w') as f:
    f.writelines(new_lines)

print(f"\nReorganized file with {len(new_lines)} lines")
print(f"Total challenges should be: {current_id + 65}")  # +65 for section 10