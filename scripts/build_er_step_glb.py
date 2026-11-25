# -*- coding: utf-8 -*-
import os
import trimesh
import cascadio
import numpy as np
import fast_simplification

STEP_PATH = r"C:\Users\su\Downloads\ER.STEP"
OUT_GLB = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\public\assets\models\triton.glb"

print(f"Loading {STEP_PATH}...")
scene = trimesh.load(STEP_PATH)

def decimate_mesh(mesh: trimesh.Trimesh, target_faces: int) -> trimesh.Trimesh:
    if len(mesh.faces) <= target_faces or target_faces < 50:
        return mesh
    ratio = 1.0 - (target_faces / float(len(mesh.faces)))
    ratio = max(0.05, min(0.98, ratio))
    verts_out, faces_out = fast_simplification.simplify(
        np.asarray(mesh.vertices, dtype=np.float32),
        np.asarray(mesh.faces, dtype=np.int32),
        target_reduction=ratio
    )
    m = trimesh.Trimesh(vertices=verts_out, faces=faces_out, process=True)
    m.fix_normals()
    return m

# Collect world-space meshes by functional group
h_thrusters = []
v_thrusters = []
fixtures = []

for node_name in scene.graph.nodes_geometry:
    transform, geom_name = scene.graph[node_name]
    if node_name == 'NAUO1':
        continue
    m = scene.geometry[geom_name].copy()
    m.apply_transform(transform)
    
    if 'angled_fixture' in geom_name:
        fixtures.append(decimate_mesh(m, 1500))
    elif 'THRUSTER-T28' in geom_name:
        # Check axis orientation: LocalZ -> World
        z_axis = transform[:3, :3] @ np.array([0, 0, 1])
        m_dec = decimate_mesh(m, 6500)
        if abs(z_axis[1]) > 0.7:
            v_thrusters.append(m_dec)
        else:
            h_thrusters.append(m_dec)

print(f"Thrusters: {len(h_thrusters)} horizontal, {len(v_thrusters)} vertical, {len(fixtures)} fixtures")

# Process NAUO1 (Main Vehicle Body, Frame, Hull, Buoyancy Pods)
t1, g1 = scene.graph['NAUO1']
body_mesh = scene.geometry[g1].copy()
body_mesh.apply_transform(t1)
body_mesh.merge_vertices()
parts = body_mesh.split(only_watertight=False)
print(f"NAUO1 split into {len(parts)} merged bodies")

hull_parts = []
buoyancy_parts = []
frame_parts = []
electronics_parts = []

for p in parts:
    ext = p.extents
    cent = p.centroid
    max_ext = float(np.max(ext))
    
    # Skip microscopic fastener threads / noise (< 4mm) to keep GLB crisp & fast
    if max_ext < 0.004:
        continue

    # Cylindrical Pressure Hull (114.3mm OD x 298.5mm) + Endcap Flanges/Seals centered around X~0.0795, Y~0.2515
    is_center_x = abs(cent[0] - 0.0795) < 0.015
    is_hull_y = abs(cent[1] - 0.2515) < 0.02
    if is_center_x and is_hull_y and max_ext > 0.095:
        # Differentiate internal electronics tray (flat thin plates inside hull) vs outer acrylic cylinder/endcaps
        if ext[1] < 0.015 and ext[2] > 0.15:
            electronics_parts.append(decimate_mesh(p, 2500))
        else:
            hull_parts.append(decimate_mesh(p, 4000))
    # Upper Buoyancy Pods (left X~-0.0321, right X~0.1919, Y~0.2822, Z length ~0.40)
    elif (abs(cent[0] - (-0.0321)) < 0.025 or abs(cent[0] - 0.1919) < 0.025) and cent[1] > 0.24 and max_ext > 0.12:
        buoyancy_parts.append(decimate_mesh(p, 3500))
    else:
        # Structural Frame (Side plates, tie rods, hull mounts, hardware)
        target = min(len(p.faces), 3000) if len(p.faces) > 3000 else len(p.faces)
        frame_parts.append(decimate_mesh(p, target))

h_mesh = trimesh.util.concatenate(h_thrusters)
v_mesh = trimesh.util.concatenate(v_thrusters)
fix_mesh = trimesh.util.concatenate(fixtures)
hull_mesh = trimesh.util.concatenate(hull_parts)
buoy_mesh = trimesh.util.concatenate(buoyancy_parts)
elec_mesh = trimesh.util.concatenate(electronics_parts) if electronics_parts else None
frame_mesh = trimesh.util.concatenate(frame_parts)

all_list = [m for m in [h_mesh, v_mesh, fix_mesh, hull_mesh, buoy_mesh, elec_mesh, frame_mesh] if m is not None]
combined = trimesh.util.concatenate(all_list)
center_offset = combined.bounds.mean(axis=0)
print(f"Combined extents (m): {combined.extents}")
print(f"Center offset (m): {center_offset}")

out_scene = trimesh.Scene()
named_groups = [
    (h_mesh, "Horizontal_Thrusters"),
    (v_mesh, "Vertical_Thrusters"),
    (fix_mesh, "Propulsion_Fixtures"),
    (hull_mesh, "Pressure_Hull"),
    (buoy_mesh, "Buoyancy_Pods"),
    (frame_mesh, "Structural_Frame"),
]
if elec_mesh is not None:
    named_groups.append((elec_mesh, "Electronics_Tray"))

total_faces = 0
for m, name in named_groups:
    m.apply_translation(-center_offset)
    m.fix_normals()
    total_faces += len(m.faces)
    print(f"  Node {name:24s}: {len(m.faces):6d} faces | extents: {np.round(m.extents, 4)}")
    out_scene.add_geometry(m, node_name=name, geom_name=name)

out_scene.export(OUT_GLB, file_type="glb")
print(f"Exported authentic ER.STEP GLB -> {OUT_GLB}")
print(f"Total faces: {total_faces:,} | File size: {os.path.getsize(OUT_GLB):,} bytes")
