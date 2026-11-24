# -*- coding: utf-8 -*-
import os

proj_dir = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website"

replacements = [
    ("Chennai Institute of Technology", "Team Triton"),
    ("CHENNAI INSTITUTE OF TECHNOLOGY", "TEAM TRITON"),
    ("chennai institute of technology", "team triton"),
    ("SH-113, Sarathy Nagar, Kundrathur, Chennai, Tamil Nadu 600069", "Team Triton Robotics Laboratory, Chennai, Tamil Nadu, India"),
    ("Sarathy Nagar, Kundrathur, Chennai, Tamil Nadu 600069", "Team Triton Robotics Laboratory, Chennai, Tamil Nadu, India"),
    ("triton_deep_ocean_marine_cit_secret_2026", "triton_deep_ocean_marine_auth_secret_2026"),
    ("triton_ocean_deep_secret_2026_marine_cit", "triton_ocean_deep_secret_2026_marine_auth"),
    ("TRITON AUV (Chennai Institute of Technology)", "TRITON Autonomous Underwater Vehicle"),
    ("Chennai Inst. of Tech", "Team Triton Labs"),
    ("TRITON AUV | Chennai Institute of Technology", "TRITON | Autonomous Underwater Vehicle"),
]

count = 0
for root, dirs, files in os.walk(proj_dir):
    if any(skip in root for skip in ['node_modules', '.git', 'dist']):
        continue
    for f in files:
        if any(f.endswith(ext) for ext in ['.ts', '.tsx', '.json', '.html', '.md', '.svg', '.js', '.example']):
            p = os.path.join(root, f)
            try:
                with open(p, 'r', encoding='utf-8') as file:
                    content = file.read()
                new_content = content
                for old_val, new_val in replacements:
                    if old_val in new_content:
                        new_content = new_content.replace(old_val, new_val)
                if new_content != content:
                    with open(p, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    print(f"Purged institutional branding in: {os.path.relpath(p, proj_dir)}")
                    count += 1
            except Exception as e:
                print(f"Error processing {p}: {e}")

print(f"Purged branding across {count} files.")
