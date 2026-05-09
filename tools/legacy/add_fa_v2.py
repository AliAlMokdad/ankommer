#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add fa: blocks by extracting Persian content from ur: blocks.

Current state of data-chapters.js:
- ur: blocks contain: [Persian content]`[Urdu content]` }
  OR: [Persian content]`,\n          fa:`[Persian content]` }

The Persian content always ends with a backtick (first backtick inside ur: block).
We need to:
1. For blocks without fa:: extract Persian content and insert fa: block
2. Skip blocks that already have fa: (the 5 already done)

Strategy:
- Find each ur: block
- The first backtick inside the ur: block ends the Persian content
- Check if fa: already exists between this ur: and the next content section
- If not, add fa: after the Urdu content closes (before ` } or `,\n)

Actually simpler approach:
- Find each ur: block
- Extract the Persian part (from ur:` to the FIRST ` inside the block)
- Find where the ENTIRE section ends (` } pattern at section level)
- Insert `,\n          fa:`[Persian]` BEFORE the ` } that ends the section

Wait but some sections end with ur:` ... ` } directly and others end with da:` ... ` }

Let me look at this differently:
- We want to add fa: as the LAST item in each content object
- The content object ends with ` } (backtick space brace)
- We need to insert fa: right before that final ` }

For blocks that have da: last: insert after da:` content ` before }
For blocks that have ur: last: insert after ur:` content ` before }
For blocks already with fa:: skip (fa: is already last)

But we need to INSERT fa: - not change da: or ur: order.

The simplest correct approach:
1. For each section's content object that ends with ` }
2. Check if fa: is already present in that section
3. If not, the section ends with either ur:` or da:` block
4. Insert `,\n          fa:`[Persian content from ur: block]` BEFORE the final ` }

This way fa: becomes the last item and the Persian content is correct.
"""
import sys
import io
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

FILE_PATH = r"C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js"

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

print('File length:', len(content))
print('ur: count:', content.count('ur:`'))
print('fa: count before:', content.count('fa:`'))

# Strategy:
# 1. Find all ur: blocks
# 2. For each ur: block, extract Persian content (up to first ` inside)
# 3. Find the corresponding section end ` }
# 4. Check if fa: already exists in this section
# 5. If not, insert fa: before the section end ` }

ur_positions = [m.start() for m in re.finditer(r'ur:`', content)]
print(f'ur: blocks: {len(ur_positions)}')

insertions = []  # (position, text_to_insert)
skipped = 0

for i, ur_pos in enumerate(ur_positions):
    ur_content_start = ur_pos + 4  # after 'ur:`'

    # Find the first backtick inside the ur: block (end of Persian content)
    first_backtick = content.find('`', ur_content_start)
    if first_backtick == -1:
        print(f'  ERROR: No backtick found inside ur: block {i}')
        continue

    # Extract Persian content
    persian_content = content[ur_content_start:first_backtick]

    # Now find the section end ` }
    # The section end is after the ur: block starts, look for ` }
    section_end = content.find('` }', ur_content_start)
    if section_end == -1:
        print(f'  ERROR: No section end found for ur: block {i}')
        continue

    # Check if fa: already exists between ur_pos and section_end
    fa_in_section = content.find('fa:`', ur_pos, section_end + 3)
    if fa_in_section != -1:
        print(f'  SKIP ur: block {i} at {ur_pos} - fa: already exists at {fa_in_section}')
        skipped += 1
        continue

    # Insertion position: right after the backtick of ` } (before ' }')
    insert_pos = section_end + 1  # after the backtick, before ' }'

    insert_str = ',\n          fa:`' + persian_content + '`'
    insertions.append((insert_pos, insert_str, i))

print(f'Insertions to make: {len(insertions)}, Skipped (already have fa:): {skipped}')

# Sort descending to avoid index shifting
insertions.sort(key=lambda x: x[0], reverse=True)

# Apply insertions
for insert_pos, insert_str, block_i in insertions:
    content = content[:insert_pos] + insert_str + content[insert_pos:]

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

fa_count_final = content.count('fa:`')
print(f'fa: count after: {fa_count_final}')
if fa_count_final == 84:
    print('SUCCESS: exactly 84 fa: blocks')
else:
    print(f'WARNING: expected 84, got {fa_count_final}')
