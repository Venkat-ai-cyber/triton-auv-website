import trimesh
import numpy as np
import os

p = r"C:\Users\su\Downloads\TRITON_A_original_reconstruction.stl"
mesh = trimesh.load(p)

# Clean and fix normals
mesh.fix_normals()

bodies = mesh.split(only_watertight=False)
print(f"Total authentic bodies: {len(bodies)}")

# Define groups
horizontal_thrusters_bodies = []
vertical_thrusters_bodies = []
hull_bodies = []
buoyancy_bodies = []
frame_bodies = []

for i, b in enumerate(bodies):
    c = b.centroid
    e = b.extents
    
    # Thruster Bodies 118-145: Horizontal
    if 118 <= i <= 145:
        horizontal_thrusters_bodies.append(b)
    # Thruster Bodies 146-173: Vertical
    elif 146 <= i <= 173:
        vertical_thrusters_bodies.append(b)
    # Pressure Hull (center Y within 35mm, large X or Z)
    elif abs(c[1]) < 35 and (e[0] > 180 or e[1] > 50 or e[2] > 50):
        hull_bodies.append(b)
    # Buoyancy Pods (top Z > 50, Y > 80, length > 180)
    elif abs(c[1]) > 80 and c[2] > 50 and e[0] > 150:
        buoyancy_bodies.append(b)
    else:
        frame_bodies.append(b)

print(f"Grouped bodies: H-Thrusters={len(horizontal_thrusters_bodies)}, V-Thrusters={len(vertical_thrusters_bodies)}, Hull={len(hull_bodies)}, Buoyancy={len(buoyancy_bodies)}, Frame={len(frame_bodies)}")

# Concatenate each group
h_mesh = trimesh.util.concatenate(horizontal_thrusters_bodies)
v_mesh = trimesh.util.concatenate(vertical_thrusters_bodies)
hull_mesh = trimesh.util.concatenate(hull_bodies)
buoyancy_mesh = trimesh.util.concatenate(buoyancy_bodies)
frame_mesh = trimesh.util.concatenate(frame_bodies)

# Create scene
scene = trimesh.Scene()

# Scale from mm to meters (0.001) and center at origin
total_mesh = trimesh.util.concatenate([h_mesh, v_mesh, hull_mesh, buoyancy_mesh, frame_mesh])
center_offset = total_mesh.bounds.mean(axis=0)

for m, name in [
    (h_mesh, "Horizontal_Thrusters"),
    (v_mesh, "Vertical_Thrusters"),
    (hull_mesh, "Pressure_Hull"),
    (buoyancy_mesh, "Buoyancy_Tubes"),
    (frame_mesh, "Structural_Frame")
]:
    # Center and scale
    m.apply_translation(-center_offset)
    m.apply_scale(0.001) # Convert to meters
    m.fix_normals()
    scene.add_geometry(m, node_name=name, geom_name=name)

# Export to GLB
dest_glb = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\public\assets\models\triton.glb"
scene.export(dest_glb, file_type="glb")
print(f"Successfully generated authentic CAD GLB at {dest_glb}, size: {os.path.getsize(dest_glb)} bytes")
