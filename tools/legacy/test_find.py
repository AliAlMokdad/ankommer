#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'C:\Users\Ali Al Mokdad\OneDrive\Desktop\experminting with claude\ankommer\js\data-chapters.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all positions of closing patterns after ur: blocks
import re

ur_positions = [m.start() for m in re.finditer(r'ur:`', content)]
print('Total ur: blocks:', len(ur_positions))

# Test: for each ur: block, find closing pattern
# Patterns: "` }" or "` }\n" or "`\n          da:" or "`\n          }" or "` }\n      }"

# Let's look at each ur: block ending
for i, ur_pos in enumerate(ur_positions[:5]):
    start = ur_pos + 4
    # Find backtick + space + brace
    p1 = content.find('` }', start)
    # Find backtick + newline (in case it's "`\n")
    p2 = content.find('`\n', start)
    # closest
    candidates = [(p, 'backtick_newline') for p in [p2] if p > start] + [(p, 'backtick_brace') for p in [p1] if p > start]
    if candidates:
        closest = min(candidates, key=lambda x: x[0])
        print('Block', i, 'ends at', closest[0], 'pattern:', closest[1])
        print('  Context:', repr(content[closest[0]-30:closest[0]+30]))
    print()
