#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple approach: for each ur: block in data-chapters.js,
copy its content to a new fa: block inserted right after it.
The ur: blocks already contain Persian text.
"""
import sys
import io
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

print('File length:', len(content))

# Count existing keys
ur_count = content.count('ur:`')
fa_count = content.count('fa:`')
print('ur: backtick count:', ur_count)
print('fa: backtick count before:', fa_count)

# We need to:
# 1. Remove the 5 already-added fa: blocks (to avoid duplicates)
# 2. Add all 84 fa: blocks from scratch

# Step 1: Remove existing fa: blocks
# Pattern: ,\n          fa:`...`
# We need to find each fa: block and remove it along with the preceding comma+newline

def remove_fa_blocks(content):
    """Remove all fa:` ... ` blocks that were already inserted."""
    # Pattern: ,\n          fa:`<content>` where content can span multiple lines
    # The fa: block ends with ` followed by either \n or space

    result = content
    while 'fa:`' in result:
        pos = result.find('fa:`')
        # Find the start of this insertion (go back to find the comma+newline)
        # Look for ',\n          fa:' or similar
        insert_start = result.rfind(',\n          fa:`', 0, pos + 4)
        if insert_start == -1:
            # Try just looking for the fa: directly
            print('  Could not find insert start before fa: at', pos)
            break

        # Find the closing backtick of this fa: block
        # The fa: block ends with a backtick followed by space or newline (before ' }' or '\n')
        fa_content_start = pos + 4  # after 'fa:`'
        # Find '` }' or '`\n' that ends this block
        end1 = result.find('` }', fa_content_start)
        end2 = result.find('`\n', fa_content_start)

        # Find the nearest end
        candidates = []
        if end1 != -1:
            candidates.append(end1)
        if end2 != -1:
            candidates.append(end2)

        if not candidates:
            print('  Could not find end of fa: block at', pos)
            break

        close_pos = min(candidates)
        # The fa: block is from insert_start to close_pos+1 (include the backtick)
        insert_end = close_pos + 1  # the backtick itself

        # Remove: from insert_start to insert_end
        removed_text = result[insert_start:insert_end]
        print(f'  Removing fa: block at {insert_start}-{insert_end}: {repr(removed_text[:60])}...')
        result = result[:insert_start] + result[insert_end:]

    return result

print('\nRemoving existing fa: blocks...')
content = remove_fa_blocks(content)
fa_count_after_remove = content.count('fa:`')
print('fa: count after removal:', fa_count_after_remove)

# Step 2: Find all ur: backtick blocks and copy them to fa:
# Each ur: block:
# - Starts: ur:`
# - Ends: ` } (backtick space brace)
# We insert: ,\n          fa:`<same_content>` right after the closing backtick

ur_positions = [m.start() for m in re.finditer(r'ur:`', content)]
print(f'\nFound {len(ur_positions)} ur: blocks to process')

# Collect all insertions first (position, text)
insertions = []

for i, ur_start in enumerate(ur_positions):
    ur_content_start = ur_start + 4  # after 'ur:`'

    # Find the closing ` }
    close_pos = content.find('` }', ur_content_start)
    if close_pos == -1:
        print(f'  WARNING: No closing found for ur: block {i} at {ur_start}')
        continue

    # Extract the content between ur:` and `
    ur_content = content[ur_content_start:close_pos]

    # Insert position: right after the closing backtick (before ' }')
    insert_pos = close_pos + 1  # after the backtick

    insert_str = ',\n          fa:`' + ur_content + '`'
    insertions.append((insert_pos, insert_str))

print(f'Prepared {len(insertions)} insertions')

# Sort descending by position
insertions.sort(key=lambda x: x[0], reverse=True)

# Apply insertions
for insert_pos, insert_str in insertions:
    content = content[:insert_pos] + insert_str + content[insert_pos:]

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

fa_count_final = content.count('fa:`')
print(f'fa: count after insertions: {fa_count_final}')
print('Done!' if fa_count_final == 84 else f'WARNING: Expected 84 but got {fa_count_final}')
