# Archive Scripts

This directory contains one-time fix scripts and legacy utilities that were used during development and cleanup of the challenge database.

## Purpose

These scripts were created to:
- Remove leaked solution code from starterCode fields
- Add proper `todo!()` placeholders where solutions were previously exposed
- Ensure consistency across challenge descriptions and instructions
- Fix formatting and content issues
- Reorganize and debug challenge data during early development

## Historical Context

These scripts were used during the development and cleanup of the learn-to-code project (May 2025 and earlier). Since the database has been fixed and stabilized, these scripts are no longer needed but are preserved here for historical reference.

## Scripts

### Consistency Pass Scripts (May 2025)
- `consistency-pass-batch1.js`, `consistency-pass-batch2.js`, `consistency-pass-batch3.js` - Ensured consistent use of `todo!()` placeholders across challenges

### Batch Fix Scripts (May 2025)
- `fix-batch-67-85-part1.js`, `fix-batch-67-85-part2.js` - Fixed challenges 67-85
- `fix-batch-86-92.js` - Fixed challenges 86-92
- `fix-batch-93-100.js` - Fixed challenges 93-100
- `fix-batch-102-110.js` - Fixed challenges 102-110
- `fix-batch-111-120.js` - Fixed challenges 111-120
- `fix-batch-121-136.js` - Fixed challenges 121-136
- `fix-batch-137-152.js` - Fixed challenges 137-152
- `fix-last-two.js` - Fixed remaining challenges

### Starter Code Leak Fixes (May 2025)
- `fix-leaking-starters-batch1.js`, `fix-leaking-starters-batch2.js`, `fix-leaking-starters-batch3.js` - Removed leaked solution code from starterCode fields

### Final Fixes (May 2025)
- `final-targeted-fixes.js` - Addressed remaining issues after batch fixes

### Legacy Reorganization Scripts (Earlier Development)
- `reorganize_challenges.py`, `reorganize_challenges_v2.py`, `reorganize_challenges_v3.py` - Early attempts to reorganize challenge data
- `reorganize_by_line_numbers.py`, `reorganize_by_lines.py` - Line-based reorganization approaches
- `reorganize_regex.py`, `reorganize_split.py` - Regex and split-based reorganization
- `reorganize.js` - JavaScript version of reorganization
- `final_reorganize.py` - Final reorganization script
- `debug_reorganize.py`, `verify_reorganization.py` - Debugging and verification scripts
- `fix_challenges.py` - General challenge fixes

### Database Testing
- `test-db.js` - Database connection testing script (contains hardcoded credentials for historical testing)

## Note

These scripts should not be run again as they:
- Modify the database in ways that have already been applied
- May contain hardcoded credentials or outdated configurations
- Were designed for specific one-time use cases

They are kept only for reference and documentation purposes.