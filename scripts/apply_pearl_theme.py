# -*- coding: utf-8 -*-
import os
import re

BASE = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\src"
TARGET_DIRS = [
    os.path.join(BASE, "pages"),
    os.path.join(BASE, "components", "ai"),
    os.path.join(BASE, "components", "cad"),
    os.path.join(BASE, "components", "engineering"),
]

SKIP_FILES = {"HomePage.tsx"}

REPLACEMENTS = [
    # Remove any leftover Chennai/CIT references if any
    ("Chennai, Tamil Nadu, India", "Team Triton Operations"),
    ("Team Triton at Team Triton", "Team Triton"),
    ("TEAM TRITON · TEAM TRITON", "TEAM TRITON"),
    # Convert dark backgrounds inside light theme cards/sections
    ("bg-ocean-deep/90", "bg-[#E8F1F3]"),
    ("bg-ocean-deep/80", "bg-[#E8F1F3]"),
    ("bg-ocean-deep/60", "bg-[#F5F8F8]"),
    ("bg-ocean-deep", "bg-[#E8F1F3]"),
    ("bg-ocean-midnight/90", "bg-white"),
    ("bg-ocean-midnight/80", "bg-white"),
    ("bg-ocean-midnight/60", "bg-[#F5F8F8]"),
    ("bg-ocean-midnight", "bg-[#EDF3F4]"),
    ("from-ocean-midnight via-[#07243c] to-ocean-deep", "from-[#172832] via-[#163C4B] to-[#0E2833]"),
    ("from-ocean-midnight to-ocean-deep", "from-[#E8F1F3] to-[#F5F8F8]"),
    # Borders
    ("border-ocean-blue/40", "border-[#B9C7CC]/80"),
    ("border-ocean-blue/30", "border-[#B9C7CC]/70"),
    ("border-ocean-blue/20", "border-[#B9C7CC]/50"),
    ("border-ocean-cyan/40", "border-[#087F83]/40"),
    ("border-ocean-cyan/30", "border-[#087F83]/30"),
    ("border-white/10", "border-[#B9C7CC]/50"),
    ("border-white/5", "border-[#B9C7CC]/40"),
    # Text colors (light theme readable)
    ("text-white/80", "text-[#163C4B]"),
    ("text-white/70", "text-[#163C4B]/85"),
    ("text-white/60", "text-[#163C4B]/75"),
    ("text-white/50", "text-[#163C4B]/65"),
    ("text-white/40", "text-[#163C4B]/55"),
    ("text-white/30", "text-[#163C4B]/45"),
    ("text-ocean-ice/80", "text-[#163C4B]"),
    ("text-ocean-ice", "text-[#172832]"),
    ("text-ocean-cyan", "text-[#087F83]"),
    ("text-ocean-aqua", "text-[#087F83]"),
    ("text-ocean-gold", "text-[#D98B73]"),
]

count_files = 0
for d in TARGET_DIRS:
    for fname in os.listdir(d):
        if not fname.endswith(".tsx") or fname in SKIP_FILES:
            continue
        fpath = os.path.join(d, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        orig = content
        for old, new in REPLACEMENTS:
            content = content.replace(old, new)

        # Convert standalone text-white when NOT inside a dark button/banner
        # Specifically replace `text-white` on headings/divs that aren't `bg-[#087F83]`, `bg-ocean-cyan`, `bg-emerald`, `bg-green-`, `bg-red-`
        lines = content.splitlines()
        new_lines = []
        for line in lines:
            if "text-white" in line and not any(bg in line for bg in [
                "bg-[#087F83]", "bg-[#14A9A0]", "bg-[#172832]", "bg-ocean-cyan",
                "bg-green-", "bg-emerald-", "bg-red-", "bg-amber-", "bg-blue-", "from-ocean-cyan", "from-[#172832]"
            ]):
                line = line.replace("text-white", "text-[#172832]")
            new_lines.append(line)
        content = "\n".join(new_lines)

        if content != orig:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            count_files += 1
            print(f"Updated theme: {fname}")

print(f"Total files updated: {count_files}")
