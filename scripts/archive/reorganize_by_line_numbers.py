#!/usr/bin/env python3
"""
Reorganize challenges using line numbers
"""

# Read the file
with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'r') as f:
    lines = f.readlines()

# ID to line number mapping (from grep output)
id_to_line = {
    1: 15, 2: 30, 3: 51, 4: 74, 5: 92, 6: 113,
    7: 132, 8: 147, 9: 165, 10: 184, 11: 205, 12: 226, 13: 250, 14: 274, 15: 302, 16: 317, 17: 345, 18: 379, 19: 406, 20: 424, 21: 442,
    22: 460, 23: 484, 24: 508, 25: 530, 26: 551, 27: 574, 28: 596, 29: 618, 30: 641, 31: 662, 32: 686, 33: 709, 34: 734, 35: 753,
    36: 787, 37: 804, 38: 827, 39: 849, 40: 883, 41: 908, 42: 946, 43: 968, 44: 1001, 45: 1024, 46: 1058, 47: 1090, 48: 1109, 49: 1134, 50: 1158,
    51: 1181, 52: 1204, 53: 1224, 54: 1248, 55: 1279, 56: 1302, 57: 1321, 58: 1340, 59: 1369, 60: 1397, 61: 1422, 62: 1452, 63: 1485, 64: 1518,
    65: 1558, 66: 1585, 67: 1617, 68: 1659, 69: 1681, 70: 1730, 71: 1755, 72: 1790, 73: 1822, 74: 1854, 75: 1882, 76: 1922,
    77: 1964, 78: 1987, 79: 2008, 80: 2042, 81: 2080, 82: 2106, 83: 2127, 84: 2154, 85: 2183, 86: 2207, 87: 2230, 88: 2259, 89: 2299, 90: 2331, 91: 2359, 92: 2392, 93: 2424, 94: 2470, 95: 2519, 96: 2546, 97: 2583, 98: 2608, 99: 2654, 100: 2678,
    101: 2709, 102: 2726, 103: 2749, 104: 2766, 105: 2788, 106: 2814, 107: 2841, 108: 2861, 109: 2886, 110: 2907,
    111: 2936, 112: 2956, 113: 2976, 114: 3002, 115: 3023, 116: 3054, 117: 3074, 118: 3103, 119: 3130, 120: 3151,
    121: 3176, 122: 3199, 123: 3233, 124: 3265, 125: 3303, 126: 3325, 127: 3347, 128: 3367, 129: 3406, 130: 3444,
    131: 3480, 132: 3512, 133: 3542, 134: 3573, 135: 3604, 136: 3636, 137: 3670, 138: 3690,
    139: 3710, 140: 3729, 141: 3752, 142: 3771, 143: 3791, 144: 3812, 145: 3837, 146: 3856, 147: 3885, 148: 3904, 149: 3928, 150: 3953,
}

# Function to extract a challenge by ID range
def extract_by_id_range(start_id, end_id):
    extracted = []
    for challenge_id in range(start_id, end_id + 1):
        if challenge_id in id_to_line:
            start_line = id_to_line[challenge_id]
            # Find the end line (start of next challenge or end of array)
            next_id = challenge_id + 1
            while next_id <= 150 and next_id not in id_to_line:
                next_id += 1
            if next_id <= 150 and next_id in id_to_line:
                end_line = id_to_line[next_id] - 1
            else:
                # Find the line with "  },"
                for i in range(start_line, len(lines)):
                    if lines[i].strip() == '},':
                        end_line = i
                        break
                else:
                    end_line = len(lines) - 2  # -2 for "];"
            # Extract from 2 lines before id (the { line) to end
            actual_start = start_line - 2
            extracted.append((challenge_id, ''.join(lines[actual_start:end_line + 1])))
    return extracted

# Extract sections
basics = extract_by_id_range(1, 6)
for_loops = extract_by_id_range(7, 21)
ownership_basics = extract_by_id_range(22, 24) + extract_by_id_range(36, 38)
ownership_muscle = extract_by_id_range(101, 110)
borrowing_muscle = extract_by_id_range(111, 120)
structs_basics = extract_by_id_range(25, 25) + extract_by_id_range(39, 42)
structs_muscle = extract_by_id_range(121, 130)
enums_basics = extract_by_id_range(26, 26) + extract_by_id_range(43, 46)
error_basics = extract_by_id_range(27, 28) + extract_by_id_range(59, 64)
error_muscle = extract_by_id_range(131, 138)
collections_basics = extract_by_id_range(29, 30) + extract_by_id_range(51, 58)
collections_muscle = extract_by_id_range(139, 150)
generics_basics = extract_by_id_range(31, 33) + extract_by_id_range(65, 72)
testing_basics = extract_by_id_range(73, 76)

# Advanced topics
all_used_ids = set()
for section in [basics, for_loops, ownership_basics, ownership_muscle, borrowing_muscle,
                structs_basics, structs_muscle, enums_basics, error_basics, error_muscle,
                collections_basics, collections_muscle, generics_basics, testing_basics]:
    for challenge_id, _ in section:
        all_used_ids.add(challenge_id)

advanced = []
for challenge_id in range(1, 151):
    if challenge_id not in all_used_ids:
        advanced.extend(extract_by_id_range(challenge_id, challenge_id))

print(f"Basics: {len(basics)}, For Loops: {len(for_loops)}")
print(f"Ownership basics: {len(ownership_basics)}, muscle: {len(ownership_muscle)}")
print(f"Borrowing muscle: {len(borrowing_muscle)}")
print(f"Structs basics: {len(structs_basics)}, muscle: {len(structs_muscle)}")
print(f"Enums basics: {len(enums_basics)}")
print(f"Error basics: {len(error_basics)}, muscle: {len(error_muscle)}")
print(f"Collections basics: {len(collections_basics)}, muscle: {len(collections_muscle)}")
print(f"Generics basics: {len(generics_basics)}")
print(f"Testing basics: {len(testing_basics)}")
print(f"Advanced: {len(advanced)}")

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
import re
renumbered_challenges = []
for idx, (_, challenge) in enumerate(new_order, 1):
    renumbered = re.sub(r'id:\s*\d+,', f'id: {idx},', challenge)
    renumbered_challenges.append(renumbered)

# Write file
header = ''.join(lines[:14])
new_content = header
for i, challenge in enumerate(renumbered_challenges):
    new_content += challenge
    if i < len(renumbered_challenges) - 1:
        if not new_content.rstrip().endswith(','):
            new_content = new_content.rstrip() + ',\n'
    else:
        new_content = new_content.rstrip() + '\n'
new_content += '];\n'

with open('/Users/siddharth/projects/learn-to-code/src/data/challenges.ts', 'w') as f:
    f.write(new_content)

print("File reorganized successfully!")