import trimesh
import numpy as np
import os

# Create a rich, modular 3D model of TRITON matching the exact dimensions from new 2d.pdf:
# Overall: 482.6 x 331.02 x 262.52 mm (Thruster span: 582.70 x 406.64 mm)
# Pressure hull: D = 114.30 mm, L = 443.22 mm
# Buoyancy pods: L = 400.00 mm

scene = trimesh.Scene()

# 1. Central Pressure Hull (Cylinder + End Caps)
# Cylinder along X axis (length 443.22 mm, radius 114.30/2 = 57.15 mm)
hull_radius = 57.15
hull_length = 443.22
hull_cyl = trimesh.creation.cylinder(radius=hull_radius, height=hull_length, sections=48)
# Rotate cylinder to lie along X axis
rot_y = trimesh.transformations.rotation_matrix(np.pi / 2, [0, 1, 0])
hull_cyl.apply_transform(rot_y)
# Center slightly adjusted (Z = 0 is mid level)
hull_cyl.apply_translation([0, 0, 10])

# End caps (Flanges / Domes)
cap_front = trimesh.creation.cylinder(radius=hull_radius + 4, height=12, sections=48)
cap_front.apply_transform(rot_y)
cap_front.apply_translation([hull_length / 2 - 6, 0, 10])

cap_rear = trimesh.creation.cylinder(radius=hull_radius + 4, height=12, sections=48)
cap_rear.apply_transform(rot_y)
cap_rear.apply_translation([-hull_length / 2 + 6, 0, 10])

# Cable penetrators (small cylinders at rear end cap)
penetrators = []
for angle in np.linspace(0, 2*np.pi, 8, endpoint=False):
    py = (hull_radius - 16) * np.cos(angle)
    pz = (hull_radius - 16) * np.sin(angle) + 10
    pen = trimesh.creation.cylinder(radius=4, height=20, sections=16)
    pen.apply_transform(rot_y)
    pen.apply_translation([-hull_length / 2 - 8, py, pz])
    penetrators.append(pen)

hull_mesh = trimesh.util.concatenate([hull_cyl, cap_front, cap_rear] + penetrators)
scene.add_geometry(hull_mesh, node_name="Pressure_Hull", geom_name="Pressure_Hull")

# 2. Dual Buoyancy Tubes (Top sides, Y = +/- 100 mm, Z = 95 mm, Length = 400 mm)
pod_radius = 35.0
pod_length = 400.0
pod_left = trimesh.creation.capsule(radius=pod_radius, height=pod_length - 2*pod_radius)
pod_left.apply_transform(rot_y)
pod_left.apply_translation([0, 105, 95])

pod_right = trimesh.creation.capsule(radius=pod_radius, height=pod_length - 2*pod_radius)
pod_right.apply_transform(rot_y)
pod_right.apply_translation([0, -105, 95])

buoyancy_mesh = trimesh.util.concatenate([pod_left, pod_right])
scene.add_geometry(buoyancy_mesh, node_name="Buoyancy_Tubes", geom_name="Buoyancy_Tubes")

# 3. Structural Frame (Side plates, crossbars, bottom tray, camera mount)
# Side plates at Y = +/- (319.02 / 2) = +/- 159.51 mm
# Dimensions: L = 482.60 mm, H = 262.52 mm, T = 6.00 mm
side_t = 6.0
side_l = 482.60
side_h = 240.0

plate_left = trimesh.creation.box(extents=[side_l, side_t, side_h])
plate_left.apply_translation([0, 319.02 / 2 + side_t / 2, 5])

plate_right = trimesh.creation.box(extents=[side_l, side_t, side_h])
plate_right.apply_translation([0, -319.02 / 2 - side_t / 2, 5])

# Bottom chassis plate
bottom_plate = trimesh.creation.box(extents=[440.0, 300.0, 8.0])
bottom_plate.apply_translation([0, 0, -105])

# Crossbars connecting left and right frame
crossbars = []
for x_pos in [-200, -80, 80, 200]:
    # Top crossbar
    cb_top = trimesh.creation.cylinder(radius=8, height=331.02, sections=16)
    rot_x = trimesh.transformations.rotation_matrix(np.pi / 2, [1, 0, 0])
    cb_top.apply_transform(rot_x)
    cb_top.apply_translation([x_pos, 0, 120])
    crossbars.append(cb_top)
    
    # Bottom crossbar
    cb_bot = trimesh.creation.cylinder(radius=8, height=331.02, sections=16)
    cb_bot.apply_transform(rot_x)
    cb_bot.apply_translation([x_pos, 0, -95])
    crossbars.append(cb_bot)

# Forward camera mount angled at 39.23 deg
cam_mount = trimesh.creation.box(extents=[50, 80, 30])
rot_cam = trimesh.transformations.rotation_matrix(np.radians(-39.23), [0, 1, 0])
cam_mount.apply_transform(rot_cam)
cam_mount.apply_translation([210, 0, -80])

frame_mesh = trimesh.util.concatenate([plate_left, plate_right, bottom_plate, cam_mount] + crossbars)
scene.add_geometry(frame_mesh, node_name="Structural_Frame", geom_name="Structural_Frame")

# 4. Horizontal Vectored Thrusters (4 thrusters at corners at 45 deg)
# Total span is 582.70 mm outer length, 406.64 mm outer width
# Corner positions: [+/- 240, +/- 175]
def make_thruster(radius=36, length=65):
    duct = trimesh.creation.cylinder(radius=radius, height=length, sections=32)
    inner = trimesh.creation.cylinder(radius=radius - 4, height=length + 2, sections=32)
    # hub
    hub = trimesh.creation.cylinder(radius=14, height=length - 10, sections=24)
    # blade representation
    b1 = trimesh.creation.box(extents=[6, (radius-6)*2, 2])
    b2 = trimesh.creation.box(extents=[(radius-6)*2, 6, 2])
    t = trimesh.util.concatenate([duct, hub, b1, b2])
    return t

h_thrusters = []
h_coords = [
    (240, 175, 45),     # Front Left (vectored 45 deg)
    (240, -175, -45),   # Front Right (vectored -45 deg)
    (-240, 175, 135),   # Rear Left (vectored 135 deg)
    (-240, -175, -135)  # Rear Right (vectored -135 deg)
]

for x, y, angle_deg in h_coords:
    th = make_thruster(radius=34, length=60)
    rot_z = trimesh.transformations.rotation_matrix(np.radians(angle_deg), [0, 0, 1])
    th.apply_transform(rot_y)
    th.apply_transform(rot_z)
    th.apply_translation([x, y, 10])
    h_thrusters.append(th)

h_thruster_mesh = trimesh.util.concatenate(h_thrusters)
scene.add_geometry(h_thruster_mesh, node_name="Horizontal_Thrusters", geom_name="Horizontal_Thrusters")

# 5. Vertical Fixed Thrusters (4 thrusters spaced 182.60 mm longitudinally)
# Facing Z axis (heave, pitch, roll)
v_thrusters = []
v_coords = [
    (91.3, 140),    # Front Left Vertical
    (91.3, -140),   # Front Right Vertical
    (-91.3, 140),   # Rear Left Vertical
    (-91.3, -140)   # Rear Right Vertical
]

for x, y in v_coords:
    th = make_thruster(radius=32, length=55)
    # Vertical orientation (along Z axis)
    th.apply_translation([x, y, 25])
    v_thrusters.append(th)

v_thruster_mesh = trimesh.util.concatenate(v_thrusters)
scene.add_geometry(v_thruster_mesh, node_name="Vertical_Thrusters", geom_name="Vertical_Thrusters")

# 6. Sensors & Avionics (Inside and Outside)
# Camera lenses
cam_front = trimesh.creation.cylinder(radius=15, height=25, sections=24)
cam_front.apply_transform(rot_y)
cam_front.apply_translation([hull_length / 2 + 10, 0, 15])

cam_down = trimesh.creation.cylinder(radius=12, height=20, sections=24)
cam_down.apply_translation([180, 0, -110])

# Hydrophone array (3 hydrophones, 40kHz, baseline triangle at bottom)
h1 = trimesh.creation.cylinder(radius=7, height=18, sections=16)
h1.apply_translation([140, 0, -115])
h2 = trimesh.creation.cylinder(radius=7, height=18, sections=16)
h2.apply_translation([80, 60, -115])
h3 = trimesh.creation.cylinder(radius=7, height=18, sections=16)
h3.apply_translation([80, -60, -115])

# Bar30 Depth sensor penetrator
depth_sensor = trimesh.creation.cylinder(radius=9, height=24, sections=16)
depth_sensor.apply_transform(rot_y)
depth_sensor.apply_translation([-hull_length / 2 - 12, 35, 10])

sensors_mesh = trimesh.util.concatenate([cam_front, cam_down, h1, h2, h3, depth_sensor])
scene.add_geometry(sensors_mesh, node_name="Sensors_Payload", geom_name="Sensors_Payload")

# Export to GLB
out_glb = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\public\assets\models\triton.glb"
scene.export(out_glb, file_type="glb")
print(f"Exported parametric assembly GLB: {out_glb}, size: {os.path.getsize(out_glb)} bytes")

# Also convert the raw STL to GLB for direct CAD fidelity comparison
stl_raw = r"C:\Users\su\Downloads\TRITON_A_original_reconstruction.stl"
if os.path.exists(stl_raw):
    m_raw = trimesh.load(stl_raw)
    raw_glb = r"C:\Users\su\.gemini\antigravity\scratch\triton-auv-website\frontend\public\assets\models\triton_cad_raw.glb"
    m_raw.export(raw_glb, file_type="glb")
    print(f"Exported raw CAD reconstruction GLB: {raw_glb}, size: {os.path.getsize(raw_glb)} bytes")
