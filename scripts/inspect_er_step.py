import re

step_path = r'C:\Users\su\Downloads\ER.STEP'
with open(step_path, 'r', encoding='latin-1') as f:
    data = f.read()

print(f"File size: {len(data):,} bytes")

products = re.findall(r"PRODUCT\s*\(\s*'([^']*)'", data)
print(f"Total PRODUCT entries: {len(products)}")
for p in sorted(set(products)):
    print(f"  - PRODUCT: {p} (count: {products.count(p)})")

naos = re.findall(r"NEXT_ASSEMBLY_USAGE_OCCURRENCE\s*\([^,]*,\s*'([^']*)'\s*,\s*'([^']*)'", data)
print(f"Total NEXT_ASSEMBLY_USAGE_OCCURRENCE entries: {len(naos)}")
for n1, n2 in sorted(set(naos))[:40]:
    print(f"  - OCCURRENCE: {n1} | {n2}")

solids = re.findall(r"MANIFOLD_SOLID_BREP\s*\(\s*'([^']*)'", data)
print(f"Total MANIFOLD_SOLID_BREP solids: {len(solids)}")
for s in sorted(set(solids))[:40]:
    print(f"  - SOLID: {s} (count: {solids.count(s)})")
