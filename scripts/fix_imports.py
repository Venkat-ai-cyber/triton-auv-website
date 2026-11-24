import shutil, os

shared_json = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\shared\tritonTechnicalConfig.json"
dest_json = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\src\config\tritonTechnicalConfig.json"
shutil.copy(shared_json, dest_json)
print("Copied tritonTechnicalConfig.json to frontend/src/config")

# Fix import in tritonConfig.ts
triton_config_ts = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\src\config\tritonConfig.ts"
with open(triton_config_ts, "w", encoding="utf-8") as f:
    f.write("import configData from './tritonTechnicalConfig.json';\n\nexport const tritonConfig = configData;\nexport default tritonConfig;\n")

# Fix import paths in pages/*.tsx
pages_dir = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\src\pages"
for f in os.listdir(pages_dir):
    if f.endswith('.tsx'):
        p = os.path.join(pages_dir, f)
        with open(p, 'r', encoding='utf-8') as file:
            content = file.read()
        
        content = content.replace("from '../../types'", "from '../types'")
        content = content.replace("from '../../context/", "from '../context/")
        content = content.replace("from '../../services/", "from '../services/")
        content = content.replace("from '../../config/", "from '../config/")
        content = content.replace("from '../../components/", "from '../components/")
        
        with open(p, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Fixed imports in {f}")
